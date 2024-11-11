import { Text, View, ScrollView, RefreshControl } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { Ticker } from "../types/index";

export default function Gainers() {
  const [data, setData] = useState<Ticker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData().finally(() => setRefreshing(false));
  }, []);

  const getGainers = (data: Ticker[]) => {
    return data
      .filter((ticker) => ticker.rank <= 100 && ticker.quotes.USD.percent_change_24h > 0)
      .sort((a, b) => b.quotes.USD.percent_change_24h - a.quotes.USD.percent_change_24h);
  };

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
      {getGainers(data).map((ticker) => (
        <View 
          key={ticker.id} 
          style={{
            padding: 16,
            marginBottom: 8,
            backgroundColor: '#e6ffe6',
            borderRadius: 8,
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>{ticker.rank}. {ticker.name} ({ticker.symbol})</Text>
          <Text>Price: ${formatPrice(ticker.quotes.USD.price)}</Text>
          <Text style={{ color: 'green' }}>+{ticker.quotes.USD.percent_change_24h?.toFixed(2) || 'N/A'}%</Text>
        </View>
      ))}
    </ScrollView>
  );
} 