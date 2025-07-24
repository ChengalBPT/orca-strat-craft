import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { TrendingUp, Calendar } from 'lucide-react';

interface InstrumentSelectorProps {
  selectedInstrument: string;
  selectedExpiry: string;
  onInstrumentChange: (instrument: string) => void;
  onExpiryChange: (expiry: string) => void;
}

const instruments = [
  { value: 'NIFTY', label: 'NIFTY', price: '25362.60', change: '-107.00 (0.41%)', positive: false },
  { value: 'SENSEX', label: 'SENSEX', price: '22075.70', change: '+0.24%', positive: true },
  { value: 'BANKNIFTY', label: 'BANKNIFTY', price: '51245.30', change: '-0.15%', positive: false }
];

const expiries = [
  '10-07-2025',
  '17-07-2025',
  '24-07-2025',
  '31-07-2025',
  '07-08-2025'
];

export const InstrumentSelector: React.FC<InstrumentSelectorProps> = ({
  selectedInstrument,
  selectedExpiry,
  onInstrumentChange,
  onExpiryChange
}) => {
  const currentInstrument = instruments.find(i => i.value === selectedInstrument);

  return (
    <Card className="p-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Instrument Selection */}
        <div className="flex items-center gap-3">
          <TrendingUp className="h-5 w-5 text-muted-foreground" />
          <div className="space-y-1">
            <Select value={selectedInstrument} onValueChange={onInstrumentChange}>
              <SelectTrigger className="w-[140px] h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {instruments.map(instrument => (
                  <SelectItem key={instrument.value} value={instrument.value}>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{instrument.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Current Price Display */}
        {currentInstrument && (
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-lg font-bold">{currentInstrument.price}</div>
              <div className={`text-sm ${currentInstrument.positive ? 'text-profit' : 'text-loss'}`}>
                {currentInstrument.change}
              </div>
            </div>
          </div>
        )}

        {/* Expiry Selection */}
        <div className="flex items-center gap-3 ml-auto">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Expiry</label>
            <Select value={selectedExpiry} onValueChange={onExpiryChange}>
              <SelectTrigger className="w-[120px] h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {expiries.map(expiry => (
                  <SelectItem key={expiry} value={expiry}>
                    {expiry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Card>
  );
};