import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CountdownTimer from '@/components/CountdownTimer';
import LiveCounter from '@/components/LiveCounter';
import WinnerShowcase from '@/components/WinnerShowcase';
import CouponGenerator from '@/components/CouponGenerator';
import { Sparkles, Gift, Trophy, Zap, Star, Crown } from 'lucide-react';

const Index = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notifications] = useState([
    "🎉 Rahul from Betul just won ₹50,000!",
    "⚡ Only 23 coupons left for today's mega draw!",
    "🏆 Priya from Bhopal won a Land Plot worth ₹2.5L!",
    "🔥 5,847 people joined in the last hour!",
    "💎 Limited time: Extra lucky numbers added!"
  ]);
  const [currentNotification, setCurrentNotification] = useState(0);

  useEffect(() => {
    // Show floating notifications
    const interval = setInterval(() => {
      setShowNotification(true);
      setCurrentNotification(prev => (prev + 1) % notifications.length);
      setTimeout(() => setShowNotification(false), 4000);
    }, 6000);

    return () => clearInterval(interval);
  }, [notifications.length]);

  const rewards = [
    { icon: "🏆", title: "Cash Prizes", subtitle: "Up to ₹10 Lakhs" },
    { icon: "🏠", title: "Land Plots", subtitle: "Prime Locations" },
    { icon: "💎", title: "Gold Jewelry", subtitle: "24K Pure Gold" },
    { icon: "🚗", title: "Luxury Cars", subtitle: "Brand New" },
    { icon: "📱", title: "Electronics", subtitle: "Latest Gadgets" },
    { icon: "✈️", title: "Travel Packages", subtitle: "Dream Destinations" }
  ];

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Floating Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-float">
          <Card className="bg-gradient-festival p-3 border-none shadow-festival">
            <p className="text-sm font-medium text-primary-foreground">
              {notifications[currentNotification]}
            </p>
          </Card>
        </div>
      )}

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <Badge className="bg-gradient-festival text-primary-foreground mb-4 px-4 py-2 text-sm animate-bounce-subtle">
            🎯 4BETUK CITY OFFICIAL LUCKY DRAW
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4 animate-float">
            Test Your Luck, Test Your Kismat!
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-6">
            Sirf ₹100 se apki kismat badal sakti hai! 
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="outline" className="bg-card/50 backdrop-blur-sm px-4 py-2 animate-pulse-glow">
              <Gift className="w-4 h-4 mr-2" />
              Jeetiye Gifts, Land Plots, aur Zameen!
            </Badge>
            <Badge variant="outline" className="bg-card/50 backdrop-blur-sm px-4 py-2 animate-pulse-glow">
              <Crown className="w-4 h-4 mr-2" />
              Ek coupon code badal sakta hai apki zindagi!
            </Badge>
          </div>
        </div>

        {/* Live Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <LiveCounter 
            type="users" 
            currentValue={5420} 
            maxValue={10000}
            label="People Already Joined Today!"
            urgencyText="Join the excitement now!"
          />
          <LiveCounter 
            type="coupons" 
            currentValue={37} 
            maxValue={500}
            label="Lucky Coupons Left Today"
            urgencyText="Hurry! Running out fast!"
          />
          <LiveCounter 
            type="winners" 
            currentValue={1247} 
            label="Winners This Month"
            urgencyText="You could be next!"
          />
        </div>

        {/* Countdown Timer */}
        <div className="mb-12">
          <CountdownTimer title="⏰ Next Mega Draw Starts In:" targetHours={6} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Registration Form */}
          <div>
            <CouponGenerator />
          </div>

          {/* Rewards Showcase */}
          <div className="space-y-6">
            <Card className="gradient-border bg-card/50 backdrop-blur-sm">
              <div className="p-6">
                <h3 className="text-xl font-bold gradient-text mb-4 text-center">
                  🎁 Amazing Prizes Waiting For You!
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {rewards.map((reward, index) => (
                    <div 
                      key={index}
                      className="bg-gradient-winner rounded-lg p-4 text-center animate-float"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <div className="text-2xl mb-2">{reward.icon}</div>
                      <h4 className="font-semibold text-primary-foreground text-sm">{reward.title}</h4>
                      <p className="text-xs text-primary-foreground opacity-80">{reward.subtitle}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Testimonial */}
            <Card className="gradient-border bg-card/50 backdrop-blur-sm">
              <div className="p-6 text-center">
                <Star className="w-8 h-8 mx-auto text-gold mb-3 animate-float" />
                <blockquote className="text-lg font-medium gradient-text mb-3">
                  "I never believed in luck until I won ₹5 lakhs with just ₹100!"
                </blockquote>
                <p className="text-sm text-muted-foreground">- Amit Kumar, Betul (Last Week's Winner)</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Winner Showcase */}
        <WinnerShowcase />

        {/* Final CTA Section */}
        <div className="mt-12 text-center">
          <Card className="gradient-border bg-card/50 backdrop-blur-sm">
            <div className="p-8 space-y-6">
              <h2 className="text-3xl font-bold gradient-text">
                Your ₹100 Could Change Your Destiny Today!
              </h2>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="btn-festival animate-bounce-subtle">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Claim Your Coupon Now
                </Button>
                <Button className="btn-winner">
                  <Trophy className="w-5 h-5 mr-2" />
                  View All Prizes
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                🔒 100% Secure • ⚡ Instant Coupon • 📱 SMS Confirmation • 🏆 Fair Draw
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-4 right-4 md:hidden z-40">
        <Button className="btn-festival rounded-full w-16 h-16 shadow-festival animate-pulse-glow">
          <Zap className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default Index;