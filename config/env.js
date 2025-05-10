require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  geminiApiUrl: process.env.GEMINI_API_URL,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_KEY,
};
