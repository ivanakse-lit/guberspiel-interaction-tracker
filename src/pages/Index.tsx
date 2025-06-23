
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Heart, Scale, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Scale className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Güberspiel</h1>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="bg-white/70 backdrop-blur-sm"
          >
            Dashboard
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Balance Your Social
            <span className="text-indigo-600"> Interactions</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Track emotional exchanges, support, and help within your social groups. 
            Create transparency and encourage fairness in all your relationships.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3"
              onClick={() => navigate('/create-group')}
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Group
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white/70 backdrop-blur-sm px-8 py-3"
              onClick={() => navigate('/join-group')}
            >
              <Users className="h-5 w-5 mr-2" />
              Join Group
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Social Groups</h3>
              <p className="text-gray-600">
                Create or join groups with friends, family, or colleagues to track social interactions.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Track Interactions</h3>
              <p className="text-gray-600">
                Log giving and receiving moments - from emotional support to practical help.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Scale className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Find Balance</h3>
              <p className="text-gray-600">
                Visualize the flow of support and maintain healthy, balanced relationships.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16 bg-white/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-12">How It Works</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                1
              </div>
              <h4 className="text-xl font-semibold">Create or Join</h4>
              <p className="text-gray-600">
                Start a new group or join an existing one with an invitation link.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                2
              </div>
              <h4 className="text-xl font-semibold">Log Interactions</h4>
              <p className="text-gray-600">
                Record when you give or receive support, help, or emotional care.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                3
              </div>
              <h4 className="text-xl font-semibold">See Balance</h4>
              <p className="text-gray-600">
                View your social balance and group dynamics in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600">
        <p>&copy; 2024 Güberspiel. Building better social connections.</p>
      </footer>
    </div>
  );
};

export default Index;
