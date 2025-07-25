import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trash2, Plus, ChevronDown } from 'lucide-react';
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
      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[60px_120px_80px_50px_80px_100px_40px] gap-3 px-4 py-3 bg-muted/50 text-xs font-medium text-muted-foreground border-b">
          <div>B/S</div>
          <div>Expiry</div>
          <div>Strike</div>
          <div>Type</div>
          <div>Lots</div>
          <div>Price</div>
          <div></div>
        </div>

        {/* Trade Rows */}
        {trades.map((trade) => (
          <div key={trade.id} className="grid grid-cols-[60px_120px_80px_50px_80px_100px_40px] gap-3 px-4 py-3 border-b border-border/50 items-center hover:bg-muted/20">
            <div className="flex items-center">
              <span className={`text-xs font-medium ${
                trade.side === 'BUY' ? 'text-profit' : 'text-loss'
              }`}>
                {trade.side}
              </span>
            </div>
            <div className="flex items-center">
              <Select value={trade.expiry} onValueChange={(value) => onUpdateTrade(trade.id, { expiry: value })}>
                <SelectTrigger className="h-7 border-0 p-0 text-xs font-normal bg-transparent shadow-none focus:ring-0">
                  <div className="flex items-center gap-1">
                    <span>{trade.expiry}</span>
                    <ChevronDown className="h-3 w-3" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24-07-2025">24-07-2025</SelectItem>
                  <SelectItem value="31-07-2025">31-07-2025</SelectItem>
                  <SelectItem value="07-08-2025">07-08-2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center">
              <span className="text-xs font-medium">{trade.strike}</span>
            </div>
            <div className="flex items-center">
              <span className={`text-xs ${
                trade.type === 'CE' ? 'text-blue-600' : 'text-purple-600'
              }`}>
                {trade.type}
              </span>
            </div>
            <div className="flex items-center">
              <div className="flex items-center border border-border rounded-lg w-fit">
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
            <div className="flex items-center">
              <Input
                type="number"
                value={trade.price}
                onChange={(e) => onUpdateTrade(trade.id, { price: parseFloat(e.target.value) || 0 })}
                className="h-7 w-full text-xs bg-white"
                step="0.05"
              />
            </div>
            <div className="flex items-center justify-center">
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
      </div>

      {/* Add Trade Button */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-10 border-dashed hover:bg-muted/50 rounded-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Trade
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Trade</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Side</label>
                <Select value={newTrade.side} onValueChange={(value: 'BUY' | 'SELL') => setNewTrade({...newTrade, side: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BUY">BUY</SelectItem>
                    <SelectItem value="SELL">SELL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Expiry</label>
                <Select value={newTrade.expiry} onValueChange={(value) => setNewTrade({...newTrade, expiry: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24-07-2025">24-07-2025</SelectItem>
                    <SelectItem value="31-07-2025">31-07-2025</SelectItem>
                    <SelectItem value="07-08-2025">07-08-2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Strike</label>
                <Input
                  type="number"
                  value={newTrade.strike}
                  onChange={(e) => setNewTrade({...newTrade, strike: parseInt(e.target.value) || 25000})}
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select value={newTrade.type} onValueChange={(value: 'CE' | 'PE') => setNewTrade({...newTrade, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CE">CE</SelectItem>
                    <SelectItem value="PE">PE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Lots</label>
                <div className="flex items-center border border-border rounded-lg w-fit">
                  <button
                    onClick={() => setNewTrade({...newTrade, lots: Math.max(1, newTrade.lots - 1)})}
                    className="px-3 py-2 hover:bg-muted rounded-l-lg"
                    disabled={newTrade.lots <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-medium min-w-[50px] text-center border-x border-border">
                    {newTrade.lots}
                  </span>
                  <button
                    onClick={() => setNewTrade({...newTrade, lots: newTrade.lots + 1})}
                    className="px-3 py-2 hover:bg-muted rounded-r-lg"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Price</label>
                <Input
                  type="number"
                  value={newTrade.price}
                  onChange={(e) => setNewTrade({...newTrade, price: parseFloat(e.target.value) || 100})}
                  className="bg-white"
                  step="0.05"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button 
                onClick={() => setShowAddForm(false)} 
                variant="outline"
              >
                Cancel
              </Button>
              <Button onClick={handleAddTrade}>
                Add Trade
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};