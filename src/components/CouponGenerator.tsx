import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Gift, Sparkles, Zap, Star } from 'lucide-react';

const CouponGenerator = () => {
  const [formData, setFormData] = useState({ name: '', mobile: '' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCoupon, setGeneratedCoupon] = useState('');
  const [showCoupon, setShowCoupon] = useState(false);

  const generateCoupon = () => {
    const prefix = '4BET';
    const randomNum = Math.floor(Math.random() * 999999).toString().padStart(6, '0');
    return `${prefix}${randomNum}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) return;

    setIsGenerating(true);
    
    // Simulate payment and coupon generation
    setTimeout(() => {
      const newCoupon = generateCoupon();
      setGeneratedCoupon(newCoupon);
      setIsGenerating(false);
      setShowCoupon(true);
    }, 3000);
  };

  if (showCoupon) {
    return (
      <Card className="gradient-border bg-card/50 backdrop-blur-sm overflow-hidden">
        <div className="p-8 text-center space-y-6">
          <div className="animate-confetti">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold gradient-text">Congratulations!</h2>
            <p className="text-muted-foreground">Your Lucky Draw Coupon is Ready!</p>
          </div>
          
          <div className="bg-gradient-festival rounded-lg p-6 animate-pulse-glow">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Gift className="w-6 h-6 text-primary-foreground" />
              <h3 className="text-lg font-bold text-primary-foreground">Your Lucky Code</h3>
              <Gift className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="text-3xl font-mono font-bold text-primary-foreground tracking-wider">
              {generatedCoupon}
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              📱 Coupon sent to: {formData.mobile}
            </p>
            <p className="text-sm text-muted-foreground">
              ✨ Good luck, {formData.name}! The draw will be announced soon.
            </p>
          </div>
          
          <Button 
            onClick={() => {
              setShowCoupon(false);
              setFormData({ name: '', mobile: '' });
            }}
            className="btn-festival w-full"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Buy Another Coupon
          </Button>
        </div>
      </Card>
    );
  }

  if (isGenerating) {
    return (
      <Card className="gradient-border bg-card/50 backdrop-blur-sm">
        <div className="p-8 text-center space-y-6">
          <div className="animate-float">
            <Gift className="w-16 h-16 mx-auto text-gold animate-spin" />
          </div>
          <h2 className="text-xl font-bold gradient-text">Generating Your Lucky Coupon...</h2>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">✅ Payment Confirmed</div>
            <div className="text-sm text-muted-foreground">🎲 Creating Unique Code...</div>
            <div className="text-sm text-muted-foreground">📱 Preparing SMS...</div>
          </div>
          <div className="animate-pulse">
            <Star className="w-8 h-8 mx-auto text-gold" />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="gradient-border bg-card/50 backdrop-blur-sm">
      <div className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold gradient-text mb-2">
            🎯 Test Your Luck, Test Your Kismat!
          </h2>
          <p className="text-muted-foreground">
            Enter your details and pay ₹100 to get your lucky draw coupon
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              required
            />
          </div>
          
          <div className="bg-gradient-winner rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary-foreground mb-1">₹100</div>
            <div className="text-sm text-primary-foreground opacity-90">One-time entry fee</div>
          </div>
          
          <Button type="submit" className="btn-festival w-full text-lg py-6">
            <Zap className="w-5 h-5 mr-2" />
            Pay ₹100 & Get Lucky Coupon
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            🔒 Secure payment • Instant coupon generation • SMS confirmation
          </p>
        </form>
      </div>
    </Card>
  );
};

export default CouponGenerator;