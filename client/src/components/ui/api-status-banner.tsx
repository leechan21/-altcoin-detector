import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Settings, Key } from "lucide-react";

interface ApiStatusBannerProps {
  error?: {
    needsDeployment?: boolean;
    apiKeysConfigured?: boolean;
    details?: string;
  };
  className?: string;
}

export function ApiStatusBanner({ error, className }: ApiStatusBannerProps) {
  if (!error) return null;

  return (
    <Card className={`border-warning bg-warning/10 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-warning/20 rounded-lg flex items-center justify-center">
            {error.needsDeployment ? (
              <Settings className="text-warning w-4 h-4" />
            ) : (
              <Key className="text-warning w-4 h-4" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="text-sm font-medium text-text-primary">
                바이낸스 API 상태
              </h4>
              <Badge variant="outline" className="text-warning border-warning text-xs">
                {error.needsDeployment ? "배포 필요" : "키 확인 필요"}
              </Badge>
            </div>
            <p className="text-xs text-text-secondary">
              {error.details || "API 접근에 문제가 있습니다"}
            </p>
            {error.apiKeysConfigured && (
              <p className="text-xs text-success mt-1">
                ✓ API 키가 설정되어 있습니다
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}