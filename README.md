# Granny Flats Perth — Digital Selection Book

A working prototype of a digital pre-start selection book for Granny Flats Perth. It reproduces the
content and visual style of the physical Specification Selection Book PDF as a scrollable, interactive
web experience.

## What it does

- **Selections** — every category from the physical booklet (external cladding, render/paint colours,
  roof, gutter/fascia, windows, doors, hardware, robes, electrical, kitchen, tapware, sanitaryware,
  tiling, cornice, and more), each rendered as its own "page" in the same sage-green / cream plaster
  visual style as the source book, with Included vs Optional Upgrade tiers and pricing where stated.
- **Construction Addendum** — a live, auto-generated document that lists every selection the client has
  made, grouped by category, with an estimated upgrade total. It's designed to be printed straight to
  PDF and attached to the build contract as an addendum.
- **Design Visualiser** — a drag-and-drop upload for a client's DWG/PDF/floor plan, shown alongside an
  interactive 3D massing model (react-three-fiber) whose wall, roof, fascia and window-frame materials
  update live as the client makes their exterior selections.

## Scope note on the 3D visualiser

The 3D view is an accurate-colour massing model, not a photorealistic render of the uploaded drawing.
Producing a true photoreal render from an arbitrary DWG/PDF requires a server-side CAD-processing and
rendering pipeline — out of scope for a client-side prototype. The upload flow is built so that pipeline
can be plugged in later without changing the surrounding UI.

## Stack

React + TypeScript + Vite, Tailwind CSS v4, Zustand (selection state, persisted to `localStorage`),
react-three-fiber / drei / three (3D viewer), pdfjs-dist (PDF plan preview).

## Development

```bash
npm install
npm run dev      # start dev server
npm run build    # typecheck + production build
npm run lint      # oxlint
```

## Content & assets

Selection categories, options, brand names and pricing are transcribed from the physical Granny Flats
Perth Pre-Start Selection Booklet. Product photography isn't included — options are shown with simple
line-art iconography and accurate swatch colours as a placeholder; see `src/components/ProductIcon.tsx`
and `src/data/catalogue.ts` (the `icon`/`hex` fields) to swap in real supplier photography.
