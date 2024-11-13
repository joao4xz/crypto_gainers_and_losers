/**
 * Represents a cryptocurrency ticker with market data
 * @interface Ticker
 */
export interface Ticker {
  /** Unique identifier for the cryptocurrency */
  id: string;
  /** Full name of the cryptocurrency */
  name: string;
  /** Trading symbol/ticker of the cryptocurrency */
  symbol: string;
  /** Market cap rank of the cryptocurrency */
  rank: number;
  /** Price quotes in different currencies */
  quotes: {
    /** US Dollar price information */
    USD: {
      /** Current price in USD */
      price: number;
      /** 24-hour price change percentage */
      percent_change_24h: number;
    };
  };
} 