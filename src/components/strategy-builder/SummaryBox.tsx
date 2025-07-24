import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SummaryBoxProps {
  pop: number;
  availableFunds: number;
  reqMargin: number;
  marginBenefit: number;
  finalMargin: number;
  numberOfLegs: number;
}

export const SummaryBox: React.FC<SummaryBoxProps> = ({
  pop,
  availableFunds,
  reqMargin,
  marginBenefit,
  finalMargin,
  numberOfLegs
}) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Summary</h3>
      
      <div className="space-y-3">
        {/* POP */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">POP</span>
          <Badge variant="secondary" className="font-semibold">
            {pop}%
          </Badge>
        </div>

        {/* Available Funds */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Available Funds</span>
          <span className="font-medium">₹{availableFunds.toLocaleString()}</span>
        </div>

        {/* Required Margin */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Req. Margin</span>
          <span className="font-medium">₹{reqMargin.toLocaleString()}</span>
        </div>

        {/* Margin Benefit */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Margin Benefit</span>
          <span className="font-medium text-profit">₹{marginBenefit.toLocaleString()}</span>
        </div>

        {/* Final Margin */}
        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-sm font-medium">Final Margin</span>
          <span className="font-bold">₹{finalMargin.toLocaleString()}</span>
        </div>

        {/* Number of Legs */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Number Of Legs</span>
          <Badge variant="outline">{numberOfLegs}</Badge>
        </div>
      </div>
    </Card>
  );
};