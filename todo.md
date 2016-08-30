Hilde:

- Interaksjon ved enden av siden når man har et filter aktivt
- Shareknapp og location

KM:

- Inline font som b64

- Blank ut foto når den er utenfor viewport.
-- Lag en ny komponent som wrapper photo, `blankable-anchored-photo.js`.
-- Implementer `componentDidMount` i `blankable-anchored-photo.js` som registrerer egen høyde på div OG egen pageYOffset. `blankable-anchored-photo` tar over ansvaret til `Anchor`.
-- Lytt på `scroll.innerHeight` og `scroll.innerWidth` og gjør en oppdatering på egen høyde og pageYOffset.
-- Lytt på `scroll.pageYOffset` og se om bildet er utenfor viewet. Dersom utenfor:
--- Sett høyde på div til egen høyde og ikke render bildet

Søk
- Filter tags
