import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfilePage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.avatar}>👩‍💻</Text>
        <Text style={styles.name}>Rosyana Fitri</Text>
        <Text style={styles.subtext}>NIM: 202410370110305</Text>
        <Text style={styles.description}>
          Pengembang Aplikasi StudySpot ✨{"\n"}
          Membantu mahasiswa menemukan tempat nugas terbaik dengan suasana paling nyaman!
        </Text>

        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={() => router.replace('/login')}
        >
          <Text style={styles.logoutButtonText}>🚪 Keluar / Ganti Akun</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>⬅️ Kembali ke Beranda</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F7',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    elevation: 3,
  },
  avatar: { fontSize: 60, marginBottom: 12 },
  name: { fontSize: 20, fontWeight: 'bold', color: '#4A4A4A' },
  subtext: { fontSize: 14, color: '#888', marginBottom: 16 },
  description: { textAlign: 'center', color: '#555', marginBottom: 24, lineHeight: 20 },
  logoutButton: {
    backgroundColor: '#FF6B81',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoutButtonText: { color: '#FFFFFF', fontWeight: 'bold' },
  backButton: {
    backgroundColor: '#FFE4E8',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
  },
  backButtonText: { color: '#FF6B81', fontWeight: 'bold' },
});