import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Clock, TrendingUp, Eye } from "lucide-react";
import type { CoinData } from "@/types/binance";
import { formatPrice, formatPercentage, getCoinInitial, getCoinGradient } from "@/lib/binance";

interface PreAlertSectionProps {
  coins: CoinData[];
  className?: string;
}

export function PreAlertSection({ coins, className }: PreAlertSectionProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate time to next 15-minute candle close
  const getTimeToClose = () => {
    const now = new Date();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    const nextClose = Math.ceil((minutes + 1) / 15) * 15;
    const minutesToClose = (nextClose - minutes - 1) % 15;
    const secondsToClose = 60 - seconds;
    
    return { minutes: minutesToClose, seconds: secondsToClose };
  };

  const timeToClose = getTimeToClose();

  // Filter coins that might meet criteria soon
  const preAlertCoins = coins.filter(coin => {
    const expectedVolatility = coin.volatility15m || 0;
    return expectedVolatility >= 1.5 && expectedVolatility < 2.0 && coin.hasStepUpPattern;
  }).slice(0, 5);

  if (preAlertCoins.length === 0) {
    return null;
  }

  return (
    <Card className={`bg-dark-secondary border-warning/30 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center space-x-2">
          <Eye className="w-5 h-5 text-warning" />
          <span>관심 종목 (마감 전 예상)</span>
          <Badge variant="outline" className="text-warning border-warning">
            ⏳ {timeToClose.minutes}분 {timeToClose.seconds}초 후 마감
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {preAlertCoins.map((coin, index) => {
          const progressPercentage = ((15 - timeToClose.minutes) / 15) * 100;
          const expectedVolatility = coin.volatility15m || 0;
          const meetsCriteria = expectedVolatility >= 2.0;
          
          return (
            <div key={coin.symbol} className="flex items-center justify-between p-3 bg-dark-border rounded-lg">
              <div className="flex items-center space-x-3">
                <div 
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm ${getCoinGradient(index)}`}
                >
                  {getCoinInitial(coin.symbol)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-text-primary">{coin.name}</span>
                    <Badge variant={meetsCriteria ? "default" : "secondary"} className="text-xs">
                      {coin.symbol}
                    </Badge>
                  </div>
                  <p className="text-sm text-text-secondary">
                    예상 변동성: {formatPercentage(expectedVolatility)}
                    {coin.hasStepUpPattern && " (계단형 추세 강함)"}
                  </p>
                </div>
              </div>
              
              <div className="text-right space-y-1">
                <div className="text-lg font-bold text-text-primary">
                  {formatPrice(coin.price)}
                </div>
                <div className={`text-sm font-medium ${
                  coin.priceChangePercent >= 0 ? 'text-success' : 'text-danger'
                }`}>
                  {formatPercentage(coin.priceChangePercent)}
                </div>
                
                {/* Progress bar for candle completion */}
                <div className="w-20 h-1.5 bg-dark-primary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-warning/50 to-warning transition-all duration-1000"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <p className="text-xs text-text-secondary">
                  {Math.round(progressPercentage)}% 완료
                </p>
              </div>
            </div>
          );
        })}
        
        <div className="text-center p-2 bg-info/10 rounded-lg">
          <p className="text-xs text-info">
            💡 마감 직전 조건 충족 시 실시간 알림이 표시됩니다
          </p>
        </div>
      </CardContent>
    </Card>
  );
}