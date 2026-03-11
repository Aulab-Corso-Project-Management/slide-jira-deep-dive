# Design System — Jira Aulab Slides

Stack: **Reveal.js 5.1** · **Tailwind CSS v4 (browser CDN)** · **Font Awesome 6.5** · **Montserrat**

---

## Colori

| Token | Valore | Uso |
|-------|--------|-----|
| `aulab-yellow` | `#ffed00` | Accenti primari, highlight |
| `aulab-cyan` | `#38bdf8` | Accenti secondari, bordi card |
| `dark-bg` | `#0B0E14` | Background globale |
| `white/[0.05]` | rgba bianco 5% | Fill glass card |
| `white/[0.12]` | rgba bianco 12% | Bordo glass card |
| `gray-400` | `#9CA3AF` | Testo body muted |
| `gray-500` | `#6B7280` | Testo molto muted, label secondari |
| `gray-600` | `#4B5563` | Footer micro-label nelle card |

### Gradient testo
```html
<span class="text-gradient">testo</span>
```
Usare solo dentro card o elementi inline — **mai sui titoli h1 delle section divider**.

---

## Note Architetturali — CSS Conflict

> ⚠️ **Reveal.js usa `* { margin: 0; padding: 0 }` non-layered.** Tailwind v4 mette le utility in `@layer utilities`. Le regole non-layered battono quelle layered indipendentemente dalla specificità.

**Regola pratica:** margin, padding e font-size su heading si definiscono sempre in `styles.css` con `!important`.

| Proprietà CSS | Usa Tailwind? | Note |
|---------------|---------------|------|
| `padding` | ❌ Mai | Definire in `styles.css` con `!important` |
| `margin` | ❌ Mai | Definire in `styles.css` con `!important` |
| `font-size` su `<h1>`, `<p>`, `<h4>` | ❌ | Reveal.js override; definire in `styles.css` |
| `border-radius` | ✅ | Non resettato da Reveal |
| `gap` | ✅ | Proprietà flex/grid, non resettata |
| `background`, `color` | ✅ | Non resettati da Reveal |
| `h-full` su div slide | ✅ | Funziona perché `styles.css` setta `height: 100%` sulle section |

### Centering fix — `:has(> section)`

Le section che wrappano capitoli (group-container) **non** devono ricevere `display:flex` o padding. Usare `:not(:has(> section))` per applicare il layout solo alle slide foglia:

```css
.reveal .slides section:not(:has(> section)) {
  padding: var(--slide-padding-y) var(--slide-padding-x) !important;
  display: flex !important;
  flex-direction: column;
}
```

---

## Tipografia

**Font:** Montserrat (Google Fonts) — pesi usati: 300, 400, 600, 700, 800, 900

| Elemento | Classe Tailwind | Valore reale (CSS) | Contesto |
|----------|----------------|--------------------|----------|
| Titolo section divider (h1) | — | `3rem` via `.reveal .slides section.section-divider h1` in `styles.css` | Solo slide capitolo |
| Eyebrow label | `text-sm font-black uppercase tracking-[0.4em]` | — | Slide benvenuto / capitolo |
| Heading card h3/h4 | — | `1.2rem` via `.reveal .glass-card h3,h4` | Dentro `.glass-card` |
| Body card p/li | — | `1rem` via `.reveal .glass-card p,li` | Dentro `.glass-card` |

---

## Slide Benvenuto

Logo ufficiale Jira via file locale:

```html
<div style="filter: drop-shadow(0 0 60px rgba(38,132,255,0.4));">
  <img src="media/jira-logo.png" alt="Jira" style="width: 140px; height: 140px; object-fit: contain;">
</div>
```

---

## Slide Capitolo (Section Divider)

Prima slide di ogni sezione. Classe `section-divider` + `data-state="is-section-divider"`.

### Alternanza Colori
- **Capitoli Dispari (01, 03, ...)**: Usano `aulab-yellow`.
- **Capitoli Pari (02, 04, ...)**: Usano `aulab-cyan`.
- **Titoli h1**: Sempre **bianchi** (`text-white`) — niente gradiente.

```html
<section class="section-divider" data-state="is-section-divider">
  <div class="flex flex-col items-center justify-center gap-8 text-center">

    <!-- Eyebrow con linee laterali -->
    <div class="flex items-center gap-4">
      <span class="block w-12 h-px bg-aulab-yellow/40"></span>
      <span class="text-sm font-black uppercase tracking-[0.4em] text-aulab-yellow">Capitolo 01</span>
      <span class="block w-12 h-px bg-aulab-yellow/40"></span>
    </div>

    <!-- Icon container -->
    <div class="p-8 rounded-3xl bg-white/[0.04] border border-white/10 shadow-[0_0_80px_rgba(255,237,0,0.12)] border-aulab-yellow/20">
      <i class="fa-solid fa-[icon-name] text-6xl text-aulab-yellow"></i>
    </div>

    <!-- Titoli: entrambi bianchi, dimensione via styles.css (3rem) -->
    <div class="space-y-2">
      <h1 class="font-black tracking-[-0.05em] text-white leading-none uppercase">Parola Uno</h1>
      <h1 class="font-black tracking-[-0.05em] text-white leading-none uppercase">&amp; Parola Due</h1>
    </div>

    <div class="w-24 h-px bg-white/20"></div>

    <p class="text-lg font-bold uppercase tracking-[0.25em] text-white/50">Descrizione breve</p>

  </div>
</section>
```

> **Nota:** `font-size` degli h1 è controllata da `styles.css` (`.reveal .slides section.section-divider h1 { font-size: 3rem !important; }`). Le classi Tailwind `text-[*rem]` su h1 **non applicano** in Reveal.js.

