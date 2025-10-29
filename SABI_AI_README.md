# SABI AI (Sahabat Bisnis) - LokalKu AI Chatbot

![SABI AI](./public/assets/images/maskot.png)

## 🤖 Overview

SABI AI is an intelligent chatbot assistant for LokalKu UMKM directory, powered by Google Gemini API. It helps users discover and learn about local businesses (UMKM) in Banyumas & Purwokerto area through natural language conversations.

## ✨ Features

### 🎯 Core Capabilities

1. **UMKM Recommendations**
   - Natural language queries: "cari kopi enak", "makanan budget 30rb", "tempat makan dekat saya"
   - Returns 2-4 relevant UMKM with reasoning
   - Filters by category, location, price range, and status

2. **Information Assistant**
   - Answers specific UMKM questions
   - Operating hours: "Warung Sate Pak Kumis buka jam berapa?"
   - Facilities: "ada parkir ga?"
   - Payment methods: "bisa bayar QRIS?"
   - Contact information: "nomor telepon berapa?"

3. **Smart Context Awareness**
   - Remembers last 10 messages for context
   - Understands follow-up questions
   - Provides relevant quick reply suggestions

4. **Feedback Handler**
   - Accepts user corrections: "info jam buka salah"
   - Logs feedback for improvements
   - Thanks users for their input

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **UI Library**: Hero UI (Tailwind CSS based)
- **AI Model**: Google Gemini Pro
- **Icons**: Lucide React
- **Styling**: Tailwind CSS
- **State**: Custom React hooks

### Project Structure

```
src/
├── components/chat/
│   ├── ChatWidget.tsx          # Main orchestrator component
│   ├── ChatButton.tsx          # Floating action button
│   ├── ChatWindow.tsx          # Chat container
│   ├── ChatHeader.tsx          # Header with SABI branding
│   ├── ChatMessages.tsx        # Messages list container
│   ├── MessageBubble.tsx       # Individual message component
│   ├── UMKMCard.tsx           # UMKM card in chat
│   ├── ChatInput.tsx          # Message input field
│   ├── QuickReplies.tsx       # Quick reply buttons
│   ├── TypingIndicator.tsx    # Typing animation
│   ├── WelcomeMessage.tsx     # Initial greeting
│   └── index.ts               # Exports
├── hooks/
│   ├── useChat.ts             # Chat state management
│   └── useGemini.ts           # AI integration hook
├── services/
│   └── gemini.service.ts      # Gemini API service
├── types/
│   └── chat.types.ts          # TypeScript interfaces
└── data/
    └── umkm-data.ts           # UMKM database (imported)
```

## 🚀 Getting Started

### Installation

The chatbot is already integrated into the LokalKu app. Just make sure the dependencies are installed:

```bash
npm install @google/generative-ai
```

### Environment Setup

Add your Gemini API key to `.env`:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

### Usage

The chatbot is automatically available on all pages via the floating button in the bottom-right corner.

```tsx
import ChatWidget from "@/components/chat/ChatWidget";

function App() {
  return (
    <>
      {/* Your app content */}
      <ChatWidget />
    </>
  );
}
```

## 🎨 UI Components

### Floating Button
- **Size**: 56x56px circle
- **Position**: Fixed bottom-right (20px from edges)
- **Icon**: SABI mascot from `/assets/images/maskot.png`
- **Animation**: Scale on hover, pulse effect
- **Badge**: Red notification dot (optional)

### Chat Window
- **Desktop**: 400x600px, bottom-right corner, rounded
- **Mobile**: Full screen, no border radius
- **Animation**: Slide up + fade in
- **Background**: White/Dark mode adaptive

### Chat Header
- **Height**: 64px
- **Background**: Gradient (primary-600 to orange-500)
- **Content**: SABI avatar + name + online status
- **Actions**: Minimize & close buttons

### Messages
- **User**: Right-aligned, gradient background (primary to orange)
- **Bot**: Left-aligned, white/gray background
- **Avatar**: 32x32px SABI mascot
- **UMKM Cards**: Horizontal compact layout with image, info, and "Lihat Detail" button

## 💬 Conversation Examples

### Example 1: Finding Coffee Shops
```
User: Cari kopi enak di Purwokerto
SABI: ☕ Ini rekomendasi kopi enak di Purwokerto untuk Anda!

[Card: Kopi Gunung Slamet]
Rating: 4.6 ⭐
Location: Purwokerto Barat
Reason: Kopi arabika premium dari Gunung Slamet, tempat nyaman, WiFi gratis

Quick Replies: [Info jam buka] [Lihat menu] [Cari kafe lain]
```

