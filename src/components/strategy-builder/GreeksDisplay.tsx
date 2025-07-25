import React from 'react';
import { Card } from '@/components/ui/card';

interface GreeksDisplayProps {
  delta: number;
  theta: number;
  decay: number;
  gamma: number;
  vega: number;
}

export const GreeksDisplay: React.FC<GreeksDisplayProps> = ({
  delta,
  theta,
  decay,
  gamma,
  vega
}) => {
  const greeks = [
    { label: 'Delta', value: delta, color: delta >= 0 ? 'text-profit' : 'text-loss' },
    { label: 'Theta', value: theta, color: theta >= 0 ? 'text-profit' : 'text-loss' },
    { label: 'Decay', value: decay, color: decay >= 0 ? 'text-profit' : 'text-loss' },
    { label: 'Gamma', value: gamma, color: gamma >= 0 ? 'text-profit' : 'text-loss' },
    { label: 'Vega', value: vega, color: vega >= 0 ? 'text-profit' : 'text-loss' },
  ];

  return (
    <Card className="p-4 h-full">
      <h3 className="text-lg font-semibold mb-4">Greeks</h3>
      
      <div className="space-y-3">
        {greeks.map((greek) => (
          <div key={greek.label} className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{greek.label}</span>
            <span className={`font-semibold ${greek.color}`}>
              {greek.value > 0 && '+'}
              {greek.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};