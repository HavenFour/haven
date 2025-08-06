import { useAuth } from '@/contexts/auth-context';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function profile() {

  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
      try {
        await signOut();
      } catch (error) {
        console.error("Sign out error:", error);
      }
    };
  return (
    <View>
         <Text>Homepage</Text>
         <Text>Welcome, {user?.name || user?.email}!</Text>
         <TouchableOpacity
           style={{ padding: 10, backgroundColor: "lightgray" }}
           onPress={handleSignOut}
         >
           <Text onPress={handleSignOut}>Log out</Text>
         </TouchableOpacity>
       </View>
  )
}