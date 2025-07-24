import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Strategy } from './StrategyBuilder';
import { TrendingUp, TrendingDown, Minus, RotateCcw } from 'lucide-react';

interface StrategyPresetsProps {
  onApplyStrategy: (strategy: Strategy) => void;
}

const strategies: Strategy[] = [
  {
    name: 'Bull Call Spread',
    trades: [
      { side: 'BUY', strike: 25000, type: 'CE', lots: 1, price: 150 },
      { side: 'SELL', strike: 25200, type: 'CE', lots: 1, price: 75 }
    ]
  },
  {
    name: 'Sell Put',
    trades: [
      { side: 'SELL', strike: 25000, type: 'PE', lots: 1, price: 120 }
    ]
  },
  {
    name: 'Call Ratio Back Spread',
    trades: [
      { side: 'SELL', strike: 25100, type: 'CE', lots: 1, price: 100 },
      { side: 'BUY', strike: 25300, type: 'CE', lots: 2, price: 50 }
    ]
  },
  {
    name: 'Bull Butterfly',
    trades: [
      { side: 'BUY', strike: 24900, type: 'CE', lots: 1, price: 231.35 },
      { side: 'SELL', strike: 25100, type: 'CE', lots: 2, price: 84.55 },
      { side: 'BUY', strike: 25300, type: 'CE', lots: 1, price: 21.95 }
    ]
  },
  {
    name: 'Long Calendar with Calls',
    trades: [
      { side: 'SELL', strike: 25200, type: 'CE', lots: 1, price: 85 },
      { side: 'BUY', strike: 25200, type: 'CE', lots: 1, price: 120 }
    ]
  },
  {
    name: 'Bull Call Spread',
    trades: [
      { side: 'BUY', strike: 25000, type: 'CE', lots: 1, price: 150 },
      { side: 'SELL', strike: 25200, type: 'CE', lots: 1, price: 75 }
    ]
  },
  {
    name: 'Bull Condor',
    trades: [
      { side: 'BUY', strike: 24800, type: 'CE', lots: 1, price: 280 },
      { side: 'SELL', strike: 25000, type: 'CE', lots: 1, price: 150 },
      { side: 'SELL', strike: 25200, type: 'CE', lots: 1, price: 75 },
      { side: 'BUY', strike: 25400, type: 'CE', lots: 1, price: 25 }
    ]
  },
  {
    name: 'Range Forward',
    trades: [
      { side: 'BUY', strike: 25000, type: 'CE', lots: 1, price: 150 },
      { side: 'SELL', strike: 25000, type: 'PE', lots: 1, price: 120 }
    ]
  },
  {
    name: 'Long Synthetic Future',
    trades: [
      { side: 'BUY', strike: 25200, type: 'CE', lots: 1, price: 85 },
      { side: 'SELL', strike: 25200, type: 'PE', lots: 1, price: 110 }
    ]
  }
];

const getStrategyIcon = (name: string) => {
  if (name.includes('Bull')) return <TrendingUp className="h-4 w-4" />;
  if (name.includes('Bear')) return <TrendingDown className="h-4 w-4" />;
  if (name.includes('Sell')) return <Minus className="h-4 w-4" />;
  return <RotateCcw className="h-4 w-4" />;
};

const getStrategyColor = (name: string) => {
  if (name.includes('Bull')) return 'border-profit/20 hover:border-profit/40 hover:bg-profit/5';
  if (name.includes('Bear')) return 'border-loss/20 hover:border-loss/40 hover:bg-loss/5';
  return 'border-neutral/20 hover:border-neutral/40 hover:bg-neutral/5';
};

export const StrategyPresets: React.FC<StrategyPresetsProps> = ({ onApplyStrategy }) => {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Pick a Ready-Made Strategy to start with</h3>
        <p className="text-sm text-muted-foreground">Choose from popular options strategies</p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {strategies.map((strategy, index) => (
          <Button
            key={index}
            variant="outline"
            onClick={() => onApplyStrategy(strategy)}
            className={`h-auto p-2 flex flex-col items-center gap-1.5 text-center transition-all min-h-[70px] ${getStrategyColor(strategy.name)}`}
          >
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted flex-shrink-0">
              {getStrategyIcon(strategy.name)}
            </div>
            <span className="text-xs font-medium leading-tight line-clamp-2 break-words hyphens-auto overflow-hidden">
              {strategy.name}
            </span>
          </Button>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <Button variant="ghost" size="sm" className="text-primary">
          Build on your own →
        </Button>
      </div>
    </Card>
  );
};