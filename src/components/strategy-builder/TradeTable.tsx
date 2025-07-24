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
      <div className="grid grid-cols-8 gap-2 text-sm font-medium text-muted-foreground border-b pb-2">
        <div>B/S</div>
        <div>Expiry</div>
        <div>Strike</div>
        <div>Type</div>
        <div>Lots</div>
        <div>Price</div>
        <div>Premium</div>
        <div></div>
      </div>

      {/* Trade Rows */}
      {trades.map((trade) => (
        <div key={trade.id} className="grid grid-cols-8 gap-2 items-center py-2 border-b border-border/50">
          <div>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              trade.side === 'BUY' 
                ? 'bg-profit/10 text-profit' 
                : 'bg-loss/10 text-loss'
            }`}>
              {trade.side}
            </span>
          </div>
          <div className="text-sm">{trade.expiry}</div>
          <div className="text-sm font-medium">{trade.strike}</div>
          <div>
            <span className={`px-2 py-1 rounded text-xs ${
              trade.type === 'CE' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-purple-100 text-purple-700'
            }`}>
              {trade.type}
            </span>
          </div>
          <div>
            <Input
              type="number"
              value={trade.lots}
              onChange={(e) => onUpdateTrade(trade.id, { lots: parseInt(e.target.value) || 1 })}
              className="h-8 w-16 text-sm"
              min="1"
            />
          </div>
          <div>
            <Input
              type="number"
              value={trade.price}
              onChange={(e) => onUpdateTrade(trade.id, { price: parseFloat(e.target.value) || 0 })}
              className="h-8 w-20 text-sm"
              step="0.05"
            />
          </div>
          <div className="text-sm font-medium">
            ₹{(trade.lots * trade.price * 25).toLocaleString()}
          </div>
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveTrade(trade.id)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      {/* Add Trade Form */}
      {showAddForm && (
        <div className="grid grid-cols-8 gap-2 items-center py-2 border border-border rounded-lg p-3 bg-muted/20">
          <Select value={newTrade.side} onValueChange={(value: 'BUY' | 'SELL') => setNewTrade({...newTrade, side: value})}>
            <SelectTrigger className="h-8">
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
            className="h-8 text-sm"
          />
          
          <Input
            type="number"
            value={newTrade.strike}
            onChange={(e) => setNewTrade({...newTrade, strike: parseInt(e.target.value) || 25000})}
            className="h-8 text-sm"
          />
          
          <Select value={newTrade.type} onValueChange={(value: 'CE' | 'PE') => setNewTrade({...newTrade, type: value})}>
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CE">CE</SelectItem>
              <SelectItem value="PE">PE</SelectItem>
            </SelectContent>
          </Select>
          
          <Input
            type="number"
            value={newTrade.lots}
            onChange={(e) => setNewTrade({...newTrade, lots: parseInt(e.target.value) || 1})}
            className="h-8 w-16 text-sm"
            min="1"
          />
          
          <Input
            type="number"
            value={newTrade.price}
            onChange={(e) => setNewTrade({...newTrade, price: parseFloat(e.target.value) || 100})}
            className="h-8 w-20 text-sm"
            step="0.05"
          />
          
          <div className="text-sm">
            ₹{(newTrade.lots * newTrade.price * 25).toLocaleString()}
          </div>
          
          <div className="flex gap-1">
            <Button onClick={handleAddTrade} size="sm" className="h-8">
              Add
            </Button>
            <Button 
              onClick={() => setShowAddForm(false)} 
              variant="ghost" 
              size="sm" 
              className="h-8"
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
          className="w-full h-10 border-dashed hover:bg-muted/50"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Trade
        </Button>
      )}
    </div>
  );
};