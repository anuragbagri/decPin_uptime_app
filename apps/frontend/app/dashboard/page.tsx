"use client";
import React, { useState } from 'react';
import { ChevronDown, Globe, ExternalLink, Clock, Activity, AlertCircle } from 'lucide-react';
import { useWebsites } from '@/hooks/useWebsites';


function App() {
  const { websites } = useWebsites();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddingWebsite, setIsAddingWebsite] = useState(false);
  const [newWebsiteUrl, setNewWebsiteUrl] = useState("");


  const totalSites = websites.length;

  const handleAddWebsite = async (url: string) => {
    setIsAddingWebsite(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // AddWebsite logic goes here, e.g. await addWebsite(url, getToken);
      console.log('Adding website:', url);
      setNewWebsiteUrl(""); // reset input
      setIsAddModalOpen(false);
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
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Better Uptime</h1>
                <p className="text-xs text-gray-500">Real-time monitoring</p>
              </div>
            </div>
            {/* Removed operational percentage UI */}
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

        {isAddModalOpen && (
          <div className="bg-white border rounded-lg p-6 shadow-lg max-w-md mx-auto mb-8">
            <div>
              <label htmlFor="websiteUrl" className="block text-sm font-medium text-black mb-2">
                Website URL
              </label>
              <input
                id="websiteUrl"
                type="url"
                value={newWebsiteUrl}
                onChange={e => setNewWebsiteUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3 py-2 border-b-black rounded-lg  mb-4 text-black"
                disabled={isAddingWebsite}
              />
              <button
                onClick={() => handleAddWebsite(newWebsiteUrl)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                disabled={isAddingWebsite || !newWebsiteUrl}
              >
                {isAddingWebsite ? 'Adding...' : 'Add'}
              </button>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="ml-3 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                disabled={isAddingWebsite}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

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
