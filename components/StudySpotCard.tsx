import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { StudySpot } from '../types/spot';
import { spotStyles } from '../styles/spotStyles';

interface Props {
  spot: StudySpot;
}

export const StudySpotCard = ({ spot }: Props) => {
  // Custom Function & Callback Function (Materi 5.3)
  const handlePress = () => {
    Alert.alert('Info Spot 💖', `Kamu memilih tempat nugas: ${spot.name}`);
  };

  return (
    // Menggunakan TouchableOpacity agar card bisa diklik
    <TouchableOpacity onPress={handlePress} style={spotStyles.card}>
      <View style={spotStyles.cardHeader}>
        <View style={spotStyles.titleGroup}>
          <Text style={spotStyles.emoji}>{spot.emoji}</Text>
          <Text style={spotStyles.cardTitle}>{spot.name}</Text>
        </View>

        {/* Contoh Inline Styling (Materi 3.3) gabung dengan External Style */}
        <View style={[spotStyles.badgeRating, { backgroundColor: '#FFE4E8' }]}>
          <Text style={spotStyles.ratingText}>⭐ {spot.rating}</Text>
        </View>
      </View>

      <View style={spotStyles.gridInfo}>
        <Text style={spotStyles.infoText}>🔊 Suasana: {spot.noiseLevel}</Text>
        <Text style={spotStyles.infoText}>
          ❄️ Pendingin: {spot.hasAC ? 'Ada AC Adem 🧊' : 'Kipas Kipas 🪭'}
        </Text>
        <Text style={spotStyles.infoText}>🔌 Colokan: {spot.powerOutlets}</Text>
        <Text style={spotStyles.infoText}>📶 WiFi: {spot.wifiQuality}</Text>
      </View>
    
    </TouchableOpacity>
    
    
  );
};