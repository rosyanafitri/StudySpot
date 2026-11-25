import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfilePage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('');

  // 🟢 Baca data session user saat halaman profil dibuka
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('user_name');
        if (storedName) {
          setUserName(storedName);
        } else {
          setUserName('Tamu / Belum Login');
        }
      } catch (error) {
        console.log('Gagal memuat data pengguna', error);
      }
    };

    loadUserData();
  }, []);

  // 🔴 Fungsi Logout (Hapus session data dari storage)
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user_name');
      Alert.alert('Berhasil Keluar', 'Session kamu telah diakhiri.');
      router.replace('/login');
    } catch (error) {
      Alert.alert('Error', 'Gagal melakukan logout.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.avatar}>👩‍💻</Text>
        <Text style={styles.name}>{userName || 'Pengguna StudySpot'}</Text>
        <Text style={styles.subtext}>Status: Active Member 🌸</Text>
        <Text style={styles.description}>
          Pengembang / Pengguna Aplikasi StudySpot ✨{"\n"}
          Membantu mahasiswa menemukan tempat nugas terbaik dengan suasana paling nyaman!
        </Text>

        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>🚪 Keluar / Ganti Akun</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.replace('/')}
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
    maxWidth: 420,
    elevation: 3,
  },
  avatar: { fontSize: 60, marginBottom: 12 },
  name: { fontSize: 22, fontWeight: 'bold', color: '#333333' },
  subtext: { fontSize: 13, color: '#FF6B81', fontWeight: '600', marginBottom: 16 },
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