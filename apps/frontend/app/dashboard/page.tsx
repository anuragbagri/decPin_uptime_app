"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Globe, ExternalLink, Clock, Activity, AlertCircle } from 'lucide-react';
import { useWebsites } from '@/hooks/useWebsites';


interface AggregatedTick {
  timestamp: Date;
  status: 'up' | 'down';
  averageLatency: number;
}

function aggregateTicksIntoWindows(ticks: any[], windowSizeMinutes: number = 3): AggregatedTick[] {
  if (!ticks || ticks.length === 0) return [];

  // Sort ticks by creation time
  const sortedTicks = [...ticks].sort((a, b) => 
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const windows: AggregatedTick[] = [];
  const windowSizeMs = windowSizeMinutes * 60 * 1000;
  
  // Get the earliest and latest timestamps
  const earliestTime = new Date(sortedTicks[0].createdAt).getTime();
  const latestTime = new Date(sortedTicks[sortedTicks.length - 1].createdAt).getTime();
  
  // Create windows from earliest to latest
  for (let windowStart = earliestTime; windowStart <= latestTime; windowStart += windowSizeMs) {
    const windowEnd = windowStart + windowSizeMs;
    
    // Find all ticks in this window
    const ticksInWindow = sortedTicks.filter(tick => {
      const tickTime = new Date(tick.createdAt).getTime();
      return tickTime >= windowStart && tickTime < windowEnd;
    });
    
    if (ticksInWindow.length > 0) {
      // Calculate aggregated status (up if majority are up)
      const upTicks = ticksInWindow.filter(tick => tick.status === 'up' || tick.status === 'operational');
      const isUp = upTicks.length >= ticksInWindow.length / 2;
      
      // Calculate average latency
      const totalLatency = ticksInWindow.reduce((sum, tick) => sum + (tick.latency || 0), 0);
      const averageLatency = totalLatency / ticksInWindow.length;
      
      windows.push({
        timestamp: new Date(windowStart),
        status: isUp ? 'up' : 'down',
        averageLatency
      });
    }
  }
  
  // Return last 10 windows
  return windows.slice(-10);
}

function StatusCircle({ status, className = "" }: { status: string; className?: string }) {
  const isUp = status === 'up' || status === 'operational';
  
  return (
    <div className={`relative ${className}`}>
      <div className={`w-4 h-4 rounded-full ${isUp ? 'bg-green-500' : 'bg-red-500'} shadow-lg`} />
      <div 
        className={`absolute w-4 h-4 rounded-full ${isUp ? 'bg-green-500' : 'bg-red-500'} animate-ping opacity-75`} 
      />
    </div>
  );
}

function UptimeGraph({ aggregatedTicks }: { aggregatedTicks: AggregatedTick[] }) {
  // Fill with empty slots if we have fewer than 10 windows
  const displayTicks = [...aggregatedTicks];
  while (displayTicks.length < 10) {
    displayTicks.unshift({
      timestamp: new Date(Date.now() - (10 - displayTicks.length) * 3 * 60 * 1000),
      status: 'up',
      averageLatency: 0
    });
  }

  return (
    <div className="flex items-center gap-1">
      {displayTicks.slice(-10).map((tick, index) => {
        const isEmpty = tick.averageLatency === 0;
        
        return (
          <div
            key={index}
            className="group relative"
          >
            <div 
              className={`w-8 h-4 rounded transition-all duration-200 ${
                isEmpty 
                  ? 'bg-gray-200' 
                  : tick.status === 'up' 
                    ? 'bg-green-500 hover:bg-green-600 shadow-sm' 
                    : 'bg-red-500 hover:bg-red-600 shadow-sm'
              }`}
            />
            {!isEmpty && (
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <div className="bg-gray-800 text-white text-xs rounded py-2 px-3 whitespace-nowrap shadow-lg">
                  <div className="font-medium">{tick.status === 'up' ? 'Operational' : 'Down'}</div>
                  <div>{tick.averageLatency.toFixed(0)}ms avg</div>
                  <div>{tick.timestamp.toLocaleTimeString()}</div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function WebsiteCard({ website }: { website: any }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Get the latest tick to determine current status
  const latestTick = website.ticks && website.ticks.length > 0 
    ? website.ticks.sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0]
    : null;
  
  const currentStatus = latestTick?.status || 'unknown';
  const isUp = currentStatus === 'up' || currentStatus === 'operational';
  
  // Calculate uptime percentage
  const upTicks = website.ticks?.filter((tick: any) => 
    tick.status === 'up' || tick.status === 'operational'
  ).length || 0;
  const totalTicks = website.ticks?.length || 0;
  const uptimePercentage = totalTicks > 0 ? (upTicks / totalTicks * 100).toFixed(1) : '0.0';
  
  // Aggregate ticks into 3-minute windows
  const aggregatedTicks = aggregateTicksIntoWindows(website.ticks, 3);
  
  // Calculate average response time
  const avgResponseTime = website.ticks && website.ticks.length > 0
    ? (website.ticks.reduce((sum: number, tick: any) => sum + (tick.latency || 0), 0) / website.ticks.length).toFixed(0)
    : '0';
  
  // Get last incident time
  const downTicks = website.ticks?.filter((tick: any) => 
    tick.status === 'down' || tick.status === 'error'
  ).sort((a: any, b: any) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ) || [];
  const lastIncident = downTicks.length > 0 
    ? new Date(downTicks[0].createdAt).toLocaleString()
    : 'Never';

  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 border border-gray-200 ${
      isExpanded ? 'ring-2 ring-blue-500 ring-opacity-50 shadow-xl' : 'hover:shadow-lg hover:border-gray-300'
    }`}>
      <div
        className="p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <StatusCircle status={currentStatus} />
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-gray-900 text-lg">{website.url}</h3>
                <a 
                  href={website.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-gray-400 hover:text-blue-600 transition-colors duration-200 p-1 rounded hover:bg-blue-50"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <div className="flex items-center gap-4 mt-1">
                <p className="text-sm text-gray-500">{website.url}</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isUp ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {isUp ? 'Operational' : 'Down'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">
                {uptimePercentage}%
              </div>
              <div className="text-xs text-gray-500">
                {totalTicks} total checks
              </div>
            </div>
            <div className={`transform transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-gray-100 bg-gray-50">
          <div className="grid grid-cols-3 gap-6 py-6">
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">{avgResponseTime}ms</div>
                <div className="text-sm text-gray-500">Avg Response</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">{uptimePercentage}%</div>
                <div className="text-sm text-gray-500">Availability</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{lastIncident}</div>
                <div className="text-sm text-gray-500">Last Incident</div>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
            <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Status Timeline (3-minute intervals)
            </h4>
            <UptimeGraph aggregatedTicks={aggregatedTicks} />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>30 mins ago</span>
              <span>Now</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const { websites } = useWebsites();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddingWebsite, setIsAddingWebsite] = useState(false);
  
  
  const totalSites = websites.length;
  const operationalSites = websites.filter(website => {
    const latestTick = website.ticks && website.ticks.length > 0 
      ? website.ticks.sort((a: any, b: any) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0]
      : null;
    return latestTick?.status === 'up' || latestTick?.status === 'operational';
  }).length;

  const handleAddWebsite = async (url: string) => {
    setIsAddingWebsite(true);
    try {
      // This would typically call your API to add the website
      // For now, we'll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, you would:
      // await addWebsite(url, getToken);
      // Then refresh the websites list
      
      console.log('Adding website:', url);
      // The useWebsites hook should automatically refresh and show the new website
    } catch (error) {
      console.error('Failed to add website:', error);
      throw error;
    } finally {
      setIsAddingWebsite(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Globe className="w-8 h-8 text-blue-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Better Uptime</h1>
                <p className="text-xs text-gray-500">Real-time monitoring</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">
                  {operationalSites} of {totalSites} operational
                </div>
                <div className="text-xs text-gray-500">
                  {totalSites > 0 ? ((operationalSites / totalSites) * 100).toFixed(1) : '0'}% systems up
                </div>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                operationalSites === totalSites ? 'bg-green-500' : 'bg-red-500'
              }`} />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Monitored Websites</h2>
            <p className="text-gray-600 mt-2">Track the status of your web services in real-time</p>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="group px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <span className="font-medium">Add Website</span>
            <div className="w-6 h-6 rounded-full bg-blue-500 group-hover:bg-blue-400 flex items-center justify-center text-sm font-bold transition-colors">
              +
            </div>
          </button>
        </div>

        {websites.length === 0 ? (
          <div className="text-center py-12">
            <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No websites monitored yet</h3>
            <p className="text-gray-500">Add your first website to start monitoring its uptime</p>
          </div>
        ) : (
          <div className="space-y-4">
            {websites.map(website => (
              <WebsiteCard key={website.id} website={website} />
            ))}
          </div>
        )}
      </main>

    </div>
  );
}

export default App;