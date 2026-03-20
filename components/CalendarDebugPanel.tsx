import React, { useState } from 'react';
import { APARTMENTS } from '../constants';
import { debugCalendar, testProxyFetch, verifyBookingUrls } from '../services/calendarDebug';

const CalendarDebugPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleTestBookingUrl = async (url: string, aptName: string) => {
    setIsLoading(true);
    setTestResults([]);
    
    const logs: string[] = [];
    const originalLog = console.log;
    const originalError = console.error;
    
    console.log = (...args) => {
      logs.push(args.join(' '));
      originalLog(...args);
    };
    console.error = (...args) => {
      logs.push(`❌ ${args.join(' ')}`);
      originalError(...args);
    };
    
    try {
      logs.push(`🔍 Testing: ${aptName}`);
      logs.push(`URL: ${url.substring(0, 60)}...`);
      logs.push('');
      
      const result = await debugCalendar(url);
      
      if (result && result.length > 0) {
        logs.push(`✅ Success! Found ${result.length} bookings:`);
        result.forEach((booking, idx) => {
          logs.push(`  ${idx + 1}. ${booking.start.toDateString()} → ${booking.end.toDateString()}`);
        });
      } else {
        logs.push('⚠️ No bookings returned');
      }
    } catch (error) {
      logs.push(`❌ Error: ${(error as Error).message}`);
    } finally {
      console.log = originalLog;
      console.error = originalError;
      setTestResults(logs);
      setIsLoading(false);
    }
  };

  const handleTestAllUrls = async () => {
    setIsLoading(true);
    setTestResults([]);
    
    const logs: string[] = [];
    logs.push('📋 CALENDAR VERIFICATION');
    logs.push('═'.repeat(50));
    logs.push('');
    
    verifyBookingUrls(APARTMENTS.map(a => a.icalUrl));
    
    const validUrls = APARTMENTS.filter(a => a.icalUrl && a.icalUrl.startsWith('https://ical.booking.com'));
    logs.push(`\n✅ Valid URLs: ${validUrls.length}/${APARTMENTS.length}`);
    logs.push('');
    
    setTestResults(logs);
    setIsLoading(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 transition"
        title="Debug Calendar (dev only)"
      >
        🔧 Test Calendar
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-h-96 bg-slate-900 text-white rounded-lg shadow-2xl flex flex-col border border-blue-500 overflow-hidden">
      <div className="bg-blue-600 px-4 py-3 flex justify-between items-center">
        <span className="font-bold">📅 Calendar Debug Panel</span>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-blue-700 px-2 py-1 rounded"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 text-xs font-mono bg-slate-950">
        {testResults.length === 0 ? (
          <div className="text-slate-400">Ready to test...</div>
        ) : (
          testResults.map((line, idx) => (
            <div key={idx} className={line.includes('✅') ? 'text-green-400' : line.includes('❌') ? 'text-red-400' : line.includes('🔍') ? 'text-blue-400' : 'text-slate-300'}>
              {line}
            </div>
          ))
        )}
        {isLoading && <div className="text-yellow-400 animate-pulse">Testing...</div>}
      </div>

      <div className="p-3 bg-slate-800 border-t border-slate-700 space-y-2">
        <button
          onClick={handleTestAllUrls}
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 px-3 py-2 rounded text-xs font-bold disabled:opacity-50"
        >
          🔍 Verify All URLs
        </button>
        
        <div className="max-h-32 overflow-y-auto space-y-1">
          {APARTMENTS.map((apt) => (
            <button
              key={apt.id}
              onClick={() => handleTestBookingUrl(apt.icalUrl || '', apt.name.en)}
              disabled={isLoading || !apt.icalUrl}
              className="w-full bg-blue-600 hover:bg-blue-700 px-2 py-1.5 rounded text-xs disabled:opacity-50 text-left truncate"
            >
              Test {apt.name.en}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarDebugPanel;
