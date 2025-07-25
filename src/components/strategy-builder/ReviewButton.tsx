import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Trade } from './StrategyBuilder';

interface ReviewButtonProps {
  trades: Trade[];
}

export const ReviewButton: React.FC<ReviewButtonProps> = ({ trades }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);

  const handleReview = async () => {
    setIsLoading(true);
    
    // Simulate review process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsReviewed(true);
    
    // Reset after 3 seconds
    setTimeout(() => setIsReviewed(false), 3000);
  };

  const hasValidTrades = trades.length > 0;
  const hasCompleteData = trades.every(trade => 
    trade.strike > 0 && trade.price > 0 && trade.lots > 0
  );

  const getButtonState = () => {
    if (isLoading) {
      return {
        text: 'Reviewing Strategy...',
        icon: <Clock className="h-4 w-4 animate-spin" />,
        variant: 'default' as const,
        disabled: true
      };
    }
    
    if (isReviewed) {
      return {
        text: 'Strategy Reviewed ✓',
        icon: <CheckCircle className="h-4 w-4" />,
        variant: 'default' as const,
        disabled: false
      };
    }
    
    if (!hasValidTrades || !hasCompleteData) {
      return {
        text: 'Review Strategy',
        icon: <AlertCircle className="h-4 w-4" />,
        variant: 'secondary' as const,
        disabled: true
      };
    }
    
    return {
      text: 'Review Strategy',
      icon: <CheckCircle className="h-4 w-4" />,
      variant: 'default' as const,
      disabled: false
    };
  };

  const buttonState = getButtonState();

  return (
    <div className="space-y-2">
      <Button
        onClick={handleReview}
        disabled={buttonState.disabled}
        variant={buttonState.variant}
        className={`rounded-full px-4 py-2 transition-all duration-300 ${
          isReviewed 
            ? 'bg-success hover:bg-success/90' 
            : isLoading 
            ? 'bg-primary/80' 
            : ''
        }`}
      >
        <span>{buttonState.text}</span>
      </Button>
      
      {!hasValidTrades && (
        <p className="text-xs text-muted-foreground text-center">
          Add at least one trade to review
        </p>
      )}
      
      {hasValidTrades && !hasCompleteData && (
        <p className="text-xs text-muted-foreground text-center">
          Complete all trade details to review
        </p>
      )}
    </div>
  );
};