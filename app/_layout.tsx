import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Layout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTintColor: '#0F172A',
        headerTitleStyle: { fontWeight: '600', fontSize: 18 },
        contentStyle: { backgroundColor: '#F8FAFC' },
        headerShadowVisible: false, // Hilangkan border tebal header
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'StudySpot',
          headerRight: () => (
            <TouchableOpacity 
              style={styles.headerButton} 
              onPress={() => router.push('/login')}
            >
              <Text style={styles.headerButtonText}>Masuk</Text>
            </TouchableOpacity>
          ),
        }} 
      />
      <Stack.Screen name="detail/[id]" options={{ title: 'Detail Spot' }} />
      <Stack.Screen name="favorites" options={{ title: 'Spot Favorit' }} />
      <Stack.Screen name="login" options={{ title: 'Masuk Akun' }} />
      <Stack.Screen name="profile" options={{ title: 'Profil' }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  headerButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
});