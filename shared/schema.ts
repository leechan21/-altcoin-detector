import { pgTable, text, serial, integer, boolean, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const coinData = pgTable("coin_data", {
  id: serial("id").primaryKey(),
  symbol: text("symbol").notNull(),
  name: text("name").notNull(),
  price: real("price").notNull(),
  priceChangePercent: real("price_change_percent").notNull(),
  volume: real("volume").notNull(),
  volatility15m: real("volatility_15m").notNull(),
  hasStepUpPattern: boolean("has_step_up_pattern").default(false),
  hasAlert: boolean("has_alert").default(false),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertCoinDataSchema = createInsertSchema(coinData).omit({
  id: true,
  updatedAt: true,
});

export type InsertCoinData = z.infer<typeof insertCoinDataSchema>;
export type CoinData = typeof coinData.$inferSelect;

// Binance API response types
export interface BinanceTicker24hr {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  prevClosePrice: string;
  lastPrice: string;
  lastQty: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
}

export interface BinanceKline {
  openTime: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  closeTime: number;
  quoteAssetVolume: string;
  numberOfTrades: number;
  takerBuyBaseAssetVolume: string;
  takerBuyQuoteAssetVolume: string;
}
