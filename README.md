<p align="center">
  <img src="public/macbook.png" alt="Portfolio Logo" width="80" />
</p>

<h1 align="center">Nitin's macOS Portfolio</h1>

<p align="center">
  <strong>A stunning interactive portfolio website designed to look and feel like macOS</strong>
</p>

<p align="center">
  <a href="https://github.com/Sudo-N1t1n/MyPortfolio-MacOs-/stargazers"><img src="https://img.shields.io/github/stars/Sudo-N1t1n/MyPortfolio-MacOs-?style=social" alt="Stars"></a>
 

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-contact">Contact</a>
</p>

---

## ✨ Features

🖥️ **macOS-Inspired Desktop Interface**
- Authentic macOS Sequoia-style desktop with working Apple menu bar
- Fully functional dock with smooth hover animations
- Draggable, resizable windows with minimize/maximize controls

📁 **Interactive Applications**
- **Finder** - Browse through projects organized in folders
- **Safari** - View blog posts and articles
- **Photos** - Image gallery with lightbox viewer
- **Terminal** - Display skills and tech stack
- **Contact** - Send messages directly

🎨 **Premium UI/UX**
- Smooth GSAP-powered animations
- Dark mode toggle support
- Glassmorphism design elements
- Welcome screen with typewriter effect

📱 **Responsive Design**
- Optimized for all screen sizes
- Mobile-friendly interface

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 19, Vite 7, JavaScript |
| **Styling** | Tailwind CSS 4, Custom CSS |
| **Animation** | GSAP 3.13, @gsap/react |
| **Icons** | Lucide React |
| **Date Handling** | Day.js |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sudo-N1t1n/MyPortfolio-MacOs-.git
   cd MyPortfolio-MacOs-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📂 Project Structure

```
MyPortfolio/
├── public/
│   ├── icons/          # SVG icons for apps and UI
│   ├── images/         # Project images and gallery
│   ├── files/          # PDF and document files
│   └── resume.pdf      # Downloadable resume
├── src/
│   ├── apps/           # Application components
│   │   ├── Finder.jsx      # Portfolio/Projects browser
│   │   ├── Safari.jsx      # Blog posts viewer
│   │   ├── Photos.jsx      # Image gallery
│   │   ├── Terminal.jsx    # Skills showcase
│   │   ├── Contact.jsx     # Contact form
│   │   ├── Resume.jsx      # PDF viewer
│   │   ├── TextEditor.jsx  # Project details viewer
│   │   └── ImageViewer.jsx # Image lightbox
│   ├── components/     # Core UI components
│   │   ├── AppleMenuBar.jsx  # Top navigation bar
│   │   ├── Desktop.jsx       # Desktop with icons
│   │   ├── Dock.jsx          # Bottom dock bar
│   │   ├── Window.jsx        # Draggable window container
│   │   └── Welcome.jsx       # Intro animation screen
│   ├── constants/      # App configuration and data
│   ├── context/        # React context for state
│   ├── hooks/          # Custom React hooks
│   ├── App.jsx         # Main app component
│   └── index.css       # Global styles
└── package.json
```

---

## 🎯 Key Components

### Desktop Environment
The portfolio simulates a complete macOS desktop experience with:
- **Menu Bar** - Displays date/time, social links, and navigation
- **Dock** - Quick access to all applications with tooltip labels
- **Windows** - Fully interactive with drag, resize, and z-index management

### Applications
Each dock icon opens a unique "app" showcasing different portfolio sections:
- Projects are displayed as files in Finder
- Skills shown in a Terminal-style interface
- Blog articles presented in Safari-like browser

---

## 📬 Contact

**Nitin** 

<p>
  <a href="https://github.com/Sudo-N1t1n"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"></a>
  <a href="https://linkedin.com/in/nitinnotfound"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
</p>

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/Sudo-N1t1n">Nitin</a>
</p>
