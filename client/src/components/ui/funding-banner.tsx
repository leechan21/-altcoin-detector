import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle } from "lucide-react";

interface FundingBannerProps {
  className?: string;
}

export function FundingBanner({ className }: FundingBannerProps) {
  const [timeToFunding, setTimeToFunding] = useState<{
    minutes: number;
    seconds: number;
    isFundingTime: boolean;
    nextFundingTime: string;
  }>({ minutes: 0, seconds: 0, isFundingTime: false, nextFundingTime: "" });

  useEffect(() => {
    const updateFundingTimer = () => {
      const now = new Date();
      const currentHour = now.getUTCHours();
      const currentMinute = now.getUTCMinutes();
      const currentSecond = now.getUTCSeconds();

      // Funding times: 01:00, 09:00, 17:00 UTC
      const fundingHours = [1, 9, 17];
      
      // Check if currently in funding time (10 minutes before to 5 minutes after)
      const isFundingTime = fundingHours.some(hour => {
        const timeDiff = (currentHour * 60 + currentMinute) - (hour * 60);
        return timeDiff >= -10 && timeDiff <= 5;
      });

      // Find next funding time
      let nextFunding = fundingHours.find(hour => hour > currentHour);
      if (!nextFunding) {
        nextFunding = fundingHours[0] + 24; // Next day's first funding
      }

      const totalMinutesToNext = (nextFunding * 60) - (currentHour * 60 + currentMinute);
      const minutesToNext = Math.floor(totalMinutesToNext % 60);
      const secondsToNext = 60 - currentSecond;

      const nextFundingHour = nextFunding >= 24 ? nextFunding - 24 : nextFunding;
      const nextFundingTime = `${nextFundingHour.toString().padStart(2, '0')}:00 UTC`;

      setTimeToFunding({
        minutes: minutesToNext,
        seconds: secondsToNext,
        isFundingTime,
        nextFundingTime
      });
    };

    updateFundingTimer();
    const interval = setInterval(updateFundingTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!timeToFunding.isFundingTime && timeToFunding.minutes > 10) {
    return null; // Don't show banner if more than 10 minutes to funding
  }

  return (
    <Card className={`border-warning bg-warning/10 ${className}`}>
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-warning/20 rounded-lg flex items-center justify-center">
              {timeToFunding.isFundingTime ? (
                <AlertTriangle className="text-warning w-4 h-4" />
              ) : (
                <Clock className="text-warning w-4 h-4" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                {timeToFunding.isFundingTime ? (
                  "🚨 펀딩비 정산 시간 - 매매 자제 권장"
                ) : (
                  "⚠️ 펀딩비 정산 시간 10분 전 - 매매 주의"
                )}
              </p>
              <p className="text-xs text-text-secondary">
                다음 펀딩: {timeToFunding.nextFundingTime}
              </p>
            </div>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="text-warning border-warning">
              {timeToFunding.isFundingTime ? (
                "정산 중"
              ) : (
                `${timeToFunding.minutes}분 ${timeToFunding.seconds}초 후`
              )}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}