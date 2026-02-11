const CACHE_NAME = "lifefix-offline-v2";

const OFFLINE_FILES = [
  "./",
  "index.html",
  "script.js",
  "style.css",
  "manifest.json",
  "icon.svg",
  "about_us.html",
  "admin.html",
  "ai-service.js",
  "boss_fight.html",
  "category.html",
  "computer_languages.html",
  "cook.html",
  "detail.html",
  "df83c3ca-b058-404f-bd58-50e0e721e4ce.mp3",
  "exams.html",
  "finance-list.html",
  "finance.html",
  "food.html",
  "foreign_languages.html",
  "forgot.html",
  "guidance_m3.html",
  "guidance_m6.html",
  "guidance_select.html",
  "history.html",
  "languages.html",
  "lesson.html",
  "login.html",
  "loginadmin.html",
  "logout.html",
  "minigames.css",
  "minigames.html",
  "minigames.js",
  "posn_select.html",
  "practice_coding.html",
  "problems.html",
  "register.html",
  "sign_language.html",
  "solve.html",
  "sport.html",
  "study.html",
  "study_language.html",
  "study_mode_select.html",
  "subject.html",
  "travel.html",
  "verify.html",
  "sport-badminton.png",
  "sport-basketball.png",
  "sport-football.png",
  "sport-volleyball.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Caching all files");
      return cache.addAll(OFFLINE_FILES);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            console.log("Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      // Return cached response if found, else fetch from network
      return res || fetch(e.request).catch(() => {
        // Fallback for HTML documents if offline
        if (e.request.mode === 'navigate') {
          return caches.match('./index.html'); 
        }
      });
    })
  );
});
