// Friday Works' service worker for loader.html. It is not part of either app.
// Every request goes to the network exactly as the app made it. For the files an
// app downloads before it can start (.wasm, .js, .part-*), a copy of the response
// is read on the side to count bytes, and the count is broadcast to loader.html
// so it can show a real percentage without downloading anything twice.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

const COUNTED = /\.(?:wasm|js)$|\.part-[a-z]+$/;

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET" || request.mode === "navigate" || !event.clientId) return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !COUNTED.test(url.pathname)) return;
  event.respondWith(fetch(request).then((response) => {
    if (response.ok && response.body) event.waitUntil(countBytes(event.clientId, response.clone()));
    return response;
  }));
});

// The app frame carries loader.html's token in its URL (?fwload=…), so counts from
// another tab or a direct visit never reach the wrong progress bar.
async function countBytes(clientId, response) {
  const client = await self.clients.get(clientId);
  const token = client && new URL(client.url).searchParams.get("fwload");
  if (!token) {
    await response.body.cancel();
    return;
  }
  const channel = new BroadcastChannel("fw-load-progress");
  const reader = response.body.getReader();
  let pending = 0;
  let sentAt = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    pending += value.byteLength;
    if (Date.now() - sentAt >= 100) {
      channel.postMessage({ token, bytes: pending });
      pending = 0;
      sentAt = Date.now();
    }
  }
  if (pending) channel.postMessage({ token, bytes: pending });
  channel.close();
}
