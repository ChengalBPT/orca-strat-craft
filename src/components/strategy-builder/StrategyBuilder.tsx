import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { InstrumentSelector } from './InstrumentSelector';
import { TradeTable } from './TradeTable';
import { StrategyPresets } from './StrategyPresets';
import { PayoffChart } from './PayoffChart';
import { OverviewBox } from './OverviewBox';
import { SummaryBox } from './SummaryBox';
import { TargetControls } from './TargetControls';
import { GreeksDisplay } from './GreeksDisplay';
import { IVTable } from './IVTable';
import { ReviewButton } from './ReviewButton';

export interface Trade {
  id: string;
  side: 'BUY' | 'SELL';
  expiry: string;
  strike: number;
  type: 'CE' | 'PE';
  lots: number;
  price: number;
}

export interface Strategy {
  name: string;
  trades: Omit<Trade, 'id' | 'expiry'>[];
}

const StrategyBuilder = () => {
  const [selectedInstrument, setSelectedInstrument] = useState('NIFTY');
  const [selectedExpiry, setSelectedExpiry] = useState('10-07-2025');
  const [trades, setTrades] = useState<Trade[]>([]);
  const [targetPrice, setTargetPrice] = useState(25219);
  const [targetDate, setTargetDate] = useState(new Date('2025-07-24'));
  const [maxProfit, setMaxProfit] = useState(6442.50);
  const [maxLoss, setMaxLoss] = useState(-8557.50);
  const [breakeven, setBreakeven] = useState([25114.10, 25285.90]);

  // Sample initial trades for Bull Butterfly
  useEffect(() => {
    const initialTrades: Trade[] = [
      {
        id: '1',
        side: 'BUY',
        expiry: '24-07-2025',
        strike: 24900,
        type: 'CE',
        lots: 1,
        price: 231.35
      },
      {
        id: '2',
        side: 'SELL',
        expiry: '24-07-2025',
        strike: 25100,
        type: 'CE',
        lots: 1,
        price: 84.55
      },
      {
        id: '3',
        side: 'BUY',
        expiry: '24-07-2025',
        strike: 25300,
        type: 'CE',
        lots: 1,
        price: 21.95
      }
    ];
    setTrades(initialTrades);
  }, []);

  const addTrade = (trade: Omit<Trade, 'id'>) => {
    const newTrade = {
      ...trade,
      id: Date.now().toString()
    };
    setTrades(prev => [...prev, newTrade]);
  };

  const removeTrade = (id: string) => {
    setTrades(prev => prev.filter(trade => trade.id !== id));
  };

  const updateTrade = (id: string, updates: Partial<Trade>) => {
    setTrades(prev => prev.map(trade => 
      trade.id === id ? { ...trade, ...updates } : trade
    ));
  };

  const applyStrategy = (strategy: Strategy) => {
    const newTrades = strategy.trades.map((trade, index) => ({
      ...trade,
      id: Date.now().toString() + index,
      expiry: selectedExpiry
    }));
    setTrades(newTrades);
  };

  return (
    <div className="min-h-screen bg-background p-3">
      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-3 mb-3">
        <div className="flex-1">
          <InstrumentSelector
            selectedInstrument={selectedInstrument}
            selectedExpiry={selectedExpiry}
            onInstrumentChange={setSelectedInstrument}
            onExpiryChange={setSelectedExpiry}
          />
        </div>
        <div className="lg:w-auto">
          <ReviewButton trades={trades} />
        </div>
      </div>

      {/* Main Content Layout - 40/60 split */}
      <div className="flex gap-3 h-[calc(100vh-120px)]">
        {/* Left Column - 40% width, static */}
        <div className="w-[40%] space-y-3">
          {/* Strategy Table */}
          <Card className="p-4 animate-fade-in-up">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Strategy Builder</h2>
            <TradeTable
              trades={trades}
              onAddTrade={addTrade}
              onRemoveTrade={removeTrade}
              onUpdateTrade={updateTrade}
            />
          </Card>

          {/* Strategy Presets */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <StrategyPresets onApplyStrategy={applyStrategy} />
          </div>

          {/* Payoff Chart */}
          <Card className="p-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <PayoffChart
              trades={trades}
              targetPrice={targetPrice}
              spotPrice={25362.60}
            />
          </Card>
        </div>

        {/* Right Column - 60% width, scrollable */}
        <div className="w-[60%] overflow-y-auto space-y-3 pr-2">
          {/* Top Row - Overview and Summary side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <OverviewBox
                maxProfit={maxProfit}
                maxLoss={maxLoss}
                breakeven={breakeven}
                riskReward={1.33}
              />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <SummaryBox
                pop={8.46}
                availableFunds={107600.50}
                reqMargin={246537.45}
                marginBenefit={162215.75}
                finalMargin={84321.70}
                numberOfLegs={trades.length}
              />
            </div>
          </div>

          {/* Target Controls */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <TargetControls
              targetPrice={targetPrice}
              targetDate={targetDate}
              onTargetPriceChange={setTargetPrice}
              onTargetDateChange={setTargetDate}
            />
          </div>

          {/* Greeks */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <GreeksDisplay
              delta={0.52}
              theta={22.41}
              decay={0.17}
              gamma={-0.0013}
              vega={-1.50}
            />
          </div>

          {/* IV Table */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <IVTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyBuilder;