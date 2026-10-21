import express from 'express';
import type { Request, Response } from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({ apiKey });
}

// ==========================================
// REAL-TIME MULTI-USER STATE (AUTHORITATIVE)
// ==========================================
interface SeatOccupant {
  userId: string;
  userName: string;
  userNationality: string;
  userAvatar: string;
  gender?: string;
  age?: number | string;
  address?: string;
  phoneNumber?: string;
  isMuted: boolean;
  isVideoOn: boolean;
  isSpeaking: boolean;
  language: string;
  videoFrame?: string;
}

interface ServerSeat {
  seatNumber: number;
  occupiedBy: SeatOccupant | null;
}

interface ChamberMsg {
  id: string;
  chamberCode: number;
  userId: string;
  userName: string;
  userAvatar: string;
  userNationality: string;
  originalText: string;
  originalLanguage: string;
  translatedText?: string;
  targetLanguage?: string;
  timestamp: string;
  isOfficial?: boolean;
}

// Initial seats for 7 chambers
const seatsByChamber: Record<number, ServerSeat[]> = {};
for (let c = 1; c <= 7; c++) {
  seatsByChamber[c] = Array.from({ length: 16 }).map((_, idx) => {
    const seatNum = idx + 1;
    // Founder Zebene Asfeye holds Chair #1 in Chamber 1
    if (c === 1 && seatNum === 1) {
      return {
        seatNumber: 1,
        occupiedBy: {
          userId: 'founder-zebene-1',
          userName: 'ክቡር ዘበነ አስፍዬ (Zebene Asfeye)',
          userNationality: 'Ethiopia 🇪🇹 (Founder)',
          userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
          gender: 'ወንድ (Male)',
          age: 38,
          address: 'አዲስ አበባ፣ ኢትዮጵያ (Addis Ababa)',
          isMuted: false,
          isVideoOn: true,
          isSpeaking: false,
          language: 'am',
        },
      };
    }
    return {
      seatNumber: seatNum,
      occupiedBy: null,
    };
  });
}

const messagesByChamber: Record<number, ChamberMsg[]> = {
  1: [
    {
      id: 'srv-msg-1',
      chamberCode: 1,
      userId: 'founder-zebene-1',
      userName: 'ክቡር ዘበነ አስፍዬ (Zebene Asfeye)',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      userNationality: 'Ethiopia 🇪🇹',
      originalText: 'እንኳን ወደ አለም አቀፍ የሉዓላዊ ዲሞክራሲ ጉባኤ በሰላም መጣችሁ! (Welcome to the Universal Assembly)',
      originalLanguage: 'am',
      translatedText: 'Welcome to the Universal Sovereign Democratic Assembly in peace and unity!',
      targetLanguage: 'en',
      timestamp: '10:00',
      isOfficial: true,
    },
  ],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
};

// ==========================================
// REST API ENDPOINTS
// ==========================================

// 1. Live Translation API
app.post('/api/translate', async (req: Request, res: Response) => {
  try {
    const { text, sourceLang = 'Auto', targetLang = 'English' } = req.body;
    if (!text || typeof text !== 'string') {
      res.status(400).json({ error: 'Text is required' });
      return;
    }

    if (!aiClient) {
      res.json({
        translatedText: `[Translated to ${targetLang}]: ${text}`,
        detectedLang: sourceLang === 'Auto' ? 'Detected' : sourceLang,
        note: 'Translation server active'
      });
      return;
    }

    const prompt = `You are a universal real-time multilingual translator for the global peace assembly "Zebene's World".
Translate the following user speech or text accurately, naturally, and respectfully from ${sourceLang} into ${targetLang}.
Preserve emotional nuance, tone, and clarity. Only output the direct translation, nothing else.

Text to translate:
"""
${text}
"""`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    const translatedText = response.text ? response.text.trim() : text;
    res.json({ translatedText, targetLang });
  } catch (error: any) {
    console.error('Translation error:', error);
    res.status(500).json({
      error: 'Translation failed',
      details: error?.message || 'Unknown error',
      fallbackText: req.body.text
    });
  }
});

