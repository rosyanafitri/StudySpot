import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { STUDY_SPOTS } from '../../constants/mockData';

export default function DetailSpotPage() {
  const { id } = useLocalSearchParams(); // Mengambil parameter ID dari URL
  const router = useRouter();

  // Hook useState untuk status Favorite
  const [isFavorite, setIsFavorite] = useState(false);

  // Cari data spot berdasarkan ID
  const spot = STUDY_SPOTS.find((s) => s.id === id);

  // Hook useEffect untuk mencatat log saat halaman dibuka
  useEffect(() => {
    if (spot) {
      console.log(`Halaman detail dibuka untuk: ${spot.name}`);
    }
  }, [id]);

  if (!spot) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Spot tidak ditemukan! 😢</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>⬅️ Kembali</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    Alert.alert(
      'Favorite 💖',
      !isFavorite
        ? `${spot.name} ditambahkan ke favorit!`
        : `${spot.name} dihapus dari favorit!`
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.emoji}>{spot.emoji}</Text>
        <Text style={styles.title}>{spot.name}</Text>

        <TouchableOpacity
          style={[
            styles.favButton,
            { backgroundColor: isFavorite ? '#FF6B81' : '#FFE4E8' },
          ]}
          onPress={toggleFavorite}
        >
          <Text
            style={[
              styles.favButtonText,
              { color: isFavorite ? '#FFFFFF' : '#FF6B81' },
            ]}
          >
            {isFavorite ? '❤️ Favorit Kamu' : '🤍 Tambahkan ke Favorit'}
          </Text>
        </TouchableOpacity>

        <View style={styles.infoGroup}>
          <Text style={styles.infoText}>⭐ Rating: {spot.rating}</Text>
          <Text style={styles.infoText}>🔊 Suasana: {spot.noiseLevel}</Text>
          <Text style={styles.infoText}>
            ❄️ Pendingin: {spot.hasAC ? 'Ada AC Adem 🧊' : 'Kipas Kipas 🪭'}
          </Text>
          <Text style={styles.infoText}>🔌 Colokan: {spot.powerOutlets}</Text>
          <Text style={styles.infoText}>📶 WiFi: {spot.wifiQuality}</Text>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>⬅️ Kembali ke Daftar Spot</Text>
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
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#FFB6C1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  emoji: {
    fontSize: 50,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 16,
    textAlign: 'center',
  },
  favButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  favButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoGroup: {
    width: '100%',
    gap: 10,
    marginBottom: 24,
  },
  infoText: {
    fontSize: 15,
    color: '#555555',
  },
  backButton: {
    backgroundColor: '#FFE4E8',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
  },
  backButtonText: {
    color: '#FF6B81',
    fontWeight: 'bold',
    fontSize: 14,
  },
  errorText: {
    fontSize: 16,
    color: '#FF6B81',
    textAlign: 'center',
    marginBottom: 16,
  },
});