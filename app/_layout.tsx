import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#FFE4E8' },
        headerTintColor: '#FF6B81',
        headerTitleStyle: { fontWeight: 'bold' },
        contentStyle: { backgroundColor: '#FFF5F7' },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ title: 'StudySpot ✨' }} 
      />
      <Stack.Screen 
        name="detail/[id]" 
        options={{ title: 'Detail Spot Nugas 💖' }} 
      />
      <Stack.Screen 
        name="favorites" 
        options={{ title: 'Favorit Saya 💖' }} 
      />
    </Stack>
  );
}