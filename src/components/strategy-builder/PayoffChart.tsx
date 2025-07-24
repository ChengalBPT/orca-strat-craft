import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';
import { Trade } from './StrategyBuilder';

interface PayoffChartProps {
  trades: Trade[];
  targetPrice: number;
  spotPrice: number;
}

export const PayoffChart: React.FC<PayoffChartProps> = ({ trades, targetPrice, spotPrice }) => {
  const chartData = useMemo(() => {
    const priceRange = [];
    const minPrice = Math.min(spotPrice * 0.85, Math.min(...trades.map(t => t.strike)) - 500);
    const maxPrice = Math.max(spotPrice * 1.15, Math.max(...trades.map(t => t.strike)) + 500);
    
    for (let price = minPrice; price <= maxPrice; price += 50) {
      let totalPnL = 0;
      
      trades.forEach(trade => {
        let optionValue = 0;
        if (trade.type === 'CE') {
          optionValue = Math.max(0, price - trade.strike);
        } else {
          optionValue = Math.max(0, trade.strike - price);
        }
        
        const pnl = trade.side === 'BUY' 
          ? (optionValue - trade.price) * trade.lots * 25
          : (trade.price - optionValue) * trade.lots * 25;
        
        totalPnL += pnl;
      });
      
      priceRange.push({
        price,
        pnl: totalPnL,
        isTarget: Math.abs(price - targetPrice) < 25
      });
    }
    
    return priceRange;
  }, [trades, targetPrice, spotPrice]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const pnl = payload[0].value;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-md">
          <p className="text-sm font-medium">Price: ₹{label}</p>
          <p className={`text-sm font-semibold ${pnl >= 0 ? 'text-profit' : 'text-loss'}`}>
            P&L: {pnl >= 0 ? '+' : ''}₹{pnl.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  const breakevens = chartData.filter(point => 
    Math.abs(point.pnl) < 100 && point.price > Math.min(...trades.map(t => t.strike)) - 200
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Payoff Chart</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-profit"></div>
            <span>On Expiry</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span>On Target Date</span>
          </div>
        </div>
      </div>
      
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--profit))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--profit))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="lossGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--loss))" stopOpacity={0}/>
                <stop offset="95%" stopColor="hsl(var(--loss))" stopOpacity={0.3}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
            <XAxis 
              dataKey="price" 
              domain={['dataMin', 'dataMax']}
              type="number"
              scale="linear"
              tickFormatter={(value) => `₹${value}`}
              className="text-xs"
            />
            <YAxis 
              tickFormatter={(value) => value >= 0 ? `+₹${value}` : `-₹${Math.abs(value)}`}
              className="text-xs"
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            {/* Zero line */}
            <ReferenceLine y={0} stroke="hsl(var(--chart-breakeven))" strokeDasharray="2 2" />
            
            {/* Current spot price */}
            <ReferenceLine 
              x={spotPrice} 
              stroke="hsl(var(--foreground))" 
              strokeDasharray="5 5"
              label={{ value: "Current", position: "top" }}
            />
            
            {/* Target price */}
            <ReferenceLine 
              x={targetPrice} 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              label={{ value: "Target", position: "top" }}
            />
            
            {/* Breakeven points */}
            {breakevens.map((point, index) => (
              <ReferenceLine 
                key={index}
                x={point.price} 
                stroke="hsl(var(--chart-breakeven))" 
                strokeDasharray="3 3"
                label={{ value: "BE", position: "bottom" }}
              />
            ))}
            
            <Area
              type="monotone"
              dataKey="pnl"
              stroke="hsl(var(--profit))"
              strokeWidth={2}
              fill="url(#profitGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="bg-loss/10 border border-loss/20 rounded-lg p-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Projected P&L:</span>
          <span className="font-semibold text-loss">-2,472.26 (-9.80)%</span>
        </div>
      </div>
    </div>
  );
};