---

## Slide Normale (pattern 01.01)

Struttura obbligatoria: `.slide-header` + wrapper centrato + grid.

```html
<section id="slide-id">
  <div class="flex flex-col h-full">

    <!-- Eyebrow header — margin-bottom 50px via .slide-header in styles.css -->
    <div class="slide-header flex items-center gap-3 border-b border-white/5 pb-5">
      <span class="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-aulab-yellow/60">
        01.01 &mdash; Label
      </span>
    </div>

    <!-- Wrapper: flex-1 + items-center centra le card verticalmente -->
    <div class="flex-1 flex items-center">
      <div class="grid grid-cols-12 gap-5 w-full">
        <!-- cards -->
      </div>
    </div>

  </div>
</section>
```

---

## Componenti

### Glass Card

```html
<div class="glass-card">...</div>
```

Padding da `styles.css`:
```css
.reveal .glass-card { padding: 2.5rem 3rem !important; }
```

#### Varianti bordo

```html
<!-- Accent sinistro cyan -->
<div class="glass-card border-l-4 border-aulab-cyan/50">

<!-- Accent sinistro yellow -->
<div class="glass-card border-l-4 border-aulab-yellow/50">

<!-- Linea top cyan -->
<div class="glass-card relative">
  <div class="absolute inset-x-0 top-0 h-0.5 bg-aulab-cyan rounded-t-2xl"></div>
```

#### Card con hover glow

```html
<div class="glass-card relative overflow-hidden group hover:border-aulab-yellow/40 transition-all duration-300">
  <div class="absolute -right-16 -top-16 w-56 h-56 bg-aulab-yellow/5 rounded-full blur-3xl
              group-hover:bg-aulab-yellow/10 transition-colors duration-500"></div>
  <div class="relative z-10">...</div>
</div>
```

### Icon Badge

```html
<!-- Taglia normale (w-9) -->
<div class="w-9 h-9 rounded-lg bg-aulab-cyan/10 flex items-center justify-center border border-aulab-cyan/20 shrink-0">
  <i class="fa-solid fa-[icon] text-aulab-cyan text-base"></i>
</div>

<!-- Taglia grande (w-11), per card feature -->
<div class="w-11 h-11 rounded-xl bg-aulab-yellow/10 flex items-center justify-center border border-aulab-yellow/20 shrink-0">
  <i class="fa-solid fa-[icon] text-aulab-yellow text-lg"></i>
</div>
```

### Bullet List

```html
<ul class="space-y-4">
  <li class="flex items-center gap-3 text-sm text-gray-400">
    <span class="w-1.5 h-1.5 rounded-full bg-aulab-yellow shrink-0"></span>
    <span>Testo. <strong class="text-white font-semibold">Keyword</strong> continua.</span>
  </li>
</ul>
```

---

## Layout Patterns

### 1+2 colonne (pattern 01.01)

```html
<div class="flex-1 flex items-center">
  <div class="grid grid-cols-12 gap-5 w-full">
    <div class="col-span-12 glass-card ..."><!-- Hero card full width --></div>
    <div class="col-span-6 glass-card ..."><!-- Card sx --></div>
    <div class="col-span-6 glass-card ..."><!-- Card dx --></div>
  </div>
</div>
```

### 2 colonne (pattern 01.02)

```html
<div class="flex-1 flex items-center">
  <div class="grid grid-cols-2 gap-6 w-full">
    <div class="glass-card flex flex-col gap-6 ..."><!-- Feature card --></div>
    <div class="glass-card flex flex-col gap-6 ..."><!-- Feature card --></div>
  </div>
</div>
```

### Timeline orizzontale con frecce (pattern 01.03)

```html
<div class="flex-1 flex items-center">
  <div class="flex items-stretch gap-4 w-full" style="height: 280px;">

    <div class="flex-1 glass-card flex flex-col items-center justify-center text-center">
      <div class="flex flex-col items-center gap-4">
        <span class="block text-4xl font-black text-gray-300 italic tracking-tighter leading-none">Titolo</span>
        <p class="text-xs text-gray-500 leading-relaxed uppercase tracking-wider">Anno · Descrizione</p>
      </div>
    </div>

    <div class="flex items-center shrink-0 px-2">
      <i class="fa-solid fa-chevron-right text-gray-700 text-xl"></i>
    </div>

    <!-- ripetere per ogni fase, con colore accent diverso -->

  </div>
</div>
```

### Agenda (slide indice)

```html
<div class="grid grid-cols-2 gap-x-16 gap-y-8">
  <div class="flex items-center gap-6 group">
    <div class="w-14 h-14 rounded-2xl bg-aulab-yellow/5 flex items-center justify-center border border-aulab-yellow/10 group-hover:border-aulab-yellow/40 transition-all duration-500 shrink-0">
      <span class="text-xl font-black text-aulab-yellow">01</span>
    </div>
    <div class="flex flex-col gap-1">
      <span class="text-xl font-bold text-white uppercase tracking-tight">Titolo Capitolo</span>
    </div>
  </div>
  <!-- ripetere per ogni capitolo, alternando yellow/cyan -->
</div>
```

> **Nota:** I sottotitoli descrittivi in inglese (tipo "Introduction", "Architecture") sono stati rimossi. Ogni voce agenda ha solo il titolo italiano del capitolo.

---

## Struttura HTML Obbligatoria

```
section[id="..."]
  div.flex.flex-col.h-full
    div.slide-header                   ← eyebrow, margin-bottom 50px via CSS
    div.flex-1.flex.items-center       ← wrapper centramento verticale
      div.grid.w-full                  ← layout (grid-cols-12 o grid-cols-2)
        div.glass-card                 ← card con padding da styles.css
```
