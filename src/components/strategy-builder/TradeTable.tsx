import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Trash2, Plus } from 'lucide-react';
import { Trade } from './StrategyBuilder';

interface TradeTableProps {
  trades: Trade[];
  onAddTrade: (trade: Omit<Trade, 'id'>) => void;
  onRemoveTrade: (id: string) => void;
  onUpdateTrade: (id: string, updates: Partial<Trade>) => void;
}

export const TradeTable: React.FC<TradeTableProps> = ({
  trades,
  onAddTrade,
  onRemoveTrade,
  onUpdateTrade
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTrade, setNewTrade] = useState({
    side: 'BUY' as 'BUY' | 'SELL',
    expiry: '24-07-2025',
    strike: 25000,
    type: 'CE' as 'CE' | 'PE',
    lots: 1,
    price: 100
  });

  const handleAddTrade = () => {
    onAddTrade(newTrade);
    setShowAddForm(false);
    setNewTrade({
      side: 'BUY',
      expiry: '24-07-2025',
      strike: 25000,
      type: 'CE',
      lots: 1,
      price: 100
    });
  };

  return (
    <div className="space-y-4">
      {/* Table Header */}
      <div className="grid grid-cols-7 gap-1 text-xs font-medium text-muted-foreground border-b pb-2">
        <div className="min-w-0">B/S</div>
        <div className="min-w-0">Expiry</div>
        <div className="min-w-0">Strike</div>
        <div className="min-w-0">Type</div>
        <div className="min-w-0">Lots</div>
        <div className="min-w-0">Price</div>
        <div className="min-w-0"></div>
      </div>

      {/* Trade Rows */}
      {trades.map((trade) => (
        <div key={trade.id} className="grid grid-cols-7 gap-1 items-center py-2 border-b border-border/50 relative">
          <div className="min-w-0">
            <span className={`text-xs font-medium whitespace-nowrap ${
              trade.side === 'BUY' ? 'text-profit' : 'text-loss'
            }`}>
              {trade.side}
            </span>
          </div>
          <div className="text-xs truncate" title={trade.expiry}>{trade.expiry}</div>
          <div className="text-xs font-medium truncate">{trade.strike}</div>
          <div className="min-w-0">
            <span className={`text-xs whitespace-nowrap ${
              trade.type === 'CE' ? 'text-blue-600' : 'text-purple-600'
            }`}>
              {trade.type}
            </span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center border border-border rounded-lg">
              <button
                onClick={() => onUpdateTrade(trade.id, { lots: Math.max(1, trade.lots - 1) })}
                className="px-2 py-1 text-xs hover:bg-muted rounded-l-lg"
                disabled={trade.lots <= 1}
              >
                -
              </button>
              <span className="px-2 py-1 text-xs font-medium min-w-[30px] text-center border-x border-border">
                {trade.lots}
              </span>
              <button
                onClick={() => onUpdateTrade(trade.id, { lots: trade.lots + 1 })}
                className="px-2 py-1 text-xs hover:bg-muted rounded-r-lg"
              >
                +
              </button>
            </div>
          </div>
          <div className="min-w-0">
            <Input
              type="number"
              value={trade.price}
              onChange={(e) => onUpdateTrade(trade.id, { price: parseFloat(e.target.value) || 0 })}
              className="h-7 w-full text-xs bg-white"
              step="0.05"
            />
          </div>
          <div className="absolute -right-2 top-1/2 -translate-y-1/2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveTrade(trade.id)}
              className="h-6 w-6 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ))}

      {/* Add Trade Form */}
      {showAddForm && (
        <div className="grid grid-cols-7 gap-1 items-center py-2 border border-border rounded-lg p-3 bg-muted/20">
          <Select value={newTrade.side} onValueChange={(value: 'BUY' | 'SELL') => setNewTrade({...newTrade, side: value})}>
            <SelectTrigger className="h-7">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BUY">BUY</SelectItem>
              <SelectItem value="SELL">SELL</SelectItem>
            </SelectContent>
          </Select>
          
          <Input
            value={newTrade.expiry}
            onChange={(e) => setNewTrade({...newTrade, expiry: e.target.value})}
            className="h-7 text-xs bg-white"
          />
          
          <Input
            type="number"
            value={newTrade.strike}
            onChange={(e) => setNewTrade({...newTrade, strike: parseInt(e.target.value) || 25000})}
            className="h-7 text-xs bg-white"
          />
          
          <Select value={newTrade.type} onValueChange={(value: 'CE' | 'PE') => setNewTrade({...newTrade, type: value})}>
            <SelectTrigger className="h-7">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CE">CE</SelectItem>
              <SelectItem value="PE">PE</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center border border-border rounded-lg">
            <button
              onClick={() => setNewTrade({...newTrade, lots: Math.max(1, newTrade.lots - 1)})}
              className="px-2 py-1 text-xs hover:bg-muted rounded-l-lg"
              disabled={newTrade.lots <= 1}
            >
              -
            </button>
            <span className="px-2 py-1 text-xs font-medium min-w-[30px] text-center border-x border-border">
              {newTrade.lots}
            </span>
            <button
              onClick={() => setNewTrade({...newTrade, lots: newTrade.lots + 1})}
              className="px-2 py-1 text-xs hover:bg-muted rounded-r-lg"
            >
              +
            </button>
          </div>
          
          <Input
            type="number"
            value={newTrade.price}
            onChange={(e) => setNewTrade({...newTrade, price: parseFloat(e.target.value) || 100})}
            className="h-7 text-xs bg-white"
            step="0.05"
          />
          
          <div className="flex gap-1">
            <Button onClick={handleAddTrade} size="sm" className="h-7 text-xs px-2 rounded-full">
              Add
            </Button>
            <Button 
              onClick={() => setShowAddForm(false)} 
              variant="ghost" 
              size="sm" 
              className="h-7 text-xs px-2 rounded-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Add Trade Button */}
      {!showAddForm && (
        <Button
          onClick={() => setShowAddForm(true)}
          variant="outline"
          className="w-full h-10 border-dashed hover:bg-muted/50 rounded-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Trade
        </Button>
      )}
    </div>
  );
};