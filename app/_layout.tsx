import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export default function Layout() {
  const router = useRouter();

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
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => router.push('/login')}
              >
                <Text style={styles.loginBtnText}>Masuk</Text>
              </TouchableOpacity>
            </View>
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
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 28, // Menambah jarak antar menu
    marginRight: 24, // Menggeser menu agak ke tengah dari pinggir kanan
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
});