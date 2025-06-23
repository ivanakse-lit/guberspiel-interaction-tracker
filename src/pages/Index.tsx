
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, HandHeart, Users, Plus, Smile, Trophy, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-orange-400 to-rose-400 p-2 rounded-full">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
              Balance Your Social Interactions
            </h1>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="bg-white/80 backdrop-blur-sm border-orange-200 hover:bg-orange-50 text-orange-700"
          >
            Dashboard
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-rose-400 rounded-full mb-6 shadow-lg">
              <HandHeart className="h-10 w-10 text-white" />
            </div>
          </div>
          
          <h2 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Cultivate
            <span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent"> Gratitude</span>
            <br />
            in Your Relationships
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            Track moments of kindness, support, and love within your social circles. 
            Foster deeper connections through awareness and appreciation of the care you share.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => navigate('/create-group')}
            >
              <Plus className="h-5 w-5 mr-2" />
              Start Your Journey
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white/80 backdrop-blur-sm border-orange-200 hover:bg-orange-50 text-orange-700 px-8 py-4 rounded-full"
              onClick={() => navigate('/join-group')}
            >
              <Users className="h-5 w-5 mr-2" />
              Join a Circle
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            Nurture Meaningful Connections
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every act of kindness deserves recognition. Build stronger relationships through mindful tracking of care and support.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-8 text-center">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Caring Communities</h3>
              <p className="text-gray-600">
                Create intimate circles with friends, family, or colleagues to celebrate mutual support and kindness.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-8 text-center">
              <div className="bg-gradient-to-br from-emerald-100 to-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Gift className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Moments of Grace</h3>
              <p className="text-gray-600">
                Capture acts of love, from emotional support to helping hands - every gesture of care matters.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-8 text-center">
              <div className="bg-gradient-to-br from-rose-100 to-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Balanced Hearts</h3>
              <p className="text-gray-600">
                Visualize the beautiful flow of support in your relationships and grow together in gratitude.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-orange-100/50 to-rose-100/50 rounded-3xl p-12 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-12">Your Journey of Gratitude</h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-orange-500 to-rose-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto text-xl font-bold shadow-lg">
                  <Smile className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800">Connect</h4>
                <p className="text-gray-600">
                  Form a circle of care with your loved ones and begin your shared journey of mindfulness.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-orange-500 to-rose-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto text-xl font-bold shadow-lg">
                  <HandHeart className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800">Appreciate</h4>
                <p className="text-gray-600">
                  Acknowledge every moment of care - when you give support and when you receive love.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-orange-500 to-rose-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto text-xl font-bold shadow-lg">
                  <Trophy className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800">Flourish</h4>
                <p className="text-gray-600">
                  Watch your relationships bloom as awareness brings deeper connection and mutual appreciation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Heart className="h-5 w-5 text-rose-400" />
          <p className="text-gray-600">Building deeper connections through gratitude</p>
          <Heart className="h-5 w-5 text-rose-400" />
        </div>
        <p className="text-gray-500 text-sm">&copy; 2024 Güberspiel. Spreading love, one interaction at a time.</p>
      </footer>
    </div>
  );
};

export default Index;
