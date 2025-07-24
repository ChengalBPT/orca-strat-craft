import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Target } from 'lucide-react';

interface OverviewBoxProps {
  maxProfit: number;
  maxLoss: number;
  breakeven: number[];
  riskReward: number;
}

export const OverviewBox: React.FC<OverviewBoxProps> = ({
  maxProfit,
  maxLoss,
  breakeven,
  riskReward
}) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Overview</h3>
      
      <div className="space-y-4">
        {/* Max Profit */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-profit" />
            <span className="text-sm text-muted-foreground">Max Profit</span>
          </div>
          <span className="font-semibold text-profit">
            ₹{maxProfit.toLocaleString()}
          </span>
        </div>

        {/* Max Loss */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-loss" />
            <span className="text-sm text-muted-foreground">Max Loss</span>
          </div>
          <span className="font-semibold text-loss">
            ₹{maxLoss.toLocaleString()}
          </span>
        </div>

        {/* Risk/Reward */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-neutral" />
            <span className="text-sm text-muted-foreground">Risk / Reward</span>
          </div>
          <span className="font-semibold">{riskReward}</span>
        </div>

        {/* Breakeven */}
        <div className="pt-2 border-t">
          <div className="text-sm text-muted-foreground mb-2">Breakeven</div>
          <div className="space-y-1">
            {breakeven.map((be, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {index === 0 ? '(-0.42%)' : '(0.27%)'}
                </span>
                <span className="font-medium">
                  ₹{be.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};