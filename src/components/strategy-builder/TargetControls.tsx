import React from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TargetControlsProps {
  targetPrice: number;
  targetDate: Date;
  onTargetPriceChange: (price: number) => void;
  onTargetDateChange: (date: Date) => void;
}

export const TargetControls: React.FC<TargetControlsProps> = ({
  targetPrice,
  targetDate,
  onTargetPriceChange,
  onTargetDateChange
}) => {
  const handlePriceChange = (values: number[]) => {
    onTargetPriceChange(values[0]);
  };

  const adjustDate = (days: number) => {
    const newDate = new Date(targetDate);
    newDate.setDate(newDate.getDate() + days);
    onTargetDateChange(newDate);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-4">
      {/* NIFTY Target */}
      <Card className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">NIFTY Target</span>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => onTargetPriceChange(targetPrice - 50)}
              >
                -
              </Button>
              <span className="font-semibold min-w-[60px] text-center">
                {targetPrice}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => onTargetPriceChange(targetPrice + 50)}
              >
                +
              </Button>
            </div>
          </div>
          
          <div className="px-2">
            <Slider
              value={[targetPrice]}
              onValueChange={handlePriceChange}
              max={30000}
              min={20000}
              step={50}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>3.19%</span>
              <span>-260</span>
              <span>+150</span>
              <span>+250</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Target Date */}
      <Card className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Target Date</span>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => adjustDate(-1)}
              >
                <ChevronLeft className="h-3 w-3" />
              </Button>
              <span className="text-sm font-medium min-w-[120px] text-center">
                {formatDate(targetDate)}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => adjustDate(1)}
              >
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
          
          <div className="text-left">
            <div className="text-xs text-muted-foreground mb-2">0 D to expiry</div>
          </div>
          
          <div className="px-2">
            <Slider
              value={[12]}
              onValueChange={(values) => {
                // Handle time change in 15-minute intervals
                const timeValue = values[0];
                const newDate = new Date(targetDate);
                const hours = Math.floor(timeValue / 4) + 9; // Start from 9 AM
                const minutes = (timeValue % 4) * 15;
                newDate.setHours(hours, minutes, 0, 0);
                onTargetDateChange(newDate);
              }}
              max={24} // 6 hours * 4 (15-min intervals) = 24 intervals from 9 AM to 3 PM
              min={0}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>9:00</span>
              <span>12:00</span>
              <span>15:00</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};