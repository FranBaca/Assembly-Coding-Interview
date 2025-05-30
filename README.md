# Assembly Code Interview

A modern web application that allows users to search and explore high-quality photos using the Pexels API. Built with React, TypeScript, tRPC, and Express.

## Features

- 🔍 Real-time photo search
- 🖼️ Responsive photo grid layout
- ♾️ Infinite scroll pagination
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast and efficient API calls with tRPC
- 📱 Mobile-friendly design
- 🔄 Real-time search with debouncing
- 🖼️ Photo detail view with download options

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- tRPC Client
- React Query
- Framer Motion
- React Router

### Backend
- Node.js
- Express
- TypeScript
- tRPC Server
- Pexels API
- Zod (Schema validation)

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Pexels API key (Get it from [Pexels API](https://www.pexels.com/api/))

## Project Structure

```
assembly-code-interview/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── pages/        # Page components
│   │   ├── types/        # TypeScript types
│   │   └── utils/        # Utility functions
│   └── ...
└── server/                # Backend application
    ├── src/
    │   └── index.ts      # Server entry point
    └── ...
```

## Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd assembly-code-interview
```

### 2. Set up the server
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
PORT=3000
PEXELS_API_KEY=your_pexels_api_key_here
```

### 3. Set up the client
```bash
cd ../client
npm install
```

### 4. Start development servers

In the server directory:
```bash
npm run dev
```

In the client directory:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3000/trpc

## Environment Variables

### Server (.env)
```
PORT=3000
PEXELS_API_KEY=your_pexels_api_key_here
```

### Client (.env)
```
VITE_API_URL=your_server_url_here
```


## Acknowledgments

- [Pexels API](https://www.pexels.com/api/) for providing the photo data
- [Vercel](https://vercel.com) for hosting
- All the amazing open-source libraries used in this project
