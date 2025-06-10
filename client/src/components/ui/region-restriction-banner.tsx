import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

interface RegionRestrictionBannerProps {
  className?: string;
}

export function RegionRestrictionBanner({ className }: RegionRestrictionBannerProps) {
  return (
    <Card className={`border-destructive bg-destructive/10 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-destructive/20 rounded-lg flex items-center justify-center">
            <AlertTriangle className="text-destructive w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="text-sm font-medium text-text-primary">
                바이낸스 API 지역 제한
              </h4>
              <Badge variant="destructive" className="text-xs">
                451 오류
              </Badge>
            </div>
            <p className="text-xs text-text-secondary mb-2">
              현재 서버 위치에서 바이낸스 API 접근이 차단되어 있습니다.
            </p>
            <p className="text-xs text-warning">
              실제 데이터 접근을 위해 VPN 또는 다른 지역의 서버가 필요합니다.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}