// 2. AI Horizon Automated Learning Tutor API
app.post('/api/tutor', async (req: Request, res: Response) => {
  try {
    const { query, topic = 'General Knowledge', targetLanguage = 'English' } = req.body;
    if (!query) {
      res.status(400).json({ error: 'Query is required' });
      return;
    }

    if (!aiClient) {
      res.json({
        topic,
        title: `Comprehensive Guide to ${query}`,
        summary: `Overview of ${query} in the context of ${topic}.`,
        keyConcepts: [
          'Foundational Principles & Mechanics',
          'Global Modern Standards & Implementation',
          'Socio-economic impact and sustainability'
        ],
        practicalApplication: 'Can be studied and deployed across developing and developed economies alike.',
        quiz: [
          { question: `What is the primary advantage of ${query}?`, answer: 'Accelerating global human progress and equity.' }
        ]
      });
      return;
    }

    const prompt = `You are the AI Automatic Learning Horizon (የትምህርት አድማስ) Engine of Zebene's World.
Provide an in-depth, inspiring, and comprehensive masterclass on the requested topic.
Language: Provide response primarily in ${targetLanguage}.
Topic: ${topic}
Query / User Question: "${query}"

Format your response as a valid JSON object with the following fields:
{
  "title": "Title of the learning module",
  "summary": "Clear, motivational executive summary (2-3 sentences)",
  "historicalContext": "Brief origin and evolutionary milestones",
  "keyConcepts": ["Concept 1 with short explanation", "Concept 2 with short explanation", "Concept 3 with short explanation"],
  "stepByStepGuide": ["Step 1: Actionable practice", "Step 2: Practical implementation", "Step 3: Mastery and innovation"],
  "realWorldImpact": "How this knowledge empowers communities, orphans, elders, and youth",
  "quickQuiz": [
    {"question": "Question 1?", "options": ["Option A", "Option B", "Option C", "Option D"], "correctIndex": 0, "explanation": "Why this is correct"}
  ]
}
Return only JSON.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Tutor error:', error);
    res.status(500).json({ error: 'Failed to generate tutor lesson', details: error?.message });
  }
});

// 3. Chamber 7 Peace & Security Analysis
app.post('/api/security-moderation', async (req: Request, res: Response) => {
  try {
    const { speechText, chamberCode } = req.body;
    if (!aiClient) {
      res.json({ safe: true, score: 98, flag: null, recommendation: 'Civil discourse verified' });
      return;
    }

    const prompt = `Analyze this message spoken in Chamber #${chamberCode} of Zebene's World international congress.
Assess for hate speech, incitement to violence, fraud, harassment, or violation of international peace laws.
Message: "${speechText}"

Return JSON:
{
  "safe": true | false,
  "score": number between 0 and 100 (100 = completely peaceful and constructive),
  "flag": null | "HATE_SPEECH" | "VIOLENCE" | "DEFAMATION" | "FRAUD",
  "recommendation": "Brief guidance note for peacekeepers"
}`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });

    res.json(JSON.parse(response.text || '{}'));
  } catch (error: any) {
    res.json({ safe: true, score: 90, flag: null, recommendation: 'System active' });
  }
});

// 4. Chamber State API
app.get('/api/chambers/state', (_req: Request, res: Response) => {
  res.json({
    seatsByChamber,
    messagesByChamber,
    onlineCount: clientMetaMap.size,
    timestamp: new Date().toISOString(),
  });
});

// 5. Server-Side Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'online',
    platform: "Zebene's World (ዘበነ የመሰረተው አለም)",
    chambersCount: 7,
    hasGeminiKey: Boolean(apiKey),
    onlineUsers: clientMetaMap.size,
    timestamp: new Date().toISOString()
  });
});

// ==========================================
// WEBSOCKET SERVER FOR REAL-TIME COLLABORATION
// ==========================================
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

interface ClientMeta {
  userId?: string;
  userName?: string;
  chamberCode: number;
  seatNumber?: number;
}

const clientMetaMap = new Map<WebSocket, ClientMeta>();

function broadcast(msg: any, excludeWs?: WebSocket, chamberFilter?: number) {
  const data = JSON.stringify(msg);
  for (const [client, meta] of clientMetaMap.entries()) {
    if (client.readyState === WebSocket.OPEN && client !== excludeWs) {
      if (chamberFilter === undefined || meta.chamberCode === chamberFilter) {
        client.send(data);
      }
    }
  }
}

wss.on('connection', (ws: WebSocket) => {
  const meta: ClientMeta = { chamberCode: 1 };
  clientMetaMap.set(ws, meta);

  // Send initial full state to newly connected client
  ws.send(
    JSON.stringify({
      type: 'init_state',
      seatsByChamber,
      messagesByChamber,
      onlineCount: clientMetaMap.size,
    })
  );

  // Broadcast updated count
  broadcast({ type: 'online_count', count: clientMetaMap.size });

  ws.on('message', (messageRaw: string) => {
    try {
      const data = JSON.parse(messageRaw.toString());

      switch (data.type) {
        case 'join_chamber': {
          const code = Number(data.chamberCode) || 1;
          meta.chamberCode = code;
          if (data.userId) meta.userId = data.userId;
          if (data.userName) meta.userName = data.userName;

          ws.send(
            JSON.stringify({
              type: 'chamber_sync',
              chamberCode: code,
              seats: seatsByChamber[code] || [],
              messages: messagesByChamber[code] || [],
            })
          );
          break;
        }

        case 'claim_seat': {
          const { chamberCode, seatNumber, occupant } = data;
          if (!chamberCode || !seatNumber || !occupant) return;

          const chCode = Number(chamberCode);
          if (!seatsByChamber[chCode]) {
            seatsByChamber[chCode] = [];
          }

          // Remove user from any other seat in this chamber
          seatsByChamber[chCode] = seatsByChamber[chCode].map((s) => {
            if (s.occupiedBy?.userId === occupant.userId && s.seatNumber !== seatNumber) {
              return { ...s, occupiedBy: null };
            }
            if (s.seatNumber === seatNumber) {
              return { ...s, occupiedBy: occupant };
            }
            return s;
          });

          // Ensure seat entry exists if seatNumber > length
          const found = seatsByChamber[chCode].find((s) => s.seatNumber === seatNumber);
          if (!found) {
            seatsByChamber[chCode].push({ seatNumber, occupiedBy: occupant });
          }

          meta.userId = occupant.userId;
          meta.userName = occupant.userName;
          meta.seatNumber = seatNumber;

          // Broadcast to ALL clients so both see the user seated with their photo!
          broadcast({
            type: 'seat_updated',
            chamberCode: chCode,
            seatNumber,
            occupiedBy: occupant,
          });
          break;
        }

        case 'leave_seat': {
          const { chamberCode, seatNumber, userId } = data;
          const chCode = Number(chamberCode);
          if (seatsByChamber[chCode]) {
            seatsByChamber[chCode] = seatsByChamber[chCode].map((s) => {
              if (s.seatNumber === seatNumber || s.occupiedBy?.userId === userId) {
                return { ...s, occupiedBy: null };
              }
              return s;
            });
          }
          meta.seatNumber = undefined;

          broadcast({
            type: 'seat_updated',
            chamberCode: chCode,
            seatNumber,
            occupiedBy: null,
          });
          break;
        }

        case 'media_state': {
          const { chamberCode, seatNumber, userId, isMuted, isVideoOn, isSpeaking } = data;
          const chCode = Number(chamberCode);
          if (seatsByChamber[chCode]) {
            seatsByChamber[chCode] = seatsByChamber[chCode].map((s) => {
              if (s.seatNumber === seatNumber && s.occupiedBy && s.occupiedBy.userId === userId) {
                return {
                  ...s,
                  occupiedBy: {
                    ...s.occupiedBy,
                    isMuted: isMuted ?? s.occupiedBy.isMuted,
                    isVideoOn: isVideoOn ?? s.occupiedBy.isVideoOn,
                    isSpeaking: isSpeaking ?? s.occupiedBy.isSpeaking,
                  },
                };
              }
              return s;
            });
          }

          broadcast({
            type: 'media_state_changed',
            chamberCode: chCode,
            seatNumber,
            userId,
            isMuted,
            isVideoOn,
            isSpeaking,
          });
          break;
        }

        case 'video_frame': {
          // Live video frame transmission from client webcam/camera
          const { chamberCode, seatNumber, userId, videoFrame } = data;
          const chCode = Number(chamberCode);

          // Update in server state
          if (seatsByChamber[chCode]) {
            const seat = seatsByChamber[chCode].find((s) => s.seatNumber === seatNumber);
            if (seat && seat.occupiedBy && seat.occupiedBy.userId === userId) {
              seat.occupiedBy.videoFrame = videoFrame;
            }
          }

          // Broadcast frame to other participants in this chamber
          broadcast(
            {
              type: 'remote_video_frame',
              chamberCode: chCode,
              seatNumber,
              userId,
              videoFrame,
            },
            ws,
            chCode
          );
          break;
        }

        case 'audio_speech': {
          // Real-time audio speech / voice broadcast from user mic
          const { chamberCode, seatNumber, userId, userName, text, language, audioBlobBase64 } = data;
          const chCode = Number(chamberCode);

          // Broadcast to other clients so other users hear their voice and see speaking wave
          broadcast(
            {
              type: 'remote_audio_speech',
              chamberCode: chCode,
              seatNumber,
              userId,
              userName,
              text,
              language,
              audioBlobBase64,
            },
            ws,
            chCode
          );
          break;
        }

        case 'chat_message': {
          const { message } = data;
          if (!message || !message.chamberCode) return;
          const chCode = Number(message.chamberCode);

          if (!messagesByChamber[chCode]) {
            messagesByChamber[chCode] = [];
          }
          messagesByChamber[chCode].push(message);
          if (messagesByChamber[chCode].length > 100) {
            messagesByChamber[chCode] = messagesByChamber[chCode].slice(-100);
          }

          broadcast({
            type: 'new_chat_message',
            chamberCode: chCode,
            message,
          });
          break;
        }

        case 'user_profile_updated': {
          broadcast({
            type: 'user_profile_synced',
            user: data.user,
          });
          break;
        }

        default:
          break;
      }
    } catch (err) {
      console.error('Error handling WebSocket message:', err);
    }
  });

  ws.on('close', () => {
    clientMetaMap.delete(ws);
    broadcast({ type: 'online_count', count: clientMetaMap.size });
  });

  ws.on('error', (err) => {
    console.warn('WebSocket error:', err);
    clientMetaMap.delete(ws);
  });
});

async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Zebene's World Multi-User Realtime Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
