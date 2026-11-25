import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Peringatan', 'Silakan isi username dan password kamu terlebih dahulu!');
      return;
    }

    try {
      // Simpan username ke AsyncStorage agar bisa dibaca di halaman Profil
      await AsyncStorage.setItem('user_name', username.trim());
      
      Alert.alert('Berhasil', `Selamat datang, ${username}! ✨`);
      router.replace('/profile'); // Langsung arahkan ke profil untuk cek data
    } catch (error) {
      Alert.alert('Error', 'Gagal menyimpan data session login.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Masuk ke StudySpot 🌸</Text>
        <Text style={styles.subtitle}>Masukkan username dan password untuk melanjutkan</Text>

        <TextInput
          style={styles.input}
          placeholder="Masukkan username kamu..."
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Masukkan password kamu..."
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Masuk</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={() => router.replace('/')}>
          <Text style={styles.skipButtonText}>Lanjutkan sebagai Tamu ➡️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F7',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 24,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B81',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFF5F7',
    borderColor: '#FFE4E8',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 14,
  },
  loginButton: {
    backgroundColor: '#FF6B81',
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 12,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  skipButtonText: {
    color: '#888',
    fontSize: 13,
  },
});