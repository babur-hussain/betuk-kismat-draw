import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, MapPin, Gift, Crown } from 'lucide-react';

interface Winner {
  id: string;
  name: string;
  location: string;
  prize: string;
  timeAgo: string;
  amount?: string;
}

const mockWinners: Winner[] = [
  { id: '1', name: 'Amit Kumar', location: 'Betul', prize: 'Smartwatch', timeAgo: '2 min ago', amount: '₹15,000' },
  { id: '2', name: 'Priya Singh', location: 'Bhopal', prize: 'Land Plot', timeAgo: '15 min ago', amount: '₹2,50,000' },
  { id: '3', name: 'Rajesh Patel', location: 'Indore', prize: 'Cash Prize', timeAgo: '1 hour ago', amount: '₹50,000' },
  { id: '4', name: 'Sunita Sharma', location: 'Betul', prize: 'Gold Jewelry', timeAgo: '3 hours ago', amount: '₹80,000' },
  { id: '5', name: 'Vikash Jain', location: 'Jabalpur', prize: 'Car', timeAgo: '1 day ago', amount: '₹8,00,000' },
  { id: '6', name: 'Meera Gupta', location: 'Betul', prize: 'Cash Prize', timeAgo: '2 days ago', amount: '₹25,000' },
];

const WinnerShowcase = () => {
  const [currentWinners, setCurrentWinners] = useState(mockWinners.slice(0, 3));
  const [highlightIndex, setHighlightIndex] = useState(0);

  useEffect(() => {
    // Rotate through winners to show fresh content
    const interval = setInterval(() => {
      setCurrentWinners(prev => {
        const shuffled = [...mockWinners].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 3);
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Highlight effect rotation
    const highlight = setInterval(() => {
      setHighlightIndex(prev => (prev + 1) % 3);
    }, 2000);

    return () => clearInterval(highlight);
  }, []);

  const getPrizeIcon = (prize: string) => {
    if (prize.includes('Land') || prize.includes('Plot')) return <MapPin className="w-4 h-4" />;
    if (prize.includes('Car')) return <Crown className="w-4 h-4" />;
    if (prize.includes('Cash')) return <Gift className="w-4 h-4" />;
    return <Trophy className="w-4 h-4" />;
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold gradient-text mb-2">🏆 Recent Winners</h2>
        <p className="text-muted-foreground">Real people, Real prizes, Real dreams fulfilled!</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        {currentWinners.map((winner, index) => (
          <Card 
            key={winner.id} 
            className={`
              gradient-border bg-card/50 backdrop-blur-sm transition-all duration-500
              ${highlightIndex === index ? 'animate-pulse-glow scale-105' : ''}
            `}
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getPrizeIcon(winner.prize)}
                  <div>
                    <h3 className="font-semibold text-foreground">{winner.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {winner.location}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs animate-float">
                  {winner.timeAgo}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="bg-gradient-winner rounded-lg p-3 text-center">
                  <p className="text-sm font-medium text-primary-foreground">Won: {winner.prize}</p>
                  {winner.amount && (
                    <p className="text-lg font-bold text-primary-foreground">{winner.amount}</p>
                  )}
                </div>
                
                <p className="text-xs text-center text-muted-foreground">
                  💫 "My ₹100 changed everything!"
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="text-center p-4 bg-gradient-festival rounded-lg">
        <p className="text-primary-foreground font-medium animate-bounce-subtle">
          🎯 Your turn could be NEXT! Join {(5420 + Math.floor(Math.random() * 100)).toLocaleString()} others who are already playing!
        </p>
      </div>
    </div>
  );
};

export default WinnerShowcase;