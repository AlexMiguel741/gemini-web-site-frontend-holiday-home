# Calendar Issues Fixed 🔧

## Problems Identified

### 1. **Timezone Offset Bug** (Main Issue)
- **Problem**: Calendar dates were created in browser's local timezone, but iCal dates from Booking.com were in UTC
- **Example**: User in GMT+2 timezone sees March 18 instead of March 19
- **Fix**: All dates now use `Date.UTC()` for consistent UTC timezone handling

### 2. **Poor Date Parsing**
- **Problem**: Different iCal date formats weren't handled properly
- **Formats supported now**:
  - `YYYYMMDD` (all-day events like `20260319`)
  - `YYYYMMDDTHHMMSSZ` (timed events like `20260319T000000Z`)
  - ISO strings with fallback parsing

### 3. **Silent Failures**
- **Problem**: Fetch errors and parsing issues didn't log anything useful
- **Fix**: Added detailed console logging (visible in DevTools when IN DEVELOPMENT)
  - Shows fetch success/failure
  - Shows how many bookings parsed
  - Shows individual event dates
  - Shows cache hits

### 4. **Cache Issues**
- **Problem**: 30-minute cache could hide problems during testing
- **Fixed**: Console logs show when cache is being used

## Testing Locally

### To Debug the Calendar:

1. **Open Browser DevTools**:
   - Press `F12` or `Ctrl+Shift+I`
   - Go to "Console" tab

2. **Open a property details page**
   - Look for console messages like:
     ```
     🔄 Fetching calendar from: https://ical.booking.com...
     ✅ Proxy fetch succeeded
     ✅ Parsed 8 bookings from iCal
       Event 1: 2026-03-15 → 2026-03-17
       Event 2: 2026-03-20 → 2026-03-22
     📊 Event parsing: 8/8 events valid
     ```

3. **If YOU see no bookings**:
   - Check if `✅ Parsed 0 bookings from iCal` appears
   - This means the fetch worked but found no events
   - Verify your Booking.com properties have actual reservations

4. **If fetch fails**:
   - You'll see: `❌ Direct fetch failed: ...`
   - This usually means CORS issues or network problems
   - Try using the CalendarDebugPanel (only in DEV mode)

## Key Changes Made

| File | Changes |
|------|---------|
| `services/icalService.ts` | ✅ Added UTC timezone handling, improved date parsing, added debug logging |
| `App.tsx` | ✅ Fixed `isDayBooked()`, `isDayInPast()`, `isToday()` to use UTC, added calendar fetch logging |

## What the Calendar Shows

- **Gray**: Days in the past
- **Red**: Days that are booked (occupied)
- **Green**: Days available for booking
- **Sync indicator**: Green dot = connected, Red dot = error, Orange pulsing = syncing

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Calendar shows empty/no bookings | Check console: Are events parsing? Check Booking.com for reservations |
| Wrong dates highlighted | Clear browser cache, hard refresh (Ctrl+F5), check console timestamps |
| "Sync Error" message | Calendar fetch failed - check network, wait 5s (auto-retries) |
| Off-by-one day | NOW FIXED! Was a timezone issue |
| Dates look wrong in specific timezone | Should be fixed now with UTC handling |

## For Production

- All console logs only show in development (`import.meta.env.DEV`)
- No debug info visible to end users
- Calendar continues to work silently in production
- 30-minute cache prevents excessive API calls
