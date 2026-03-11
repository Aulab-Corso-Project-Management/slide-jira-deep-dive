## Design Context

### Users
Studenti Aulab che seguono masterclass tecniche (Jira Cloud). Contesto: formazione professionale sincrona, proiettato su schermo. Job-to-be-done: comprendere Jira in modo rapido e memorabile.

### Brand Personality
**Autorevole · Energico · Diretto**
Aulab è un brand tech-education italiano. Le slide devono trasmettere **fiducia e chiarezza didattica**, non decorativismo fine a se stesso.

### Aesthetic Direction
- Dark premium: `#0B0E14` background con glassmorphism
- Accenti: Giallo Aulab `#ffed00` (primario) + Cyan `#38bdf8` (secondario, capitoli pari)
- Tipografia: Montserrat Black uppercase per titoli, 400 per body
- Alternanza colore: capitoli dispari = yellow, pari = cyan
- Anti-reference: niente slide "PowerPoint aziendale", niente clip-art, niente sfondi chiari

### Design Principles
1. **Gerarchia prima di tutto** — ogni slide ha un'unica informazione principale; tutto il resto supporta.
2. **Gap, non margin** — dentro Reveal.js, usare `gap-*` (flex/grid) per spacing, mai `m-*`/`p-*` Tailwind che non applicano.
3. **Icon badge sempre** — le icone si mettono sempre in `w-11 h-11 rounded-xl bg-color/10 border border-color/20` badge, mai nude.
4. **Consistenza struttura** — ogni slide normale: `section > div.flex.flex-col.h-full > .slide-header + div.flex-1.flex.items-center > grid`.
5. **Meno è più** — card pulite, testo conciso, spazio respirabile.

## Stack
Reveal.js 5.1 · Tailwind CSS v4 (browser CDN) · Font Awesome 6.5 · Montserrat

## Note Critiche
- Tailwind `p-*`, `m-*` non funzionano in Reveal.js (reset non-layered batte le utility layered). Spacing va in `styles.css` con `!important`.
- `gap-*` funziona sempre (proprietà flex/grid non resettata).
- Slide normali DEVONO avere `<div class="flex flex-col h-full">` come primo figlio della section.
- File design system: `DESIGN_SYSTEM.md`
