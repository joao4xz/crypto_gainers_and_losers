import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

/**
 * @title Tab Layout Component
 * @notice Renders the main tab navigation layout for the cryptocurrency tracking app
 * @dev Uses expo-router's Tabs component for navigation and Ionicons for tab icons
 * @return Returns a tab navigation component with three screens:
 *         - All Cryptos (index)
 *         - Top Gainers
 *         - Top Losers
 */
export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "All Cryptos",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="gainers"
        options={{
          title: "Top Gainers",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trending-up" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="losers"
        options={{
          title: "Top Losers",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trending-down" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
