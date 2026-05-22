import { DatabaseIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

interface ProductStatusCardProps {
  title: string;
  iconColor?: string;
  icon?: React.ReactNode;
  value: number;
  isLoading: boolean;
}
const ProductStatusCard = ({
  title,
  iconColor = "text-muted-foreground",
  icon = <DatabaseIcon size={16} className={iconColor} />,
  value,
  isLoading,
}: ProductStatusCardProps) => {
  return (
    <Card className="p-6">
      <CardHeader className="flex items-center gap-2">
        <CardTitle className="text-sm">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">
          {isLoading ? (
            <Skeleton className="w-10 h-8" />
          ) : (
            <span>
              {value}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductStatusCard;
