"use client"
import { Ionicons } from "@expo/vector-icons"
import Checkbox from "expo-checkbox"
import { useRouter } from "expo-router"
import { useState } from "react"
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
} from "react-native"
import Svg, { Path } from "react-native-svg"
import { COLORS } from "../../constants/colors"
import { useAuth } from "../../contexts/auth-context"

export const GoogleLogo = () => (
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
)

// Header Component
const Header = ({ title, onBackPress }: { title: string; onBackPress: () => void }) => (
  <View style={styles.header}>
    <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
      <Ionicons name="chevron-back-outline" size={20} color="#000" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>{title}</Text>
    <View style={styles.placeholder} />
  </View>
)

export default function Signup() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [step, setStep] = useState(1)
  const [otp, setOtp] = useState("")

  // Form states
  const [fullName, setFullName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [consent, setConsent] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)

  const handleBackPress = () => {
    if (step === 1) {
      router.push("/(auth)/login")
    } else {
      setStep(step - 1)
    }
  }

  const handleRegister = async () => {
    if (!fullName || !phoneNumber || !email || !password) {
      Alert.alert("Validation Error", "All fields are required.")
      return
    }

    if (!consent) {
      Alert.alert("Consent Required", "Please agree to the Terms & Conditions.")
      return
    }

    try {
      setIsRegistering(true)
      const response = await fetch("https://reasonable-amazement-production.up.railway.app/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          emailAddress: email,
          phoneNumber: phoneNumber,
          password: password,
          consent: consent,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        Alert.alert("Registration Failed", errorData?.message || "Something went wrong. Please try again.")
        return
      }

      Alert.alert("Registration Successful", "An OTP has been sent to your email/phone. Please verify it.")
      setStep(2)
    } catch (error) {
      console.error(error)
      Alert.alert("Network Error", "Unable to connect to the server. Please try again later.")
    } finally {
      setIsRegistering(false)
    }
  }

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter a valid 6-digit code.")
      return
    }

    try {
      setIsVerifying(true)
      const response = await fetch(
        `https://reasonable-amazement-production.up.railway.app/api/v1/auth/confirmation/${email}?code=${otp}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailAddress: email,
            password: password,
          }),
        },
      )

      if (!response.ok) {
        const errorData = await response.json()
        Alert.alert("Verification Failed", errorData?.message || "Invalid OTP. Please try again.")
        setIsVerifying(false)
        return
      }

      const data = await response.json()

      // Auto-login after successful verification
      if (data?.result?.token) {
        await signIn(data.result.token, data.result.user || { id: "1", email: email, name: fullName })
        Alert.alert("Success", "Your account has been verified and you're now logged in!")
      } else {
        // If no token returned, redirect to login
        Alert.alert("Success", "Your account has been verified! Please log in.", [
          { text: "OK", onPress: () => router.push("/(auth)/login") },
        ])
      }
    } catch (error) {
      console.error(error)
      Alert.alert("Network Error", "Unable to connect to the server. Please try again later.")
      setIsVerifying(false)
    }
  }

  const handleGoogleSignUp = () => {
    Alert.alert("Google Sign-Up", "Google Sign-Up functionality will be implemented here.")
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            {/* Welcome Text */}
            <View style={styles.welcomeContainer}>
              <Text style={styles.subheading}>Join us and start your journey!</Text>
            </View>

            {/* Registration Form */}
            <View style={styles.form}>
              <TextInput
                placeholder="Full Name"
                placeholderTextColor="#999"
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                editable={!isRegistering}
              />
              <TextInput
                placeholder="Phone Number"
                placeholderTextColor="#999"
                style={styles.input}
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                editable={!isRegistering}
              />
              <TextInput
                placeholder="Email Address"
                placeholderTextColor="#999"
                style={styles.input}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                editable={!isRegistering}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#999"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                editable={!isRegistering}
              />
            </View>

            {/* Terms & Conditions */}
            <View style={styles.checkboxContainer}>
              <Checkbox value={consent} onValueChange={setConsent} color={consent ? COLORS.primary : undefined} />
              <Text style={styles.checkboxLabel}>
                I agree to the <Text style={styles.termsText}>Terms & Conditions</Text>
              </Text>
            </View>

            {/* Create Account Button */}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: COLORS.primary }]}
              onPress={handleRegister}
              disabled={isRegistering}
            >
              <Text style={styles.buttonText}>{isRegistering ? "Creating Account..." : "Create Account"}</Text>
            </TouchableOpacity>

            {/* Or Separator */}
            <View style={styles.orContainer}>
              <View style={styles.line} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.line} />
            </View>

            {/* Google Sign Up Button */}
            <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignUp} disabled={isRegistering}>
              <View style={styles.googleButtonContent}>
                <GoogleLogo />
                <Text style={styles.googleButtonText}>Sign up with Google</Text>
              </View>
            </TouchableOpacity>

            {/* Sign In Link */}
            <View style={styles.bottomContainer}>
              <Text style={styles.bottomText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/login")} disabled={isRegistering}>
                <Text style={styles.linkText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </>
        )

      case 2:
        return (
          <View style={styles.verificationContainer}>
            {/* Mailbox Image */}
            <View style={styles.imageContainer}>
              <Image
                source={require("../../assets/images/Mailbox.png")}
                style={styles.mailboxImage}
                resizeMode="contain"
              />
            </View>

            {/* Verification Text */}
            <View style={styles.welcomeContainer}>
              <Text style={styles.heading}>Check Your Inbox</Text>
              <Text style={styles.paragraph}>Enter the verification code we just sent to {email}</Text>
            </View>

            {/* OTP Input */}
            <View style={styles.form}>
              <TextInput
                style={styles.otpInput}
                placeholder="Enter 6-digit OTP"
                placeholderTextColor="#999"
                keyboardType="number-pad"
                maxLength={6}
                value={otp}
                onChangeText={setOtp}
                editable={!isVerifying}
              />
            </View>

            {/* Verify Button */}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: COLORS.primary }]}
              onPress={handleVerifyOtp}
              disabled={isVerifying}
            >
              <Text style={styles.buttonText}>{isVerifying ? "Verifying..." : "Verify"}</Text>
            </TouchableOpacity>

            {/* Resend Code */}
            <View style={styles.resendContainer}>
              <Text style={styles.bottomText}>Didn't receive the code? </Text>
              <TouchableOpacity disabled={isVerifying}>
                <Text style={styles.linkText}>Resend</Text>
              </TouchableOpacity>
            </View>
          </View>
        )

      default:
        return null
    }
  }

  const getHeaderTitle = () => {
    switch (step) {
      case 1:
        return "Create An Account"
      case 2:
        return "Verification"
      default:
        return ""
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Header title={getHeaderTitle()} onBackPress={handleBackPress} />
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {renderStepContent()}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#F2F2F2",
  },
  backButton: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    flex: 1,
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  verificationContainer: {
    flex: 1,
    justifyContent: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 30,
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
  paragraph: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 22,
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
  otpInput: {
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 18,
    backgroundColor: "#fff",
    color: "#000",
    textAlign: "center",
    letterSpacing: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 5,
  },
  checkboxLabel: {
    marginLeft: 12,
    fontSize: 15,
    color: "#555",
    flex: 1,
  },
  termsText: {
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
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
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
  mailboxImage: {
    width: 200,
    height: 200,
  },
})
