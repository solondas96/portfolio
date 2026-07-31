/**
 * Headroom Integration for Token Compression
 * 
 * This file demonstrates how Headroom is used to compress prompts and context
 * before sending to LLMs, reducing token usage while maintaining quality.
 * 
 * Reference: https://github.com/headroomlabs-ai/headroom
 */

import { compress } from 'headroom-ai';

/**
 * Compress portfolio content context for LLM processing
 * Use case: If portfolio features AI-driven content generation or querying
 */
export async function compressPortfolioContext(messages: any[]): Promise<any[]> {
  try {
    // Compress messages to reduce token count
    const compressed = await compress(messages);
    console.log(`[Headroom] Compressed from ${messages.length} messages using Headroom`);
    return compressed;
  } catch (error) {
    console.warn('[Headroom] Compression failed, using original messages:', error);
    return messages;
  }
}

/**
 * Compress project descriptions for efficient LLM context
 * Useful for RAG systems or AI-powered project search
 */
export async function compressProjectData(projectBullets: string[]): Promise<string> {
  try {
    // Combine bullets into a single context block
    const context = projectBullets.join('\n');
    
    // Apply Headroom compression to reduce redundancy
    const compressed = await compress([
      {
        role: 'user',
        content: context
      }
    ]);
    
    return compressed[0]?.content || context;
  } catch (error) {
    console.warn('[Headroom] Project compression failed:', error);
    return projectBullets.join('\n');
  }
}

/**
 * Configuration for Headroom proxy (when using in production)
 * 
 * To enable Headroom compression in production:
 * 1. Install: pip install "headroom-ai[proxy]"
 * 2. Run: headroom proxy --port 8787
 * 3. Set HEADROOM_PROXY_URL environment variable
 * 
 * The proxy will automatically compress all LLM requests flowing through it.
 */
export const HEADROOM_CONFIG = {
  // Local proxy endpoint (when running headroom proxy locally)
  proxyUrl: process.env.REACT_APP_HEADROOM_PROXY_URL || 'http://localhost:8787',
  
  // Enable compression for all messages
  enabled: process.env.REACT_APP_HEADROOM_ENABLED !== 'false',
  
  // Compression options
  options: {
    // Preserve tool outputs and important context
    preserveTools: true,
    // Enable output token reduction (terse responses)
    enableOutputShaping: false,
  }
};

export default {
  compressPortfolioContext,
  compressProjectData,
  HEADROOM_CONFIG
};
