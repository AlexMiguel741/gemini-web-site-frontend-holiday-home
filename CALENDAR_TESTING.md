# 📅 Calendar Testing Guide

## Come Verificare che il Calendario Funziona

### 1. Panel di Debug (SOLO in Localhost)

Quando accedi a `http://localhost:3000` vedrai un bottone **"🔧 Test Calendar"** in basso a destra.

**Nota:** Questo bottone appare SOLO in modalità sviluppo (`npm run dev`). Non appare in produzione.

### 2. Cosa Puoi Testare

#### A. "Verify All URLs"
Controlla che tutti i link Booking.com sono validi:
- ✅ Format corretto (`https://ical.booking.com/v1/export/t/...`)
- ✅ Token presente
- ✅ URL accessibile

#### B. "Test [Apartment Name]"
Testa il download e il parsing dei dati di un appartamento:
- Scarica il calendario da Booking.com (tramite proxy CORS)
- Parsa le date di prenotazione
- Mostra quante prenotazioni sono state trovate
- Elenca le date occupate

### 3. URL di Booking Configurati

I seguenti URL sono già configurati in `constants.tsx`:

```typescript
// Il Blu di Laveno (Azure)
icalUrl: 'https://ical.booking.com/v1/export/t/e95dd962-d17c-4d29-8b5b-1e8235c1fe19.ics'

// Verso il Lago (Sapphire)
icalUrl: 'https://ical.booking.com/v1/export?t=1cb3a14d-a13a-4833-8240-912478849846'

// Le Cascate (Cobalt)
icalUrl: 'https://ical.booking.com/v1/export?t=d4e0ddde-2c63-4b93-abd2-e3fec042a905'

// Casa Azzurra (Navy)
icalUrl: 'https://ical.booking.com/v1/export?t=281c00e1-0da9-49f8-a98d-b7532b6e48bb'
```

### 4. Come Funciona il Fetch

In localhost, i dati CORS-bloccati vengono ottenuti tramite proxy:

```
Client → Proxy → Booking.com → Proxy → Client
```

**Proxy utilizzati (in parallelo):**
1. `https://api.allorigins.win` (più affidabile)
2. `https://cors-anywhere.herokuapp.com` (fallback)

### 5. Cosa Controllare nel Output

```
✅ Found 3 bookings              ← OK, calendario sincronizzato
Booking 1:
  Start: Thu Mar 20 2026
  End: Sun Mar 22 2026
  Duration: 2 days
```

## Troubleshooting

| Problema | Soluzione |
|----------|----------|
| "No bookings found" | Nessuna prenotazione attiva su Booking |
| Timeout dopo 3 sec | Booking o proxy irraggiungibile |
| CORS error | Cambia proxy in `icalService.ts` |
| URL non valido | Verifica il token Booking.com |

## Test in Produzione

In produzione (`npm run build`), il debug panel NON è disponibile.

Per testare il calendario in produzione, controlla:
1. Browser DevTools → Console
2. Network tab → Cerca richieste a `api.allorigins.win`
3. Verificare che il calendario mostra correttamente le date occupate

## Aggiornare gli URL

Per cambiare l'URL di un appartamento:

1. Accedi a Booking.com → Calendario proprietario
2. Copia il link dell'importazione iCal
3. Aggiorna `constants.tsx`:
   ```typescript
   icalUrl: 'https://ical.booking.com/...'
   ```
4. Il calendario si aggiornerà automaticamente

## Cache

Il calendario è cachato per 30 minuti per ottimizzare le performance.

Per forzare un refresh:
- Apri DevTools → Application → Clear site data
- Oppure attendi 30 minuti

---

**Sviluppatore:** Usa il debug panel per verificare che tutto funziona prima di deployare!
