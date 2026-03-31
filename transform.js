const fs = require('fs');

const path = 'c:/Users/david/wa/aulab-work/slide-jira/index.html';
let html = fs.readFileSync(path, 'utf8');

// 1. CSS Link
html = html.replace('<link rel="stylesheet" href="styles.css">', '<link rel="stylesheet" href="style.css">');

// 2. Welcome Slide
const welcomeOld = `        <!-- SLIDE DI BENVENUTO -->
        <section class="section-divider" data-state="is-section-divider">
          <div class="flex flex-col items-center justify-center gap-10 text-center max-w-4xl mx-auto">

            <div class="flex items-center gap-4">
              <span class="block w-12 h-px bg-aulab-yellow/40"></span>
              <span class="text-sm font-black uppercase tracking-[0.4em] text-aulab-yellow">Aulab Masterclass</span>
              <span class="block w-12 h-px bg-aulab-yellow/40"></span>
            </div>

            <div style="filter: drop-shadow(0 0 60px rgba(38,132,255,0.4));">
              <img src="media/jira-logo.png" alt="Jira" style="width: 140px; height: 140px; object-fit: contain;">
            </div>

            <div class="space-y-2">
              <h1 class="text-[8rem] font-black tracking-[-0.05em] text-white leading-none uppercase">Deep Dive</h1>
              <h1 class="text-[8rem] font-black tracking-[-0.05em] text-white leading-none uppercase">su Jira Cloud</h1>
            </div>

            <div class="w-24 h-px bg-white/20"></div>

            <p class="text-lg font-bold uppercase tracking-[0.25em] text-white/50">
              Gestione avanzata del lavoro e dei processi Agile
            </p>
          </div>
        </section>`;

const welcomeNew = `        <!-- SLIDE DI BENVENUTO -->
        <section class="welcome-slide">
          <div class="flex flex-col items-center gap-8 text-center">

            <div class="flex items-center gap-4">
              <span class="block w-12 h-px bg-aulab-yellow/40"></span>
              <span class="text-sm font-black uppercase tracking-[0.4em] text-aulab-yellow/80">Aulab Masterclass</span>
              <span class="block w-12 h-px bg-aulab-yellow/40"></span>
            </div>

            <div style="filter: drop-shadow(0 0 80px rgba(38,132,255,0.35));">
              <div class="w-28 h-28 rounded-3xl bg-aulab-cyan/10 border border-aulab-cyan/30 flex items-center justify-center">
                <img src="media/jira-logo.png" alt="Jira" style="width: 80px; height: 80px; object-fit: contain;">
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <h1 class="text-white">Deep Dive</h1>
              <h1 class="text-white">su Jira Cloud</h1>
            </div>

            <div class="w-24 h-px bg-white/20"></div>

            <p class="text-lg font-medium uppercase tracking-[0.2em] text-white/50">
              Gestione avanzata del lavoro e dei processi Agile
            </p>
            
          </div>
        </section>`;

html = html.replace(welcomeOld, welcomeNew);

// 3. Section Divider h1 classes
// Change <h1 class="text-[7.5rem] font-black tracking-[-0.05em] text-white leading-none uppercase">...</h1> to <h1 class="text-white">...</h1>
html = html.replace(/<h1 class="text-\[7\.5rem\] font-black tracking-\[-0\.05em\] text-white leading-none uppercase">([^<]+)<\/h1>/g, '<h1 class="text-white">$1</h1>');

// Change <div class="space-y-2"> to <div class="flex flex-col gap-2"> 
// (Only in section-dividers context ideally, but global replace is fine since it's only 5 instances of section titles)
// I'll be careful and do it globally carefully.
html = html.replace(/<div class="space-y-2">\s*<h1 class="text-white">/g, '<div class="flex flex-col gap-2">\n              <h1 class="text-white">');


// 4. Slide Headers
const headerRegex = /<div class="slide-header flex items-center justify-between w-full border-b border-white\/10">\s*<div class="flex items-center gap-3">\s*<span class="w-2 h-8 (bg-[a-z-]+)"><\/span>\s*<h2 class="[^"]+">([\s\S]*?)<\/h2>\s*<\/div>\s*<span class="[^"]+">[^<]+<\/span>\s*<\/div>/g;

html = html.replace(headerRegex, (match, bgClass, h2Title) => {
    const color = bgClass.replace('bg-', 'text-');
    const cleanTitle = h2Title.replace(/\s+/g, ' ').trim();
    return `<div class="slide-header flex items-center gap-3 border-b border-white/5 pb-5">
              <span class="text-[0.65rem] font-bold uppercase tracking-[0.25em] ${color}">
                ${cleanTitle}
              </span>
            </div>`;
});


fs.writeFileSync(path, html, 'utf8');
console.log('done');
