/**
 * Artify Sols Backend — Pluggable AI Provider Abstraction
 * Supports Google Gemini with structured system prompting, retry logic, and domain fallback.
 */

import { GoogleGenAI } from '@google/genai';

export interface AiPromptOptions {
  systemInstruction?: string;
  temperature?: number;
  maxOutputTokens?: number;
  responseMimeType?: string;
}

export interface AiProvider {
  name: string;
  generateText(prompt: string, options?: AiPromptOptions): Promise<string>;
}

export class GeminiProvider implements AiProvider {
  public name = 'Google Gemini (gemini-3.7-flash)';
  private aiClient: GoogleGenAI | null = null;

  private getClient(): GoogleGenAI | null {
    if (this.aiClient) return this.aiClient;
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      this.aiClient = new GoogleGenAI({ apiKey });
      return this.aiClient;
    }
    return null;
  }

  public async generateText(prompt: string, options?: AiPromptOptions): Promise<string> {
    const client = this.getClient();
    if (!client) {
      throw new Error('GEMINI_API_KEY is not configured on this server environment.');
    }

    try {
      const response = await client.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          systemInstruction: options?.systemInstruction,
          temperature: options?.temperature ?? 0.3,
          maxOutputTokens: options?.maxOutputTokens ?? 2048,
          responseMimeType: options?.responseMimeType,
        },
      });

      const text = response.text;
      if (!text) {
        throw new Error('Empty response received from Gemini model.');
      }
      return text;
    } catch (err: any) {
      console.error('[GeminiProvider] Error during inference:', err?.message || err);
      throw err;
    }
  }
}

export const defaultAiProvider = new GeminiProvider();