### Example 2: Asking About Hours
```
User: Warung Sate Pak Kumis buka jam berapa?
SABI: Warung Sate Pak Kumis buka setiap hari! 🕐 
Senin-Kamis & Minggu: 10:00-22:00 WIB
Jumat-Sabtu: 10:00-23:00 WIB
Yuk mampir! 😊
```

### Example 3: Budget Search
```
User: Makanan murah budget 30rb
SABI: 💰 Ada beberapa pilihan enak dengan budget 30rb-an!

[Card: Getuk Goreng Bu Tini]
Rating: 4.7 ⭐
Reason: Getuk goreng dengan berbagai topping, harga mulai 15rb

[Card: Mendoan Cokro Kembang]
Rating: 4.9 ⭐
Reason: Mendoan khas Banyumas yang legendaris, paket lengkap 30rb

Quick Replies: [Info lokasi] [Lihat menu lain] [Cari kategori lain]
```

## 🔧 Configuration

### Gemini Settings
```typescript
{
  model: "gemini-pro",
  temperature: 0.7,
  maxOutputTokens: 500,
  topP: 0.9
}
```

### Rate Limiting
- **Max messages**: 20 per session
- **Warning**: At 18 messages
- **Block**: At 20 messages
- **Reset**: Refresh page or clear sessionStorage

### Session Storage
- **Key**: `lokalku_chat_sabi`
- **Max messages stored**: 50
- **Context window**: Last 10 messages sent to AI

## 🎯 AI System Prompt

The AI is configured with a comprehensive system prompt that includes:
- Role definition as "Sahabat Bisnis"
- Communication style (friendly, helpful, Bahasa Indonesia)
- Task guidelines (recommendations, info queries, feedback)
- Response format (JSON for UMKM cards, text for general queries)
- Full UMKM database injected as context
- Example conversations for few-shot learning

## 📱 Responsive Design

### Desktop (>768px)
- 400x600px window
- 20px from bottom-right
- Rounded corners (16px)
- Shadow effects

### Mobile (<768px)
- Full screen overlay
- No border radius
- Back button in header
- Optimized touch targets

### Tablet
- 380x550px window
- Slightly smaller than desktop

## 🔐 Security & Privacy

- API key stored in environment variables (never exposed to client)
- No personal data collected
- Chat history stored in sessionStorage (cleared on tab close)
- No server-side logging of conversations
- UMKM data is public information

## 🚦 Error Handling

### Network Errors
- Retry button displayed
- User-friendly error messages
- Timeout after 10 seconds

### API Quota
- "SABI sedang istirahat" message
- Suggestion to try again later

### Rate Limiting
- Warning at 18 messages
- Block at 20 messages
- Clear instructions to refresh

## 🎭 Animations

### Keyframes
```css
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
```

### Classes
- `.animate-slide-up` - Chat window entrance
- `.animate-bounce` - Typing indicator dots
- `.animate-pulse` - Online status, notification badge
- `.animate-ping` - Button ripple effect

## 🧪 Testing Queries

Try these sample queries to test SABI AI:

**Recommendations:**
- "Cari kopi enak di Purwokerto"
- "Makanan budget 30rb"
- "Tempat makan di Sokaraja"
- "Batik bagus dimana?"
- "Salon terdekat"

**Information:**
- "Warung Sate Pak Kumis buka jam berapa?"
- "Kopi Gunung Slamet ada WiFi ga?"
- "Batik Gumelem bisa bayar kartu kredit?"
- "Nomor telepon Salon Cantik Ayu"
- "Alamat Mendoan Cokro Kembang"

**General:**
- "Ada yang buka sekarang?"
- "UMKM rating tertinggi"
- "Rekomendasi untuk makan malam"
- "Info kontak"

## 🐛 Known Issues & Limitations

1. **Location-based search**: User location not yet implemented
2. **Real-time data**: UMKM status (open/closed) is static
3. **Image recognition**: Cannot process uploaded images
4. **Voice input**: Text-only for now
5. **Multi-language**: Currently Bahasa Indonesia only

## 🔮 Future Enhancements

- [ ] Voice input/output
- [ ] Image upload for visual search
- [ ] User location-based recommendations
- [ ] Real-time UMKM status updates
- [ ] Multi-language support (English, Javanese)
- [ ] Chat history sync across devices
- [ ] UMKM owner dashboard integration
- [ ] Analytics and insights
- [ ] Sentiment analysis for feedback
- [ ] Push notifications

## 📄 License

Part of LokalKu UMKM Directory Platform. All rights reserved.

## 🤝 Contributing

For bugs or feature requests, please contact the development team.

---

**Made with ❤️ for LokalKu UMKM Community**
