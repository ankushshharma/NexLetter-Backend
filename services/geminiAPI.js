const axios = require('axios');
const { GEMINI_API_KEY } = process.env;

require('dotenv').config();

async function generateDrafts(position, company, url, description, contentType) {
  // Validate contentType
  const validTypes = ['linkedinMessage', 'email', 'coverLetter'];
  if (!validTypes.includes(contentType)) {
    throw new Error('Invalid content type. Must be one of: linkedinMessage, email, coverLetter');
  }

  const prompt = `
You are a professional job application assistant. Create a ${contentType} based on the following job details:

JOB DETAILS:
- Position: ${position}
- Company: ${company}
- Job URL: ${url}
- Description: ${description}

GUIDELINES:
1. Write in a professional, confident, yet friendly tone
2. Keep the content concise and impactful
3. Highlight relevant qualifications and enthusiasm for the role
4. Include the Job URL/ID in referral messages
5. For LinkedIn messages, keep them under 300 characters
6. For emails, include clear subject line and professional greeting
7. For cover letters, focus on specific job requirements and company values

FORMAT REQUIREMENTS:
- Return response in JSON format with these exact keys: linkedinMessage, email, coverLetter
- Include ONLY the requested content type (${contentType})
- Do not include any markdown or code formatting
- For email, include "Subject:" line at the beginning
- Keep LinkedIn messages brief and networking-focused
- Ensure cover letters are properly structured with date and contact info

YOUR RESPONSE SHOULD BE VALID JSON WITH NO ADDITIONAL TEXT OR FORMATTING.`;

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  const body = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ]
  };

  try {
    const response = await axios.post(apiUrl, body, {
      headers: { 'Content-Type': 'application/json' }
    });

    // Gemini API returns the content inside `candidates[0].content.parts[0].text`
    let text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error('No content returned from Gemini');

    // Clean up the response if it contains markdown code block markers
    text = text.replace(/```json\s*/g, '')
               .replace(/\s*```\s*/g, '')
               .trim();

    // Try parsing JSON-like response
    const parsed = JSON.parse(text);

    // Only return the requested content type
    const result = {};
    result[contentType] = parsed[contentType];
    
    return result;
  } catch (error) {
    console.error('Gemini API error:', error.response?.data || error.message);
    throw new Error('Failed to generate drafts');
  }
}

module.exports = { generateDrafts };