
# 🏨 Professional Setup & Hosting Guide

Welcome! Your website is built to act like a luxury hotel booking site, but with the personal touch of a private host. Follow these steps to complete your setup.

---

## 1. Customize Your Apartment Data (`constants.tsx`)
Open the `constants.tsx` file. This is your "Control Center." For each apartment, update these fields:

- **`price`**: e.g., "From €125/night".
- **`icalUrl`**: Go to your Airbnb or Booking.com calendar settings, find "Export Calendar," and copy the link ending in `.ics`. Paste it here.
- **`googleMapsEmbedUrl`**:
  1. Go to [Google Maps](https://www.google.com/maps).
  2. Search for your apartment's exact address.
  3. Click **Share** > **Embed a map**.
  4. Copy the `src` attribute (the link inside the quotes) and paste it into the `googleMapsEmbedUrl` field.

---

## 2. Update Your Contact Links (`App.tsx`)
Search for these terms in `App.tsx` and replace them with your real details:
- **`wa.me/393331234567`**: Replace `393331234567` with your country code + phone number for WhatsApp.
- **`mailto:elena@lavenoshores.com`**: Replace with your business email address.

---

## 3. Replace the Images
Your site uses professional Unsplash placeholders. To use your own photos:
1. Upload your photos to a folder called `images/` in your project.
2. Update the `images` array in `constants.tsx` with paths like `./images/apartment1/living-room.jpg`.

---

## 4. Setting up the "Elena" AI Concierge
The AI assistant (Elena) uses Google Gemini. To make it work:
1. Ensure your `API_KEY` is provided in the environment.
2. The AI already "knows" everything in your `constants.tsx` file, so it will answer guest questions about prices, amenities, and location automatically.

---

## 5. How to Deploy (Make it Public)
### Option A: Netlify (Fastest)
1. Create a free account at [Netlify](https://www.netlify.com/).
2. Drag and drop your project folder onto their dashboard.
3. Your site is live! You can then connect a custom domain (like `www.lavenoshores.com`).

### Option B: Vercel
1. Create a free account at [Vercel](https://vercel.com/).
2. Import your GitHub repository.
3. It will automatically detect the settings and deploy your site.

---

## 📅 Pro Tip for iCal Sync
The website checks your Airbnb/Booking calendar every time a guest visits the page. If you block a date on Airbnb, it will appear as "Booked Elsewhere" on your website within minutes. This prevents double-booking and makes you look like a professional agency!

*Buona fortuna con i tuoi appartamenti!*
