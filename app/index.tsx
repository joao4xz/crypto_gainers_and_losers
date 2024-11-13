import { Text, View, ScrollView, RefreshControl } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { Ticker } from "../types/index";

/**
 * @title Cryptocurrency Ticker Display
 * @notice Main component that displays top 100 cryptocurrencies with their prices and 24h changes
 * @return React Native component
 */
export default function Index() {
  const [data, setData] = useState<Ticker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  /**
   * @notice Fetches cryptocurrency data from Coinpaprika API
   * @dev Sets loading state during fetch and handles errors appropriately
   */
  const fetchData = async () => {
    try {
      const response = await fetch('https://api.coinpaprika.com/v1/tickers');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  /**
   * @notice Handles pull-to-refresh functionality
   * @dev Uses fetchData and manages refreshing state
   */
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData().finally(() => setRefreshing(false));
  }, []);

  /**
   * @notice Filters and sorts cryptocurrency data to get top 100 by rank
   * @param data Array of all cryptocurrency tickers
   * @return Array of top 100 tickers sorted by rank
   */
  const getTop100 = (data: Ticker[]) => {
    return data
      .filter((ticker) => ticker.rank <= 100)
      .sort((a, b) => a.rank - b.rank);
  };

  /**
   * @notice Formats cryptocurrency prices with appropriate decimal places
   * @param price Number to be formatted
   * @return Formatted price string with appropriate decimal places
   * @dev Returns 8 decimal places for small values (<0.01) and 2 decimal places otherwise
   */
  const formatPrice = (price: number): string => {
    if (price === null || price === undefined) return 'N/A';
    
    if (price < 0.01) {
      return price.toFixed(8);
    }
    
    return price.toFixed(2);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={{ flex: 1, padding: 16 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {getTop100(data).map((ticker) => (
        <View 
          key={ticker.id} 
          style={{
            padding: 16,
            marginBottom: 8,
            backgroundColor: '#f5f5f5',
            borderRadius: 8,
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>{ticker.rank}. {ticker.name} ({ticker.symbol})</Text>
          <Text>Price: ${formatPrice(ticker.quotes.USD.price)}</Text>
          <Text style={{ 
            color: ticker.quotes.USD.percent_change_24h > 0 ? 'green' : 'red' 
          }}>
            {ticker.quotes.USD.percent_change_24h > 0 ? '+' : ''}
            {ticker.quotes.USD.percent_change_24h?.toFixed(2) || 'N/A'}%
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
