import { next } from '@vercel/edge';

/* Toegangsslot voor Het Retrowoordenparadijs.
 *
 * De site staat achter een gebruikersnaam en een wachtwoord, zodat alleen
 * wie ze kent binnenkomt. Zet ze in Vercel onder
 *   Settings -> Environment Variables:
 *     RWP_GEBRUIKER   bijvoorbeeld: rogier
 *     RWP_WACHTWOORD  een lange zin, niet te raden
 *
 * Staan ze er niet, dan gaat de deur op slot in plaats van open: liever
 * een onbereikbare site dan per ongeluk een openbare.
 */

export const config = { matcher: '/:path*' };

const GEEN_SPOOR = {
  'Cache-Control': 'no-store, max-age=0',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
};

/* Vergelijkt zonder vroege uitstap, zodat de duur van de vergelijking
   niets over het wachtwoord verraadt. */
function gelijk(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;
  let verschil = 0;
  for (let i = 0; i < a.length; i++) verschil |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return verschil === 0;
}

export default function middleware(request) {
  const gebruiker = process.env.RWP_GEBRUIKER;
  const wachtwoord = process.env.RWP_WACHTWOORD;

  if (!gebruiker || !wachtwoord) {
    return new Response(
      'De toegang tot deze site is nog niet ingesteld. Zet RWP_GEBRUIKER en RWP_WACHTWOORD in Vercel.',
      { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8', ...GEEN_SPOOR } }
    );
  }

  const kop = request.headers.get('authorization') || '';
  if (kop.slice(0, 6).toLowerCase() === 'basic ') {
    let ontcijferd = '';
    try {
      ontcijferd = atob(kop.slice(6).trim());
    } catch {
      ontcijferd = '';
    }
    const scheiding = ontcijferd.indexOf(':');
    if (scheiding > -1) {
      /* beide altijd vergelijken, geen kortsluiting */
      const naamGoed = gelijk(ontcijferd.slice(0, scheiding), gebruiker);
      const woordGoed = gelijk(ontcijferd.slice(scheiding + 1), wachtwoord);
      if (naamGoed && woordGoed) return next();
    }
  }

  return new Response('Wachtwoord vereist.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Het Retrowoordenparadijs", charset="UTF-8"',
      'Content-Type': 'text/plain; charset=utf-8',
      ...GEEN_SPOOR,
    },
  });
}
