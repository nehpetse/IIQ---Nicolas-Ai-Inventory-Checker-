import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F1F9F2', dark: '#12372A' }}
      headerImage={
        <Image
          source={require('@/assets/images/icon.png')} // Replace with your branding
          style={styles.logo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">InventoryIQ Dashboard</ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">🔍 Stock Overview</ThemedText>
        <ThemedText>
          See current inventory levels across all stores. Tap items to edit or restock.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">🧠 AI Forecast</ThemedText>
        <ThemedText>
          Forecasted daily demand is based on the last 7 days of sales. Adjusted automatically
          for typhoon activity.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">⚠️ Urgent Restock Alerts</ThemedText>
        <ThemedText>
          You have <ThemedText type="defaultSemiBold">3 items</ThemedText> at risk of running out
          within 2 days. View them now or enable SMS alerts.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">📦 Quick Scan</ThemedText>
        <ThemedText>
          Use your camera to scan barcodes for fast stock updates.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  section: {
    gap: 8,
    marginBottom: 12,
  },
  logo: {
    height: 160,
    width: 300,
    bottom: 0,
    left: 0,
    position: 'absolute',
    resizeMode: 'contain',
  },
});