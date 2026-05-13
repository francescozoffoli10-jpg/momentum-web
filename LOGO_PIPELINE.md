# Momentum Logo Delivery Pipeline

## Overview

68 tenant logos currently use placeholder or auto-generated files.  
This document explains how to request, receive, and deploy real logos.

---

## Folder Structure

```
public/
  sites/
    lindora/logos/     ← PNG files, named by tenant slug
    escazu/logos/
    pinares/logos/
```

---

## Logo Spec (request from tenants or design team)

| Property | Value |
|----------|-------|
| Format | PNG or SVG (PNG preferred for consistency) |
| Canvas | 400 × 200 px (2:1 ratio) |
| Background | Transparent |
| Content area | Logo centered, max 360 × 160 px (20px padding each side) |
| Color version | Full color on transparent |
| File naming | Must match the tenant's `slug` in the data file |

---

## Logos Needed (68 total)

### Escazú (23 logos)
- age-metrics-medical
- aliaxis
- ambrosia-estetica
- centro-oncologico
- dj-arbitraje / dj-arbitraje-oficentro (same brand, 2 slugs)
- el-tallercito
- el-tramito-a-granel
- entrecote
- estetica-nadira
- excellence-consulting
- farmacia-la-arboleda
- firmamento
- goodmed *(Escazú version)*
- impegno
- insalud
- legal-vision
- paladixo
- rla-power
- sagrario-padilla
- teatralia
- vitae
- wellness-institute

### Lindora (1 logo)
- mdt-costa-rica

### Pinares (44 logos)
- aira-pilates
- alfombra-roja
- antonella-boutique
- auto-pits
- ayana-fashion
- banco-lafise
- bostons / boston-beer-garden
- bottega
- canet
- chamo-gourmet
- clean-clean
- da-noi
- davivienda
- dennys
- dkore
- el-armario
- el-caminito
- espressivo-bistro
- fishermans
- fun-in-a-box
- gnc
- goodmed *(Pinares version)*
- ishop
- kenana
- la-fonda-azteca
- man-haus
- matsuri
- mcdonalds
- mobil-dress
- naans-curries / naans-curries-pinares
- pharmacy-market
- pikeos
- play-and-dream
- radio-shack
- refill-to-go
- sazon-tico
- subway
- terraza-97
- trasciende
- trending-store
- vainilla-beauty
- vinum

---

## Delivery Process

1. **Receive files** — PNG files named exactly as the slug (e.g. `entrecote.png`)
2. **Drop into folder** — place in `public/sites/[site]/logos/`
3. **Commit and push** — `git add -A && git commit -m "logos: add [site] tenant logos" && git push`
4. **Vercel auto-deploys** within ~60 seconds
5. **No code changes needed** — the app already references the filenames

---

## Priority Order

1. **Gastronomía** tenants first — most user-facing
2. **Servicios / Comercios** second
3. **Oficentro / Ofiplaza** last (lower traffic pages)

---

## Automated Placeholder Detection

Run from project root to see which logos are still placeholders:

```bash
find public/sites -name "*.png" | while read f; do
  SIZE=$(stat -c%s "$f")
  [ "$SIZE" -lt 5000 ] && echo "PLACEHOLDER: $f (${SIZE}B)"
done
```
