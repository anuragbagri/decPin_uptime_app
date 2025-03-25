"use client";


import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Globe, ExternalLink, Clock, Activity, AlertCircle } from 'lucide-react';
import { useWebsites } from '@/hooks/useWebsites';

const websites = [
  {
    id: 1,
    name: "Main Website",
    url: "https://example.com",
    status: "up",
    uptime: 99.9,
    responseTime: "234ms",
    lastIncident: "3 days ago",
    lastChecks: [true, true, true, false, true, true, true, true, true, true]
  },
  {
    id: 2,
    name: "API Service",
    url: "https://api.example.com",
    status: "down",
    uptime: 95.5,
    responseTime: "567ms",
    lastIncident: "2 minutes ago",
    lastChecks: [false, false, true, true, true, false, false, true, true, true]
  },
  {
    id: 3,
    name: "Documentation",
    url: "https://docs.example.com",
    status: "up",
    uptime: 100,
    responseTime: "189ms",
    lastIncident: "Never",
    lastChecks: [true, true, true, true, true, true, true, true, true, true]
  }
];

function StatusCircle({ status, className = "" }: { status: string; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className={`w-3 h-3 rounded-full ${status === 'up' ? 'bg-green-500' : 'bg-red-500'}`} />
      <div 
        className={`absolute w-3 h-3 rounded-full ${status === 'up' ? 'bg-green-500' : 'bg-red-500'} animate-ping opacity-75`} 
      />
    </div>
  );
}

function UptimeGraph({ checks }: { checks: boolean[] }) {
  return (
    <div className="flex items-center gap-1">
      {checks.map((check, index) => (
        <div
          key={index}
          className={`group relative`}
        >
          <div 
            className={`w-8 h-3 rounded transition-all duration-200 ${
              check ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
            }`}
          />
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
              {check ? 'Operational' : 'Down'} • {30 - (index * 3)} mins ago
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function WebsiteCard({ website }: { website: typeof websites[0] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
      isExpanded ? 'ring-2 ring-blue-500 ring-opacity-50' : 'hover:shadow-lg'
    }`}>
      <div
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <StatusCircle status={website.status} className="mt-1" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">{website.name}</h3>
                <a 
                  href={website.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <p className="text-sm text-gray-500">{website.url}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">
                {website.uptime}% uptime
              </div>
              <div className="text-xs text-gray-500">
                Last 30 days
              </div>
            </div>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-gray-100">
          <div className="grid grid-cols-3 gap-6 py-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <div>
                <div className="text-sm font-medium text-gray-900">{website.responseTime}</div>
                <div className="text-xs text-gray-500">Response Time</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-gray-400" />
              <div>
                <div className="text-sm font-medium text-gray-900">{website.uptime}%</div>
                <div className="text-xs text-gray-500">Availability</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-gray-400" />
              <div>
                <div className="text-sm font-medium text-gray-900">{website.lastIncident}</div>
                <div className="text-xs text-gray-500">Last Incident</div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Last 30 minutes status</h4>
            <UptimeGraph checks={website.lastChecks} />
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const totalSites = websites.length;
  const operationalSites = websites.filter(w => w.status === 'up').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">Better Uptime</h1>
            </div>
            <div className="text-sm text-gray-600">
              {operationalSites} of {totalSites} systems operational
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Monitored Websites</h2>
            <p className="text-gray-500 mt-1">Track the status of your web services in real-time</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            Add Website
            <span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-sm">
              +
            </span>
          </button>
        </div>

        <div className="space-y-4">
          {websites.map(website => (
            <WebsiteCard key={website.id} website={website} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;