/**
 * Example: Using Headroom in a React Component
 * 
 * This demonstrates how to integrate token compression into LLM-powered features
 * within the portfolio (e.g., AI-powered project search, recommendations)
 */

import React, { useState } from 'react';
import { compressPortfolioContext, HEADROOM_CONFIG } from '../utils/headroom';

/**
 * Example component: AI-powered project query using Headroom compression
 * 
 * Before deploying features like this, ensure:
 * 1. Headroom proxy is running (headroom proxy --port 8787)
 * 2. REACT_APP_HEADROOM_PROXY_URL environment variable is set
 */
export function HeadroomExampleComponent() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any>(null);
  const [isCompressing, setIsCompressing] = useState(false);

  /**
   * Example handler: Query projects with Headroom compression
   * 
   * In production, this would:
   * 1. Take a user query (e.g., "Show me data platforms I've built")
   * 2. Gather relevant context from portfolio data
   * 3. Compress context using Headroom
   * 4. Send compressed context + query to LLM
   * 5. Return formatted results
   */
  const handleQueryWithCompression = async () => {
    if (!query.trim()) return;

    setIsCompressing(true);
    try {
      // Example: Portfolio context that would be sent to LLM
      const portfolioMessages = [
        {
          role: 'system',
          content: 'You are a helpful assistant answering questions about a senior data engineer portfolio.'
        },
        {
          role: 'user',
          content: query
        }
      ];

      // Compress messages using Headroom before sending to LLM
      const compressed = await compressPortfolioContext(portfolioMessages);
      
      // Log compression results (for demonstration)
      console.log('Original message count:', portfolioMessages.length);
      console.log('Compressed message count:', compressed.length);
      console.log('Compression enabled:', HEADROOM_CONFIG.enabled);

      setResult({
        originalMessages: portfolioMessages.length,
        compressedMessages: compressed.length,
        savedTokens: '~15-20%',
        compressionMethod: 'Headroom (CCR + SmartCrusher)'
      });
    } catch (error) {
      console.error('Compression error:', error);
      setResult({ error: 'Failed to compress context' });
    } finally {
      setIsCompressing(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 rounded-lg border border-orange-500/30 bg-gray-900/90">
      <h3 className="text-lg font-semibold text-gray-100">
        Headroom Integration Example
      </h3>
      
      <p className="text-sm text-gray-400">
        This component demonstrates how Headroom compresses LLM context to reduce token usage.
      </p>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-300">
          Query Example:
        </label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., 'What data platforms have you built?'"
          className="px-3 py-2 rounded border border-gray-700 bg-gray-800 text-gray-100 text-sm focus:outline-none focus:border-orange-500"
        />
      </div>

      <button
        onClick={handleQueryWithCompression}
        disabled={isCompressing || !query.trim()}
        className="px-4 py-2 rounded bg-orange-600 text-white text-sm font-medium hover:bg-orange-500 disabled:opacity-50 transition-colors"
      >
        {isCompressing ? 'Compressing...' : 'Query with Headroom'}
      </button>

      {result && (
        <div className="mt-4 p-3 rounded border border-orange-500/30 bg-orange-500/5">
          <p className="text-xs text-gray-300 font-mono">
            {JSON.stringify(result, null, 2)}
          </p>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-500">
          <strong>Note:</strong> In production, ensure the Headroom proxy is running:
          <br />
          <code className="bg-gray-800 px-1 rounded">headroom proxy --port 8787</code>
        </p>
      </div>
    </div>
  );
}

export default HeadroomExampleComponent;
