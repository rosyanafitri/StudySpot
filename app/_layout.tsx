import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Layout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#FFE4E8' },
        headerTintColor: '#FF6B81',
        headerTitleStyle: { fontWeight: 'bold' },
        contentStyle: { backgroundColor: '#FFF5F7' },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'StudySpot ✨',
          headerRight: () => (
            <TouchableOpacity 
              style={styles.headerButton} 
              onPress={() => router.push('/login')}
            >
              <Text style={styles.headerButtonText}>👤 Login</Text>
            </TouchableOpacity>
          ),
        }} 
      />
      <Stack.Screen 
        name="detail/[id]" 
        options={{ title: 'Detail Spot Nugas 💖' }} 
      />
      <Stack.Screen 
        name="favorites" 
        options={{ title: 'Favorit Saya 💖' }} 
      />
      <Stack.Screen 
        name="login" 
        options={{ title: 'Masuk Akun 🔑' }} 
      />
      <Stack.Screen 
        name="profile" 
        options={{ title: 'Profil Saya 👤' }} 
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    backgroundColor: '#FF6B81',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  headerButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
});