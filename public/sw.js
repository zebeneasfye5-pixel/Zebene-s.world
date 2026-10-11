// Zebene's World (ዘበነ የመሰረተው አለም) - Sovereign Offline Service Worker
const CACHE_NAME = 'zebene-world-offline-v3';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/pwa-maskable-512x512.png',
  '/apple-touch-icon.png',
];

// Offline translation lookup table
const OFFLINE_TRANSLATION_MAP = {
  'ሰላም': 'Peace / Greetings (ሰላም)',
  'እንኳን ደህና መጣችሁ': 'Welcome to Zebene World (እንኳን ደህና መጣችሁ)',
  'እንማማር': 'Let us learn together (እንማማር)',
  'ፍቅርና አንድነት': 'Love and Unity (ፍቅርና አንድነት)',
  'እውቀት': 'Knowledge and Wisdom (እውቀት)',
  'ወንድማማችነት': 'Universal Brotherhood (ወንድማማችነት)',
  'ሰላማዊ ውይይት': 'Peaceful Dialogue (ሰላማዊ ውይይት)',
  'የጋራ ቤት': 'Common Assembly House (የጋራ ቤት)',
  'ስራ እና ፈጠራ': 'Work and Innovation (ስራ እና ፈጠራ)',
  'በጎ አድራጎት': 'Charity and Benevolence (በጎ አድራጎት)',
  'ባንክ እና ኢኮኖሚ': 'Banking and Civic Economy (ባንክ እና ኢኮኖሚ)',
  'ህግ እና ስርዓት': 'Rule of Law and Justice (ህግ እና ስርዓት)',
  'hello': 'ሰላም (Peace / Greetings)',
  'welcome': 'እንኳን ደህና መጣችሁ',
  'peace': 'ሰላም',
  'unity': 'አንድነት',
  'knowledge': 'እውቀት',
  'brotherhood': 'ወንድማማችነት',
  'technology': 'ቴክኖሎጂ',
  'education': 'ትምህርት',
  'love': 'ፍቅር',
  'humanity': 'የሰው ልጅ',
};

// Install Event - Pre-cache essential app shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline app shell');
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[ServiceWorker] Pre-cache warning:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate Event - Clean up outdated caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Handle network requests with offline fallbacks
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. Intercept API calls when offline
  if (url.pathname.startsWith('/api/')) {
    const requestForOffline = event.request.clone();
    event.respondWith(
      fetch(event.request)
        .catch(async () => {
          console.log('[ServiceWorker] Network unavailable, returning offline API response for:', url.pathname);

          // Offline Translation Fallback
          if (url.pathname === '/api/translate') {
            try {
              const body = await requestForOffline.json();
              const text = body.text || '';
              const targetLang = body.targetLang || 'English';
              const words = text.toLowerCase().trim();
              const translated =
                OFFLINE_TRANSLATION_MAP[words] ||
                OFFLINE_TRANSLATION_MAP[text.trim()] ||
                `[Offline Engine • ${targetLang}]: ${text}`;

              return new Response(
                JSON.stringify({
                  translatedText: translated,
                  targetLang: targetLang,
                  isOffline: true,
                  note: 'Offline Translation active (ዘበነ ኦፍላይን ሲስተም)',
                }),
                {
                  headers: { 'Content-Type': 'application/json' },
                  status: 200,
                }
              );
            } catch {
              return new Response(
                JSON.stringify({
                  translatedText: `[Offline Mode]: Message received`,
                  isOffline: true,
                }),
                { headers: { 'Content-Type': 'application/json' }, status: 200 }
              );
            }
          }

          // Offline AI Tutor Fallback
          if (url.pathname === '/api/tutor') {
            return new Response(
              JSON.stringify({
                title: 'Offline Sovereign Masterclass (የተዘጋጀ የትምህርት አድማስ)',
                summary:
                  'Knowledge module loaded from local offline archive. Even without internet, human learning, agriculture, medicine, and technology progress uninterrupted.',
                historicalContext:
                  'Indigenous innovation, agricultural terraces, and self-reliant civilization milestones preserved across generations.',
                keyConcepts: [
                  'Self-Reliant Community Engineering: Local problem-solving and sustainable agriculture without external dependence.',
                  'Decentralized Information Storage: Preserving critical healthcare, tech, and civic knowledge locally.',
                  'Mutual Aid & Fraternal Solidarity: Cooperation as the fundamental engine of human progress.',
                ],
                stepByStepGuide: [
                  'Step 1: Review foundational curriculum materials offline.',
                  'Step 2: Collaborate with peers in your local community chamber.',
                  'Step 3: Implement practical sustainable development actions in your locality.',
                ],
                realWorldImpact:
                  'Bridges digital divides, keeping rural students, farmers, elders, and families learning anywhere.',
                quickQuiz: [
                  {
                    question: 'Can human education progress without continuous cloud connectivity?',
                    options: [
                      'Yes, decentralized and offline knowledge empowers communities anywhere',
                      'No, learning is impossible without constant internet',
                      'Only if connected to centralized foreign servers',
                      'Education has zero value',
                    ],
                    correctIndex: 0,
                    explanation: 'Decentralized local knowledge ensures continuity of civilization and human dignity.',
                  },
                ],
                isOffline: true,
              }),
              { headers: { 'Content-Type': 'application/json' }, status: 200 }
            );
          }

          // Offline Security Radar Fallback
          if (url.pathname === '/api/security-moderation') {
            return new Response(
              JSON.stringify({
                safe: true,
                score: 100,
                flag: null,
                recommendation: 'Offline Civil Radar Active - Discourse permitted',
                isOffline: true,
              }),
              { headers: { 'Content-Type': 'application/json' }, status: 200 }
            );
          }

          // Default API health fallback
          return new Response(
            JSON.stringify({
              status: 'offline_mode',
              message: 'Zebene World Offline Cache Active (ዘበነ ኦፍላይን)',
              isOffline: true,
            }),
            { headers: { 'Content-Type': 'application/json' }, status: 200 }
          );
        })
    );
    return;
  }

  // 2. Navigation Requests (HTML pages)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(async () => {
          console.log('[ServiceWorker] Returning cached HTML page for offline navigation');
          const cached = await caches.match('/index.html');
          return cached || caches.match('/');
        })
    );
    return;
  }

  // 3. Static Assets (CSS, JS, Fonts, Images) - Cache First with Network Fallback & Revalidation
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached immediately, fetch and update in background if online
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && (networkResponse.status === 200 || networkResponse.status === 0)) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse);
              });
            }
          })
          .catch(() => {});
        return cachedResponse;
      }

      // If not in cache, fetch from network and store in cache
      return fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && (networkResponse.status === 200 || networkResponse.status === 0)) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If offline and request is an image or icon, try returning /icon.svg
          if (event.request.destination === 'image') {
            return caches.match('/icon.svg');
          }
          return cachedResponse;
        });
    })
  );
});
