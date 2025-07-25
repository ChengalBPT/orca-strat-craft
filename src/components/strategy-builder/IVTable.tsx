import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Plus, Minus } from 'lucide-react';

interface IVData {
  strike: number;
  iv: number;
  date: string;
}

export const IVTable: React.FC = () => {
  const [multiplyByLotSize, setMultiplyByLotSize] = useState(false);
  const [multiplyByNumberOfLots, setMultiplyByNumberOfLots] = useState(false);
  
  const [ivData] = useState<IVData[]>([
    { strike: 25000, iv: 14.00, date: '24 Jul 2025' },
    { strike: 25200, iv: 14.00, date: '24 Jul 2025' },
    { strike: 25400, iv: 14.00, date: '24 Jul 2025' }
  ]);

  const adjustIV = (index: number, increment: boolean) => {
    // Implementation for IV adjustment would go here
    console.log(`Adjusting IV for index ${index}, increment: ${increment}`);
  };

  return (
    <Card className="p-6 h-full">
      <h3 className="text-lg font-semibold mb-6">Strikewise IVs</h3>
      
      <div className="h-full flex flex-col">
        {/* IV Entries - Scrollable */}
        <div className="flex-1 overflow-y-auto pr-2">
          {ivData.map((item, index) => (
            <div key={index} className="mb-6">
              <div className="text-sm font-medium mb-2">₹{item.strike.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mb-3">{item.date}</div>
              <div className="flex items-center gap-2 mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full border-border"
                  onClick={() => adjustIV(index, false)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <Input
                  value={item.iv}
                  className="h-8 text-center text-sm font-medium rounded-full px-3 bg-white flex-1"
                  readOnly
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full border-border"
                  onClick={() => adjustIV(index, true)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <div className="h-px bg-border mb-4"></div>
            </div>
          ))}
        </div>

        {/* Controls - Fixed at bottom */}
        <div className="pt-4 border-t space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Multiply by Lot Size</span>
            <Switch 
              checked={multiplyByLotSize}
              onCheckedChange={setMultiplyByLotSize}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Multiply by Number of Lots</span>
            <Switch 
              checked={multiplyByNumberOfLots}
              onCheckedChange={setMultiplyByNumberOfLots}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};