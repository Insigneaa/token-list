# NEUROX - Neural Network 3D Experience

## Overview

NEUROX is a futuristic Web3 application that combines immersive 3D neural network visualization with blockchain technology. The project presents a decentralized AI platform featuring interactive 3D brain models, MetaMask wallet integration, and highly interactive neural network analytics. Built as a modern single-page application, it showcases cutting-edge technologies including Three.js for 3D rendering, React for the frontend, Express for the backend, and comprehensive Web3 functionality. The application features an extensive interactive dashboard with real-time neural network controls, system monitoring, and advanced neural pattern detection.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side is built with **React 18** and **TypeScript**, utilizing a component-based architecture with modern React patterns. The application uses **Vite** as the build tool for fast development and optimized production builds. State management is handled through **TanStack React Query** for server state and React hooks for local state.

The UI framework leverages **Radix UI** primitives with **shadcn/ui** components, providing accessible and customizable interface elements. Styling is implemented with **Tailwind CSS** using a custom design system featuring neon color schemes and glassmorphism effects appropriate for the futuristic theme.

**Key Frontend Design Decisions:**
- **3D Rendering**: Three.js integration for immersive neural network visualizations with WebGL optimization
- **Routing**: Wouter for lightweight client-side routing
- **Component Structure**: Modular sections (Hero, Features, Analytics, CTA) for maintainability
- **Interactive Dashboard**: Five-tab system with real-time neural controls and system monitoring
- **Responsive Design**: Mobile-first approach with custom breakpoints
- **Navigation**: Integrated glass-effect navigation bar within hero section

### Backend Architecture
The server is built with **Express.js** and **TypeScript**, following a minimalist API design. The architecture implements a simple REST API pattern with middleware for request logging and error handling.

**Current Backend Features:**
- Neural network statistics API endpoint with simulated real-time data
- Health check endpoint for monitoring
- Static file serving for the built frontend
- Development-specific Vite integration for hot reloading

**Storage Layer**: Currently implements an in-memory storage pattern with interfaces designed for easy migration to persistent databases. The storage abstraction supports user management operations through a clean repository pattern.

### Data Storage Solutions
The application is configured for **PostgreSQL** with **Drizzle ORM** as the database toolkit. The schema defines a basic user table with UUID primary keys and unique username constraints.

**Database Configuration:**
- **Migration System**: Drizzle Kit for schema migrations
- **Connection**: Neon Database serverless PostgreSQL
- **Type Safety**: Full TypeScript integration with Drizzle's type inference

### Authentication and Authorization
The application implements **Web3 authentication** through MetaMask integration. Users connect their Ethereum wallets for identity verification and blockchain interactions.

**Web3 Features:**
- MetaMask connection detection and installation prompts
- Wallet address display and management
- Secure disconnect functionality
- Error handling for connection failures

### UI/UX Architecture
The design system implements a **dark futuristic theme** with neon color schemes:
- **Typography**: Orbitron font for headings (sci-fi aesthetic), Inter for body text
- **Color Palette**: Neon cyan, purple, green, and gold with transparency effects
- **Visual Effects**: CSS animations, glassmorphism, particle systems, and scrolling data streams
- **Interactive Elements**: Real-time system controls, neural network boosters, and progress indicators
- **Responsive Breakpoints**: Custom mobile-first responsive design

### Interactive Dashboard Features
The Neural Dashboard includes five comprehensive tabs:
1. **Visão Geral**: System overview with key metrics and performance indicators
2. **Métricas**: Detailed network statistics with real-time monitoring
3. **Atividade**: Network activity logs and system events
4. **Neural**: Interactive neural network controls with boost functions and pattern detection
5. **Controle**: System control panel with optimization tools and advanced settings

**Interactive Controls:**
- Neural boost buttons for increasing neuron activity and synaptic connections
- System optimization controls for power, efficiency, and latency management
- Auto-optimization toggles and continuous monitoring features
- Real-time data stream visualization with scrolling neural packet information
- Pattern detection display showing various AI processing capabilities

## External Dependencies

### Core Frontend Libraries
- **React Ecosystem**: React 18, React DOM, TypeScript
- **Build Tools**: Vite with React plugin, esbuild for production builds
- **3D Graphics**: Three.js for WebGL-based neural network visualizations
- **UI Components**: Radix UI primitives, shadcn/ui component library
- **Styling**: Tailwind CSS with PostCSS and Autoprefixer

### Backend Dependencies
- **Server Framework**: Express.js with TypeScript support
- **Database**: Drizzle ORM with PostgreSQL dialect
- **Development**: tsx for TypeScript execution, Vite middleware for development

### Web3 Integration
- **Wallet Connection**: Native MetaMask integration through window.ethereum API
- **Blockchain Support**: Ethereum-compatible networks

### Database and Storage
- **Database**: Neon Database (serverless PostgreSQL)
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Session Storage**: connect-pg-simple for PostgreSQL session store

### UI and Styling Dependencies
- **Component Library**: Comprehensive Radix UI component set
- **Icons**: Lucide React icons, React Icons for social media
- **Animations**: Class Variance Authority for component variants
- **Utilities**: clsx and tailwind-merge for conditional styling

### Development and Build Tools
- **TypeScript**: Full type checking across frontend and backend
- **Replit Integration**: Replit-specific plugins for development environment
- **Code Quality**: ESM module support, strict TypeScript configuration