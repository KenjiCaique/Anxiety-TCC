
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Stack vazia para carregar os arquivos de /app */}
    </Stack>
  );
}
