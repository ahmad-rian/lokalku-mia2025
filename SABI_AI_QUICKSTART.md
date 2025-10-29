# SABI AI - Quick Start Guide 🚀

## ✅ What's Been Created

### Files Created (14 total)

**Type Definitions:**
- `src/types/chat.types.ts` - TypeScript interfaces for chat

**Services:**
- `src/services/gemini.service.ts` - Google Gemini AI integration

**Hooks:**
- `src/hooks/useChat.ts` - Chat state management
- `src/hooks/useGemini.ts` - AI integration hook

**Components (11 files):**
- `src/components/chat/ChatWidget.tsx` - Main component
- `src/components/chat/ChatButton.tsx` - Floating button
- `src/components/chat/ChatWindow.tsx` - Chat window container
- `src/components/chat/ChatHeader.tsx` - Header with branding
- `src/components/chat/ChatMessages.tsx` - Messages list
- `src/components/chat/MessageBubble.tsx` - Message component
- `src/components/chat/UMKMCard.tsx` - UMKM card in chat
- `src/components/chat/ChatInput.tsx` - Input field
- `src/components/chat/QuickReplies.tsx` - Quick reply buttons
- `src/components/chat/TypingIndicator.tsx` - Typing animation
- `src/components/chat/WelcomeMessage.tsx` - Welcome screen
- `src/components/chat/index.ts` - Exports

**Documentation:**
- `SABI_AI_README.md` - Complete documentation

### Files Modified

- `src/App.tsx` - Added ChatWidget
- `.env` - Added VITE_GEMINI_API_KEY
- `src/styles/globals.css` - Added chat animations

### Dependencies Installed

- `@google/generative-ai` - Google Gemini SDK

## 🎯 How to Use

### 1. Start Development Server

```bash
npm run dev
```

### 2. Open the App

Navigate to `http://localhost:5173` (or your Vite port)

### 3. Click SABI AI Button

Look for the floating button with the owl mascot in the bottom-right corner.

### 4. Start Chatting!

Try these sample queries:

**Find UMKM:**
- "Cari kopi enak"
- "Makanan budget 30rb"
- "Tempat makan di Sokaraja"
- "Batik bagus dimana?"

**Get Information:**
- "Warung Sate Pak Kumis buka jam berapa?"
- "Kopi Gunung Slamet ada WiFi ga?"
- "Nomor telepon Salon Cantik Ayu"

**General Queries:**
- "Ada yang buka sekarang?"
- "UMKM rating tertinggi"
- "Rekomendasi untuk makan malam"

## 🎨 Features Available

✅ Natural language UMKM search
✅ AI-powered recommendations (2-4 UMKM per query)
✅ Specific information queries (hours, contact, facilities)
✅ Quick reply suggestions
✅ UMKM cards with "Lihat Detail" button → navigates to detail page
✅ Typing indicator
✅ Welcome message with quick actions
✅ Session history (up to 50 messages)
✅ Rate limiting (20 messages per session)
✅ Dark mode support
✅ Responsive design (mobile + desktop)
✅ Smooth animations
✅ Error handling with retry
✅ Context-aware (remembers last 10 messages)

## 🔧 Configuration

### API Key (Already Set)
```env
VITE_GEMINI_API_KEY=AIzaSyByG0q-9fGTVFyd3dHZkU9kTKr2VzVnLG0
```

### Gemini Model Settings
- Model: `gemini-pro`
- Temperature: `0.7`
- Max Tokens: `500`
- Top P: `0.9`

### Rate Limits
- Max messages per session: `20`
- Warning at: `18 messages`
- Context window: `10 messages`
- Max stored messages: `50`

### Session Storage
- Key: `lokalku_chat_sabi`
- Clears on tab close

## 📱 Responsive Behavior

### Desktop (>768px)
- 400x600px chat window
- Bottom-right corner (20px margins)
- Rounded borders
- Shadow effects

### Mobile (<768px)
- Full screen overlay
- No rounded borders
- Optimized for touch

### Tablet
- 380x550px window
- Similar to desktop

## 🎭 UI Elements

### Chat Button
- **Icon**: SABI mascot (`/assets/images/maskot.png`)
- **Size**: 56x56px
- **Position**: Fixed bottom-right
- **Hover**: Scale + shadow effects
- **Badge**: Red notification dot (optional)

