"use client";
import { useSSO } from '@clerk/clerk-expo';
import * as AuthSession from 'expo-auth-session';
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";

import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { COLORS } from "../../constants/colors";
import { useAuth } from "../../contexts/auth-context";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession();

const GoogleLogo = () => (
  <Svg width={20} height={20} viewBox="0 0 533.5 544.3">
    <Path
      fill="#4285F4"
      d="M533.5 278.4c0-17.4-1.4-34.1-4-50.4H272v95.4h147.2c-6.3 34.1-25 63-53.3 82.5v68h85.9c50.3-46.3 81.7-114.6 81.7-195.5z"
    />
    <Path
      fill="#34A853"
      d="M272 544.3c72.2 0 132.9-23.8 177.1-64.9l-85.9-68c-23.9 16-54.6 25.5-91.2 25.5-70.1 0-129.6-47.2-150.9-110.5H34v69.4c44.8 88.4 136.6 148.5 238 148.5z"
    />
    <Path
      fill="#FBBC05"
      d="M121.1 326.4c-10.1-29.4-10.1-60.9 0-90.3V166.7H34c-40.2 79.3-40.2 172.9 0 252.2l87.1-69.5z"
    />
    <Path
      fill="#EA4335"
      d="M272 107.7c39.2-.6 76.8 13.8 105.4 40.1l78.8-78.8C407.8 25.3 343.8 0 272 0 170.6 0 78.8 60.1 34 148.5l87.1 69.4c21.4-63.2 80.9-110.5 150.9-110.2z"
    />
  </Svg>
);

export default function Login() {
  useWarmUpBrowser();
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

   const { startSSOFlow } = useSSO()

  const onPress = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
        strategy: 'oauth_google',
        // For web, defaults to current path
        // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
        // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
        redirectUrl: AuthSession.makeRedirectUri(),
      })

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId })
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }, [])

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Email and password are required.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        "https://reasonable-amazement-production.up.railway.app/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailAddress: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log("Login error:", data);
        Alert.alert(
          "Login Failed",
          data?.message || "Invalid credentials. Please try again."
        );
        return;
      }
      console.log(data.data);
      // Use the auth context to sign in
      const { accessToken, refreshToken,user } = data.data;
      await signIn(accessToken, refreshToken, user);
      Alert.alert("Success", "Logged in successfully!");
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Network Error",
        "Unable to connect to the server. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      "Forgot Password",
      "Forgot password functionality will be implemented here."
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/login.png")}
            style={styles.headerImage}
            resizeMode="contain"
          />
        </View>

        {/* Welcome Text */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.heading}>{"Let's Sign you in"}</Text>
          <Text style={styles.subheading}>
            {"Welcome back, you've been missed!"}
          </Text>
        </View>

        {/* Login Form */}
        <View style={styles.form}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#999"
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            editable={!isLoading}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#999"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!isLoading}
          />

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={handleForgotPassword}
            style={styles.forgotPasswordContainer}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: COLORS.primary }]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Text>
        </TouchableOpacity>

        {/* Or Separator */}
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>

        {/* Google Sign In Button */}
        <TouchableOpacity style={styles.googleButton} onPress={onPress}>
          <View style={styles.googleButtonContent}>
            <GoogleLogo />
            <Text style={styles.googleButtonText}>Sign in with Google</Text>
          </View>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>{"Don't have an account? "}</Text>
          <TouchableOpacity
            onPress={() => router.push("/(auth)/signup")}
            disabled={isLoading}
          >
            <Text style={styles.linkText}>Register Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  headerImage: {
    width: "100%",
    height: 200,
    maxWidth: 300,
  },
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
    textAlign: "center",
  },
  subheading: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  form: {
    marginBottom: 30,
    gap: 16,
  },
  input: {
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginTop: 5,
  },
  forgotPasswordText: {
    fontSize: 15,
    color: COLORS.primary,
    fontWeight: "500",
  },
  button: {
    paddingVertical: 16,
    borderRadius: 25,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#D1D5DB",
  },
  orText: {
    marginHorizontal: 16,
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
  },
  googleButton: {
    backgroundColor: "#fff",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 16,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  googleButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  googleButtonText: {
    fontSize: 16,
    color: "#374151",
    fontWeight: "500",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
  },
  bottomText: {
    fontSize: 16,
    color: "#6B7280",
  },
  linkText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "600",
  },
});
