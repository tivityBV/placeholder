# Het Retrowoordenparadijs — demo achter een wachtwoord

Statische site (één `index.html`) met alle 439 woorden en teksten uit
*Van Allegaartje tot Zeebenen* van Rogier Proper. Bedoeld voor een klein
gezelschap, niet voor publiek.

## Belangrijk vooraf

Het wachtwoord hieronder beschermt **alleen de Vercel-site**. Zolang de
GitHub-repo openbaar is, is `index.html` — en dus de volledige tekst van
het boek — gewoon op GitHub te lezen. Wie echt wil dat alleen genodigden
erbij kunnen, zet de repo op privé:

> GitHub → repo → **Settings** → **General** → onderaan **Danger Zone** →
> **Change repository visibility** → **Private**

De tekst zit ook in de git-geschiedenis, dus dat blijft nodig, ook als het
bestand later weer weggehaald wordt.

## Deployen op Vercel

De site staat in een submap van een repo die óók de 'tivity-pagina bevat.
Daarom wordt alleen deze map uitgerold, en blijft de rest onaangeroerd.

1. Vercel → **Add New → Project** → importeer `tivityBV/placeholder`.
2. Bij **Root Directory**: klik **Edit** en kies `retrowoordenparadijs`.
   Dit is de belangrijkste stap — zonder dit wordt de verkeerde site
   uitgerold en gaat het slot over de 'tivity-pagina heen.
3. Framework Preset: **Other**. Er valt niets te bouwen, het is statisch.
4. **Environment Variables** → voeg deze twee toe, voor alle omgevingen
   (Production, Preview én Development):

   | Naam | Waarde |
   |---|---|
   | `RWP_GEBRUIKER` | bijvoorbeeld `rogier` |
   | `RWP_WACHTWOORD` | een lange zin, zie hieronder |

5. **Deploy**.

Bij het openen van de site vraagt de browser om naam en wachtwoord. Dat is
het ingebouwde inlogvenster van de browser; er is geen account voor nodig.

### Een wachtwoord kiezen

Neem iets lang en saais in plaats van iets korts en slims. Bijvoorbeeld:

    drollenvanger-kwispedoor-schobbejak-landrot-27

Zet het **nooit** in de repo — alleen in Vercel bij Environment Variables.
Stuur het Rogier apart van de link, dus niet in dezelfde mail.

### Als de omgevingsvariabelen ontbreken

Dan geeft de site bewust een foutmelding (503) in plaats van zichzelf te
tonen. Dat is opzet: liever onbereikbaar dan per ongeluk openbaar.

## Het alternatief: Vercel's eigen slot

Heeft het account een **Pro**-abonnement, dan kan het ook zonder deze
bestanden: **Settings → Deployment Protection → Password Protection**.
Eén schuifje, één wachtwoord, geen code. Werkt net zo goed. `middleware.js`
en `package.json` mogen dan weg; `vercel.json` en `robots.txt` kunnen
blijven staan.

Het slot in `middleware.js` bestaat omdat het óók op het gratis plan werkt.

## Bestanden

| Bestand | Waarvoor |
|---|---|
| `index.html` | de hele site: vormgeving, werking en alle 439 woorden |
| `middleware.js` | het wachtwoordslot (draait op Vercel, vóór de pagina) |
| `package.json` | één pakket, `@vercel/edge`, nodig voor het slot |
| `vercel.json` | headers die zoekmachines weghouden |
| `robots.txt` | idem, voor de nette bots |

## De inhoud

Dit is een promotiedemo voor **deel twee** van *Van Allegaartje tot
Zeebenen*, dat in de maak is — in eerste instantie om uitgevers het plan
te laten zien.

- **Woordenbank**: de kandidaten voor deel twee. Twee woorden (kwispedoor
  en schuinsmarcheerder) hebben al een echte tekst van Rogier; de rest is
  duidelijk gemarkeerde plaatshouder.
- **Dagelijks spel** en **Uit deel 1** putten uit het verschenen eerste
  boek (Balans, 2024): 120 losse zinsfragmenten voor het spel en acht
  volledige stukken als proeverij. Het manuscript van deel één zit dus
  niet meer integraal in dit bestand — wel nog in de git-geschiedenis van
  deze repo, wat een extra reden is om hem op privé te zetten.

Tekst © Rogier Proper / Uitgeverij Balans.
