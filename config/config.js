// Environment variables configuration
require('dotenv').config();

// Use CommonJS export syntax
module.exports = {
  // Server configuration
  port: process.env.PORT || 3000,
  
  // Supabase configuration
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    table: 'drafts'
  },
  
  // Gemini API configuration
  gemini: {
    apiKey: process.env.GEMINI_API_KEY
  },
  
  // CORS configuration
  cors: {
    origin: process.env.CORS_ORIGIN || '*', // Allow all origins by default
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }
};