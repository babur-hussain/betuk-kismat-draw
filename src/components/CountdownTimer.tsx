import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface CountdownTimerProps {
  title?: string;
  targetHours?: number;
}

const CountdownTimer = ({ title = "Next Draw In:", targetHours = 6 }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(target.getHours() + targetHours);
      
      const difference = target.getTime() - now.getTime();
      
      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ hours, minutes, seconds });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [targetHours]);

  return (
    <Card className="gradient-border bg-card/50 backdrop-blur-sm">
      <div className="p-6 text-center">
        <h3 className="text-lg font-bold gradient-text mb-4">{title}</h3>
        <div className="flex justify-center gap-4">
          <div className="bg-gradient-festival rounded-lg p-3 min-w-[60px] animate-pulse-glow">
            <div className="text-2xl font-bold text-primary-foreground">{timeLeft.hours.toString().padStart(2, '0')}</div>
            <div className="text-xs text-primary-foreground opacity-80">Hours</div>
          </div>
          <div className="bg-gradient-festival rounded-lg p-3 min-w-[60px] animate-pulse-glow">
            <div className="text-2xl font-bold text-primary-foreground">{timeLeft.minutes.toString().padStart(2, '0')}</div>
            <div className="text-xs text-primary-foreground opacity-80">Mins</div>
          </div>
          <div className="bg-gradient-festival rounded-lg p-3 min-w-[60px] animate-pulse-glow">
            <div className="text-2xl font-bold text-primary-foreground">{timeLeft.seconds.toString().padStart(2, '0')}</div>
            <div className="text-xs text-primary-foreground opacity-80">Secs</div>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground animate-bounce-subtle">
          ⚡ Limited Time Offer - Don't Miss Out!
        </p>
      </div>
    </Card>
  );
};

export default CountdownTimer;