### Chat Window
- **Header**: Gradient (primary to orange) with SABI avatar + online status
- **Messages**: Scrollable area with auto-scroll to bottom
- **Input**: Rounded pill with Send button
- **Actions**: Minimize & close buttons

### Message Bubbles
- **User**: Right-aligned, gradient background
- **Bot**: Left-aligned, white/gray background
- **Timestamps**: Below each message
- **UMKM Cards**: Clickable, navigate to detail page

## 🧪 Testing Checklist

### Basic Functionality
- [ ] Chat button appears in bottom-right
- [ ] Click button opens chat window
- [ ] Welcome message displays
- [ ] Quick replies work
- [ ] Can type and send messages
- [ ] Bot responds with messages
- [ ] UMKM cards render correctly
- [ ] "Lihat Detail" button navigates to detail page
- [ ] Close button works
- [ ] Chat persists on page navigation
- [ ] Session storage saves history

### AI Responses
- [ ] "Cari kopi enak" returns coffee shops
- [ ] "Makanan budget 30rb" returns budget options
- [ ] "Warung Sate Pak Kumis buka jam berapa?" returns hours
- [ ] Understands category filters
- [ ] Understands location filters
- [ ] Returns max 4 UMKM cards
- [ ] Provides quick reply suggestions
- [ ] Handles unknown queries gracefully

### Error Handling
- [ ] Network error shows retry button
- [ ] Rate limit warning at 18 messages
- [ ] Rate limit block at 20 messages
- [ ] Timeout handling (10 seconds)
- [ ] Invalid API key error message

### Responsive Design
- [ ] Works on desktop (Chrome, Firefox, Safari)
- [ ] Works on mobile (iOS Safari, Chrome)
- [ ] Dark mode switches correctly
- [ ] Animations work smoothly
- [ ] Scrolling works in messages area
- [ ] Input field doesn't overflow

## 🐛 Troubleshooting

### Chat Button Not Appearing
1. Check if `ChatWidget` is imported in `App.tsx`
2. Check console for errors
3. Verify mascot image exists at `/public/assets/images/maskot.png`

### Bot Not Responding
1. Check `.env` has `VITE_GEMINI_API_KEY`
2. Restart dev server after adding env variable
3. Check Network tab for API calls
4. Verify API key is valid
5. Check console for errors

### UMKM Cards Not Showing
1. Verify `umkmData` is imported correctly
2. Check if Gemini returns JSON format
3. Look for parsing errors in console
4. Check UMKM IDs match database

### Styling Issues
1. Check `tailwind.config.js` includes Hero UI
2. Verify `globals.css` has custom animations
3. Clear browser cache
4. Check for CSS conflicts

## 📦 What Data is Used

### UMKM Database (`src/data/umkm-data.ts`)
- 8 UMKM entries with full details
- Categories: Makanan & Minuman, Fashion, Kafe & Resto, Kecantikan, Otomotif & Jasa
- Locations: Purwokerto (Utara, Selatan, Barat, Timur), Sokaraja, Banyumas, Cilongok
- Full details: hours, facilities, payments, products, services, images

### AI Context
- Full UMKM database injected into system prompt
- Last 10 messages for conversation context
- User location (placeholder - not yet implemented)

## 🚀 Next Steps

### Recommended Improvements
1. **Add User Location**: Geolocation API for "dekat saya" queries
2. **Real-time Status**: Update UMKM open/closed status dynamically
3. **Voice Input**: Speech recognition for hands-free queries
4. **Image Upload**: Visual search for products
5. **Multi-language**: Support English and Javanese
6. **Analytics**: Track popular queries and user behavior
7. **Feedback System**: Allow users to rate AI responses
8. **Push Notifications**: Notify about new UMKM or special offers

### Performance Optimizations
1. Lazy load chat components
2. Debounce API calls
3. Cache common queries
4. Compress images in UMKM cards
5. Optimize animation performance

## 📞 Support

For issues or questions:
1. Check `SABI_AI_README.md` for detailed documentation
2. Review console errors
3. Check Network tab for API failures
4. Verify environment variables

## 🎉 Success!

SABI AI is now fully integrated into LokalKu! The chatbot is ready to help users discover amazing local businesses in Banyumas & Purwokerto.

**Try it out and watch the magic happen! ✨🦉**

---

**Made with ❤️ for LokalKu UMKM Community**
