"use client"

import React from 'react';
import { Activity, Shield, Clock, Bell, Server, ArrowRight, CheckCircle2 } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}

      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10 animate-pulse-slow"></div>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left relative">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text animate-float">
                Monitor Your Services with Confidence
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                Get real-time insights and instant notifications when your services go down.
                Stay ahead of issues before they impact your users.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                <button className="bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25">
                  <span>Start Monitoring</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border border-gray-700 hover:border-blue-500 px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-blue-500/10">
                  View Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
                alt="Dashboard Analytics"
                className="rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-gray-800/50" id="features">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 animate-float">Powerful Monitoring Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Shield className="w-6 h-6 text-green-400" />}
                title="99.9% Uptime"
                description="We ensure your services stay online with enterprise-grade monitoring."
              />
              <FeatureCard
                icon={<Bell className="w-6 h-6 text-yellow-400" />}
                title="Instant Alerts"
                description="Get notified immediately through multiple channels when issues arise."
              />
              <FeatureCard
                icon={<Clock className="w-6 h-6 text-purple-400" />}
                title="Response Time"
                description="Track performance metrics and optimize your application speed."
              />
              <FeatureCard
                icon={<Server className="w-6 h-6 text-blue-400" />}
                title="Global Monitoring"
                description="Monitor your services from multiple locations worldwide."
              />
              <FeatureCard
                icon={<CheckCircle2 className="w-6 h-6 text-red-400" />}
                title="Health Checks"
                description="Comprehensive health checks for your entire infrastructure."
              />
              <FeatureCard
                icon={<Activity className="w-6 h-6 text-orange-400" />}
                title="Real-time Metrics"
                description="Detailed analytics and performance insights at your fingertips."
              />
            </div>
          </div>
        </section>

        {/* Stats Section with Background Image */}
        <section className="py-20 relative">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80"
              alt="Data Center"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-900/95"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <StatCard number="99.9%" label="Average Uptime" />
              <StatCard number="<1s" label="Response Time" />
              <StatCard number="24/7" label="Support Available" />
              <StatCard number="50+" label="Integration Partners" />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-800/50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Trusted by Industry Leaders</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <TestimonialCard
                quote="UptimeGuard has transformed how we monitor our infrastructure. The real-time alerts have saved us countless hours of downtime."
                author="Sarah Chen"
                role="CTO at TechCorp"
                image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
              />
              <TestimonialCard
                quote="The best monitoring solution we've used. Simple to set up, powerful features, and excellent support team."
                author="Michael Rodriguez"
                role="DevOps Lead at CloudScale"
                image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900/50 to-purple-900/50 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1551636898-47668aa61de2?auto=format&fit=crop&w=1920&q=80"
              alt="Server Room"
              className="w-full h-full object-cover opacity-10"
            />
          </div>
          <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
            <h2 className="text-3xl font-bold mb-6 animate-float">Ready to Get Started?</h2>
            <p className="text-gray-400 mb-8">
              Join thousands of companies that trust UptimeGuard for their monitoring needs.
              Start your free 14-day trial today.
            </p>
            <button className="bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-lg flex items-center space-x-2 mx-auto transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25">
              <span>Start Your Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          <div className="flex items-center justify-center space-x-2 mb-4 hover:text-blue-400 transition-colors">
            <Activity className="w-5 h-5 text-blue-500" />
            <span className="font-bold">UptimeGuard</span>
          </div>
          <p>© 2025 UptimeGuard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-105 hover:bg-gray-800/80 group">
      <div className="mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

function StatCard({ number, label }) {
  return (
    <div className="bg-gray-800/50 p-6 rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10">
      <div className="text-4xl font-bold text-blue-400 mb-2 animate-float">{number}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
}

function TestimonialCard({ quote, author, role, image }) {
  return (
    <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-105 hover:bg-gray-800/80">
      <p className="text-lg text-gray-300 mb-6">"{quote}"</p>
      <div className="flex items-center">
        <img src={image} alt={author} className="w-12 h-12 rounded-full mr-4 object-cover" />
        <div>
          <div className="font-semibold">{author}</div>
          <div className="text-gray-400">{role}</div>
        </div>
      </div>
    </div>
  );
}

export default App;