import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Users, Gift, Clock } from 'lucide-react';

interface LiveCounterProps {
  type: 'users' | 'coupons' | 'winners';
  currentValue?: number;
  maxValue?: number;
  label: string;
  urgencyText?: string;
}

const LiveCounter = ({ 
  type, 
  currentValue = 0, 
  maxValue = 100, 
  label, 
  urgencyText 
}: LiveCounterProps) => {
  const [count, setCount] = useState(currentValue);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Simulate live updates
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance of update
        setIsAnimating(true);
        setCount(prev => {
          if (type === 'coupons') {
            return Math.max(10, prev - Math.floor(Math.random() * 3)); // Decrease coupons
          } else {
            return prev + Math.floor(Math.random() * 5) + 1; // Increase users/winners
          }
        });
        
        setTimeout(() => setIsAnimating(false), 500);
      }
    }, 3000 + Math.random() * 4000); // Random interval 3-7 seconds

    return () => clearInterval(interval);
  }, [type]);

  const getIcon = () => {
    switch (type) {
      case 'users': return <Users className="w-5 h-5" />;
      case 'coupons': return <Gift className="w-5 h-5" />;
      case 'winners': return <Clock className="w-5 h-5" />;
      default: return <Users className="w-5 h-5" />;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'users': return 'text-blue-400';
      case 'coupons': return 'text-red-400';
      case 'winners': return 'text-green-400';
      default: return 'text-gold';
    }
  };

  const progressPercentage = Math.min((count / maxValue) * 100, 100);

  return (
    <Card className="gradient-border bg-card/50 backdrop-blur-sm overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 rounded-full bg-gradient-festival ${getColor()}`}>
            {getIcon()}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-bold ${isAnimating ? 'animate-confetti' : ''} gradient-text`}>
                {count.toLocaleString()}
              </span>
              {type === 'coupons' && count < 50 && (
                <span className="text-xs bg-red text-red-foreground px-2 py-1 rounded-full animate-pulse-glow">
                  LOW STOCK!
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        </div>
        
        {maxValue && (
          <div className="space-y-2">
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{count.toLocaleString()}</span>
              <span>{maxValue.toLocaleString()}</span>
            </div>
          </div>
        )}
        
        {urgencyText && (
          <p className="mt-3 text-sm font-medium text-center animate-bounce-subtle">
            🔥 {urgencyText}
          </p>
        )}
      </div>
    </Card>
  );
};

export default LiveCounter;