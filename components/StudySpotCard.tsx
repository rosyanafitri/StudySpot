import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { StudySpot } from '../types/spot';
import { spotStyles } from '../styles/spotStyles';

interface Props {
  spot: StudySpot;
}

export const StudySpotCard = ({ spot }: Props) => {
  const router = useRouter();

  const handlePress = () => {
    // Berpindah ke halaman detail berbasis parameter ID
    router.push(`/detail/${spot.id}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={spotStyles.card}>
      <View style={spotStyles.cardHeader}>
        <View style={spotStyles.titleGroup}>
          <Text style={spotStyles.emoji}>{spot.emoji}</Text>
          <Text style={spotStyles.cardTitle}>{spot.name}</Text>
        </View>

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