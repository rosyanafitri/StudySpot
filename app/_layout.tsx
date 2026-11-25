import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import { AuthProvider, useAuth } from '../context/AuthContext';

function RootLayoutNav() {
  const router = useRouter();
  const segments = useSegments();
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    // Tunggu sampai pengecekan sesi dari SecureStore selesai
    if (loading) return;

    const inAuthGroup = segments[0] === 'login';

    if (!user && !inAuthGroup) {
      // Belum login dan mencoba mengakses halaman aplikasi -> arahkan ke /login
      router.replace('/login');
    } else if (user && inAuthGroup) {
      // Sudah login tapi masih berada di /login -> arahkan ke beranda
      router.replace('/');
    }
  }, [user, loading, segments]);

  // Tampilkan layar loading selagi mengecek sesi tersimpan
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B81" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTintColor: '#FF6B81',
        headerTitleStyle: { fontWeight: '800', fontSize: 20 },
        contentStyle: { backgroundColor: '#FFF9FA' },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'StudySpot 🌸',
          headerRight: () => (
            <View style={styles.navLinks}>
              <TouchableOpacity onPress={() => router.push('/')}>
                <Text style={[styles.navLinkText, styles.activeNavLink]}>Beranda</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/favorites')}>
                <Text style={styles.navLinkText}>Favorit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/profile')}>
                <Text style={styles.navLinkText}>Profil</Text>
              </TouchableOpacity>

              {user ? (
                <TouchableOpacity
                  style={styles.logoutBtn}
                  onPress={async () => {
                    await signOut();
                  }}
                >
                  <Text style={styles.logoutBtnText}>Keluar</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={() => router.push('/login')}
                >
                  <Text style={styles.loginBtnText}>Masuk</Text>
                </TouchableOpacity>
              )}
            </View>
          ),
        }}
      />
      <Stack.Screen name="detail/[id]" options={{ title: 'Detail Spot' }} />
      <Stack.Screen name="favorites" options={{ title: 'Spot Favorit' }} />
      <Stack.Screen name="login" options={{ title: 'Masuk Akun', headerShown: false }} />
      <Stack.Screen name="profile" options={{ title: 'Profil' }} />
    </Stack>
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF9FA',
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 28,
    marginRight: 24,
  },
  navLinkText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  activeNavLink: {
    color: '#FF6B81',
    fontWeight: '700',
  },
  loginBtn: {
    backgroundColor: '#FF6B81',
    paddingVertical: 7,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginLeft: 8,
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  logoutBtn: {
    backgroundColor: '#FFE5E9',
    paddingVertical: 7,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginLeft: 8,
  },
  logoutBtnText: {
    color: '#FF6B81',
    fontWeight: '600',
    fontSize: 13,
  },
});