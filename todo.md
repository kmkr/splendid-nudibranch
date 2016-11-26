Hilde:

- Interaksjon ved enden av siden når man har et filter aktivt
- Shareknapp og location


KM:

- Bytt til less for å slippe den native dep-greia
- Vurder å bruke route.param for å hente param-data (som f.eks photo)
- Sjekk performance-forbedring med rollup
- Bruk webp-bilder i tillegg til JPG
    - Konverter tilsvarende som JPG ved upload
    - Lag et endepunkt som konverterer alle de som finnes fra før og laster opp til S3
    - Finn ut hvordan man bruker webp med JPG som fallback og implementer i <Photo/>
- Vurder inline font som b64, bruk fontsquirrel til å hente raleway

- Blank ut foto når den er utenfor viewport.
-- Lag en ny komponent som wrapper photo, `blankable-anchored-photo.js`.
-- Implementer `componentDidMount` i `blankable-anchored-photo.js` som registrerer egen høyde på div OG egen pageYOffset. `blankable-anchored-photo` tar over ansvaret til `Anchor`.
-- Lytt på `scroll.innerHeight` og `scroll.innerWidth` og gjør en oppdatering på egen høyde og pageYOffset.
-- Lytt på `scroll.pageYOffset` og se om bildet er utenfor viewet. Dersom utenfor:
--- Sett høyde på div til egen høyde og ikke render bildet

Søk
- Filter tags
- Vurder FUSe for søking, https://github.com/krisk/Fuse
