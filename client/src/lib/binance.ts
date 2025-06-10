import { apiRequest } from "./queryClient";
import type { CoinData, MarketStats, RefreshResponse } from "../types/binance";

export async function fetchTopCoins(): Promise<CoinData[]> {
  const response = await apiRequest("GET", "/api/coins/top");
  return response.json();
}

export async function fetchMarketStats(): Promise<MarketStats> {
  const response = await apiRequest("GET", "/api/market/stats");
  return response.json();
}

export async function refreshMarketData(): Promise<RefreshResponse> {
  const response = await apiRequest("POST", "/api/market/refresh");
  return response.json();
}

export function formatPrice(price: number): string {
  if (price >= 1) {
    return `$${price.toFixed(3)}`;
  } else {
    return `$${price.toFixed(6)}`;
  }
}

export function formatVolume(volume: number): string {
  if (volume >= 1000000000) {
    return `${(volume / 1000000000).toFixed(1)}B`;
  } else if (volume >= 1000000) {
    return `${(volume / 1000000).toFixed(1)}M`;
  } else if (volume >= 1000) {
    return `${(volume / 1000).toFixed(0)}K`;
  }
  return volume.toString();
}

export function formatPercentage(percent: number): string {
  const sign = percent >= 0 ? "+" : "";
  return `${sign}${percent.toFixed(2)}%`;
}

export function getCoinInitial(symbol: string): string {
  return symbol.replace("USDT", "").charAt(0).toUpperCase();
}

export function getCoinGradient(index: number): string {
  const gradients = [
    "from-yellow-500 to-orange-500",
    "from-blue-500 to-purple-500", 
    "from-green-500 to-teal-500",
    "from-red-500 to-pink-500",
    "from-indigo-500 to-blue-500",
    "from-purple-500 to-indigo-500",
    "from-teal-500 to-green-500",
    "from-orange-500 to-red-500",
    "from-pink-500 to-purple-500",
    "from-cyan-500 to-blue-500"
  ];
  return gradients[index % gradients.length];
}
