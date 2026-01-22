# 🎤 VoiceFlow - Text-to-Speech & PDF Reader

<div align="center">

**Transform text and PDFs into natural speech with a beautiful, modern interface**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Web Speech API](https://img.shields.io/badge/Web_Speech_API-4285F4?style=flat&logo=google&logoColor=white)
![PDF.js](https://img.shields.io/badge/PDF.js-FF0000?style=flat&logo=adobe&logoColor=white)

</div>

---

## ✨ Features

### 📄 PDF Support
- **Drag & Drop Upload** - Intuitive file upload interface
- **Multi-Page Extraction** - Automatically extracts text from all pages
- **PDF.js Integration** - Reliable text extraction using Mozilla's PDF.js library
- **Editable Output** - Review and edit extracted text before playback

### 🎙️ Advanced Text-to-Speech
- **Web Speech API** - Native browser speech synthesis
- **Voice Selection** - Choose from all available system voices
- **Speed Control** - Adjust speech rate from 0.5x to 2.0x
- **Pitch Control** - Modify voice pitch from 0.5 to 2.0
- **Volume Control** - Fine-tune audio output level
- **Real-Time Progress** - Visual progress bar with percentage and current word

### 🎮 Playback Controls
- **Play/Resume** - Start or resume speech synthesis
- **Pause** - Pause speech (resumable from same position)
- **Stop** - Stop and reset playback completely
- **Progress Tracking** - See exactly where you are in the text

### 🎨 Premium Design
- **Dark Mode** - Beautiful dark theme with vibrant accents
- **Glassmorphism** - Modern glass-like UI elements
- **Smooth Animations** - Polished micro-interactions throughout
- **Responsive Layout** - Works perfectly on desktop, tablet, and mobile
- **Gradient Backgrounds** - Animated gradient effects
- **Icon-Based UI** - Clean, minimalist interface

---

## 🚀 Quick Start

### Prerequisites
- A modern web browser (Chrome, Edge, Safari, or Firefox)
- No installation or dependencies required!

### Usage

1. **Clone or download the repository**
   ```bash
   git clone <repository-url>
   cd aryan_1
   ```

2. **Open the application**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Node.js (with http-server)
     npx http-server
     ```

3. **Start using VoiceFlow!**
   - Upload a PDF or enter text manually
   - Configure voice settings
   - Click Play and enjoy natural speech

---

## 📖 How to Use

### Method 1: Upload PDF

1. **Upload Your PDF**
   - Drag and drop a PDF file onto the upload area
   - Or click to browse and select a file
   
2. **Text Extraction**
   - App automatically extracts text from all pages
   - Extracted text appears in the editor

3. **Edit if Needed**
   - Review and modify the extracted text
   - Remove unwanted headers, footers, or formatting

4. **Configure & Play**
   - Select your preferred voice
   - Adjust speed, pitch, and volume
   - Click the Play button

### Method 2: Manual Text Entry

1. **Enter Text**
   - Click in the text editor area
   - Type or paste your text

2. **Customize Voice**
   - Choose a voice from the dropdown
   - Fine-tune speed and pitch controls

3. **Listen**
   - Press Play to start speech synthesis
   - Use Pause/Resume as needed
   - Stop to reset completely

---

## 🛠️ Technology Stack

### Core Technologies
- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with custom properties
- **Vanilla JavaScript** - No frameworks, pure JS

### APIs & Libraries
- **Web Speech API** - Built-in browser text-to-speech
- **PDF.js v3.11.174** - Mozilla's PDF rendering library (CDN)

### Design Techniques
- **CSS Custom Properties** - Maintainable design system
- **Glassmorphism** - backdrop-filter effects
- **CSS Grid & Flexbox** - Responsive layouts
- **CSS Animations** - Smooth transitions and effects

---

## 🎨 Design Philosophy

VoiceFlow is built with a focus on **premium aesthetics** and **user experience**:

### Visual Design
- **Dark Theme** - Reduces eye strain during extended use
- **Vibrant Accents** - Purple and cyan gradients for visual interest
- **Depth & Layers** - Glassmorphism creates a sense of depth
- **Smooth Motion** - All interactions feel fluid and responsive

### User Experience
- **Intuitive Interface** - Clear visual hierarchy and labeling
- **Instant Feedback** - Status messages and visual confirmations
- **Progressive Disclosure** - Features revealed as needed
- **Error Prevention** - Clear instructions and validation

---

## 📁 Project Structure

```
aryan_1/
├── index.html          # Main application structure
├── style.css          # Complete design system
├── app.js             # Core functionality
└── README.md          # This file
```

### File Breakdown

**index.html** (200+ lines)
- Semantic HTML5 structure
- SEO-optimized meta tags
- CDN imports for fonts and PDF.js
- Accessible UI components

**style.css** (600+ lines)
- CSS custom properties design system
- Glassmorphism effects
- Responsive grid layouts
- Smooth animations and transitions
- Mobile-first responsive design

**app.js** (400+ lines)
- Application state management
- PDF text extraction logic
- Speech synthesis integration
- Event handling and UI updates
- Progress tracking system

---

## 🎯 Key Features Explained

### PDF Text Extraction
```javascript
// Uses PDF.js to parse PDF files
- Reads PDF as ArrayBuffer
- Extracts text from each page
- Combines all pages with spacing
- Handles multi-page documents reliably
```

### Speech Synthesis
```javascript
// Web Speech API implementation
- Creates SpeechSynthesisUtterance
- Tracks boundary events for progress
- Supports all system-installed voices
- Real-time playback monitoring
```

### Progress Tracking
```javascript
// Character-level progress monitoring
- Tracks current character index
- Updates progress bar in real-time
- Highlights current word being spoken
- Displays percentage completion
```

---

## 🌐 Browser Support

| Browser | Text-to-Speech | PDF Upload | Glassmorphism |
|---------|---------------|------------|---------------|
| Chrome  | ✅ Full       | ✅ Yes     | ✅ Yes        |
| Edge    | ✅ Full       | ✅ Yes     | ✅ Yes        |
| Safari  | ✅ Full       | ✅ Yes     | ✅ Yes        |
| Firefox | ✅ Full       | ✅ Yes     | ✅ Yes        |

> **Note**: Available voices depend on your operating system. The app automatically detects and lists all available voices.

---

## 🎤 Voice Availability

### macOS
- Alex, Samantha, Victoria (built-in)
- Additional voices in System Preferences > Accessibility > Speech

### Windows
- Microsoft David, Zira, Mark (built-in)
- Additional voices in Settings > Time & Language > Speech

### Linux
- Depends on installed TTS engines
- eSpeak, Festival, or Google TTS

---

## 💡 Tips for Best Results

1. **Voice Selection**
   - Try different voices to find one you like
   - Natural voices sound better than robotic ones

2. **Speed Control**
   - 1.0x is natural speaking pace
   - 1.2x-1.5x is good for faster comprehension
   - 0.8x-0.9x is better for learning or difficult content

3. **PDF Quality**
   - Works best with text-based PDFs
   - Scanned PDFs (images) won't work without OCR
   - Remove unnecessary pages before upload

4. **Text Editing**
   - Edit out page numbers, headers, footers
   - Add punctuation for better pacing
   - Break long paragraphs for easier listening

---

## 🚧 Known Limitations

- **Scanned PDFs**: Cannot extract text from image-only PDFs
- **Voice Quality**: Depends on system-installed voices
- **File Size**: Very large PDFs may take time to process
- **Browser Limits**: Speech synthesis pauses after ~32,000 characters in some browsers

---

## 🔮 Future Enhancements

- [ ] Export speech to MP3/WAV audio files
- [ ] OCR support for scanned PDFs
- [ ] Cloud TTS integration (Google, Amazon Polly)
- [ ] Text highlighting during speech
- [ ] DOCX and TXT file support
- [ ] Keyboard shortcuts for controls
- [ ] Reading speed estimation
- [ ] Bookmarking for long documents
- [ ] Dark/light theme toggle
- [ ] Multiple language support

---

## 🤝 Contributing

This is a standalone project, but suggestions and improvements are welcome!

---

## 📄 License

This project is open source and available for personal and educational use.

---

## 🙏 Acknowledgments

- **PDF.js** - Mozilla Foundation
- **Web Speech API** - W3C Web Speech Community Group
- **Google Fonts** - Inter font family
- **Design Inspiration** - Modern web design trends

---

<div align="center">

**Built with ❤️ using vanilla HTML, CSS, and JavaScript**

*No frameworks. No build tools. Just pure web technologies.*

</div>
