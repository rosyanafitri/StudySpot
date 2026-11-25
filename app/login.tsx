import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAuth = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Peringatan', 'Silakan isi email dan password kamu terlebih dahulu!');
      return;
    }

    if (isSignUp && !fullName.trim()) {
      Alert.alert('Peringatan', 'Silakan isi nama lengkap kamu terlebih dahulu!');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Peringatan', 'Password minimal terdiri dari 6 karakter.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (isSignUp) {
        const { error } = await signUp(email.trim(), password, fullName.trim());
        if (error) {
          Alert.alert('Gagal Mendaftar', error.message);
        } else {
          Alert.alert(
            'Pendaftaran Berhasil ✨',
            'Akun kamu berhasil dibuat! Jika konfirmasi email aktif di Supabase, silakan cek inbox email kamu terlebih dahulu.'
          );
          setIsSignUp(false);
        }
      } else {
        const { error } = await signIn(email.trim(), password);
        if (error) {
          Alert.alert('Gagal Masuk', error.message);
        }
        // Jika berhasil, AuthContext & Route Guard di _layout.tsx otomatis mengarahkan ke Beranda
      }
    } catch (error) {
      Alert.alert('Error', 'Terjadi kesalahan saat menghubungi server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          {isSignUp ? 'Daftar Akun StudySpot 🌸' : 'Masuk ke StudySpot 🌸'}
        </Text>
        <Text style={styles.subtitle}>
          {isSignUp
            ? 'Buat akun baru untuk menyimpan spot belajar favoritmu'
            : 'Masukkan email dan password untuk melanjutkan'}
        </Text>

        {isSignUp && (
          <TextInput
            style={styles.input}
            placeholder="Nama lengkap kamu..."
            placeholderTextColor="#999"
            value={fullName}
            onChangeText={setFullName}
            editable={!isSubmitting}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Masukkan email kamu..."
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          editable={!isSubmitting}
        />

        <TextInput
          style={styles.input}
          placeholder="Masukkan password (min. 6 karakter)..."
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!isSubmitting}
        />

        <TouchableOpacity
          style={[styles.loginButton, isSubmitting && styles.disabledButton]}
          onPress={handleAuth}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.loginButtonText}>
              {isSignUp ? 'Daftar Sekarang' : 'Masuk'}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => setIsSignUp(!isSignUp)}
          disabled={isSubmitting}
        >
          <Text style={styles.switchButtonText}>
            {isSignUp
              ? 'Sudah punya akun? Masuk di sini'
              : 'Belum punya akun? Daftar sekarang'}
          </Text>
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
    paddingVertical: 13,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 12,
  },
  disabledButton: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  switchButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  switchButtonText: {
    color: '#FF6B81',
    fontSize: 13,
    fontWeight: '600',
  },
});