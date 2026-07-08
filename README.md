# InterviewCraft 🚀

**AI-Powered Interview Practice Platform**

InterviewCraft is a modern, full-stack application that helps developers practice technical interviews with AI-generated questions and instant feedback. Built with Next.js 15, NestJS, and OpenAI's GPT models.

## ✨ Features

### 🎯 **Smart Interview Practice**
- **Role-based Questions**: Tailored questions for Frontend, Backend, Full-Stack, Mobile, DevOps, Data Science, QA, UI/UX, Cybersecurity, Product, HR, and Sales roles
- **Experience Level Targeting**: Questions adapted for Fresher (0-1 years), Junior (1-3 years), Mid-level (3-6 years), and Senior (6+ years) developers
- **Topic-specific Practice**: Deep dive into specific technologies like React, Node.js, Python, System Design, etc.

### 🤖 **AI-Powered Intelligence**
- **Dynamic Question Generation**: 15 unique, context-aware questions per session
- **Instant Feedback**: Real-time scoring and detailed feedback for each answer
- **Comprehensive Analysis**: Strengths identification, improvement areas, and overall performance summary
- **Question-by-Question Review**: Detailed breakdown of each response with actionable insights

### 🎨 **Modern User Experience**
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Progress Tracking**: Visual progress indicators and session management
- **Reload Protection**: Prevents accidental data loss during practice sessions
- **Dark/Light Theme**: Automatic theme switching based on system preferences

## 🏗️ Architecture

### **Frontend (Client)**
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4 with custom design system
- **Language**: TypeScript for type safety
- **State Management**: React hooks and context
- **Fonts**: Geist Sans & Geist Mono for optimal readability

### **Backend (Server)**
- **Framework**: NestJS with TypeScript
- **AI Integration**: OpenAI GPT-4o-mini for question generation and evaluation
- **Validation**: Class-validator for request validation
- **Security**: Helmet for security headers, Throttler for rate limiting
- **Environment**: Joi for environment variable validation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ashwaniMaddheshiya/interviewcraft.git
   cd interviewcraft
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Environment Setup**
   
   Create `.env` file in the server directory:
   ```env
   GEMINI_API_KEY=<Api Key>
   GEMINI_MODEL=gemini-2.5-flash
   PORT=4000
   ```

4. **Start the development servers**
   
   **Terminal 1 - Backend:**
   ```bash
   cd server
   npm run start:dev
   ```
   
   **Terminal 2 - Frontend:**
   ```bash
   cd client
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000

## 📁 Project Structure

```
newProj/
├── client/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   │   ├── page.tsx   # Home page
│   │   │   ├── roles/     # Role selection page
│   │   │   ├── topics/    # Topic selection pages
│   │   │   └── practice/  # Practice session page
│   │   ├── components/    # React components
│   │   │   ├── layout/    # Header, Footer
│   │   │   ├── practice/  # Practice session components
│   │   │   ├── topics/    # Topic selection components
│   │   │   └── ui/        # Reusable UI components
│   │   ├── lib/           # API client and utilities
│   │   └── data/          # Static data (topics.json)
│   ├── public/            # Static assets
│   └── package.json
├── server/                # NestJS backend application
│   ├── src/
│   │   ├── ai/           # AI service integration
│   │   ├── interviews/   # Interview logic and endpoints
│   │   ├── health/       # Health check endpoints
│   │   └── config/       # Configuration and validation
│   ├── test/             # E2E tests
│   └── package.json
└── README.md
```

## 🎯 Usage Guide

### **1. Select Your Role**
Choose from 12 different roles including Frontend, Backend, Full-Stack, Mobile, DevOps, Data Science, QA, UI/UX, Cybersecurity, Product, HR, and Sales.

### **2. Pick a Topic**
Select specific technologies or areas to focus on:
- **Frontend**: HTML/CSS, JavaScript, React, Next.js, Vue.js, Angular
- **Backend**: Node.js, NestJS, Python, Java, Databases, API Design
- **Full-Stack**: System Architecture, Microservices, Caching, etc.

### **3. Choose Experience Level**
- **Fresher**: 0-1 years of experience
- **Junior**: 1-3 years of experience  
- **Mid-level**: 3-6 years of experience
- **Senior**: 6+ years of experience

### **4. Practice Session**
- Answer 15 tailored questions
- Get real-time progress tracking
- Submit answers and receive instant AI feedback

### **5. Review Results**
- View your overall score (0-10 scale)
- Read detailed feedback for each question
- Identify strengths and areas for improvement
- Get actionable recommendations

## 🛠️ Development

### **Available Scripts**

**Client (Frontend):**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

**Server (Backend):**
```bash
npm run start:dev    # Start development server with hot reload
npm run start:debug  # Start with debugging enabled
npm run build        # Build for production
npm run start:prod   # Start production server
npm run lint         # Run ESLint
npm run test         # Run unit tests
npm run test:e2e     # Run e2e tests
```

### **Code Quality**
- **TypeScript**: Full type safety across the application
- **ESLint**: Code linting and formatting
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: WCAG compliant components and interactions

## 🚀 Deployment

### **Production Build**
```bash
# Build both applications
cd server && npm run build
cd ../client && npm run build
```

### **Environment Variables**
Ensure the following environment variables are set in production:
```env
OPENAI_API_KEY=your_production_openai_key
OPENAI_MODEL=gpt-4o-mini
PORT=4000
NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- **OpenAI** for providing the AI capabilities
- **Next.js** team for the amazing React framework
- **NestJS** team for the robust Node.js framework
- **Tailwind CSS** for the utility-first CSS framework
- **Vercel** for the deployment platform

---

**Built with ❤️ for developers, by [Ashwani Maddheshiya](https://www.linkedin.com/in/ashwaniMaddheshiya/)**

*Practice makes perfect. Start your interview journey with InterviewCraft today!*
