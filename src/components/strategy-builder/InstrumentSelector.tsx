import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Calendar, ChevronDown, TrendingUp, TrendingDown } from 'lucide-react';

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
      <div className="flex items-center justify-between">
        {/* Left Side - Instrument and Price */}
        <div className="flex flex-col gap-2">
          {/* Symbol Dropdown */}
          <div className="flex items-center">
            <Select value={selectedInstrument} onValueChange={onInstrumentChange}>
              <SelectTrigger className="border-none shadow-none p-0 h-auto bg-transparent hover:bg-transparent focus:ring-0 focus:ring-offset-0">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold">{selectedInstrument}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {instruments.map(instrument => (
                  <SelectItem key={instrument.value} value={instrument.value}>
                    <span className="font-medium">{instrument.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price and Change */}
          {currentInstrument && (
            <div className="flex items-center gap-2">
              <span className="text-base font-medium">{currentInstrument.price}</span>
              <div className="flex items-center gap-1">
                {currentInstrument.positive ? (
                  <TrendingUp className="h-3 w-3 text-profit" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-loss" />
                )}
                <span className={`text-sm ${currentInstrument.positive ? 'text-profit' : 'text-loss'}`}>
                  {currentInstrument.change}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Expiry */}
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Expiry</span>
          <Select value={selectedExpiry} onValueChange={onExpiryChange}>
            <SelectTrigger className="border-none shadow-none p-0 h-auto bg-transparent hover:bg-transparent focus:ring-0 focus:ring-offset-0">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">{selectedExpiry}</span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </div>
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
    </Card>
  );
};