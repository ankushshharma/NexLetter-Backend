/**
 * Format Gemini API response text into structured drafts
 * @param {string} responseText - Raw text response from Gemini API
 * @returns {Object} - Object containing linkedin message, email, and cover letter
 */
function formatGeminiResponse(responseText) {
    // Parse the sections from the response text
    const linkedinMatch = responseText.match(/LINKEDIN_MESSAGE:([\s\S]*?)(?=EMAIL:|$)/i);
    const emailMatch = responseText.match(/EMAIL:([\s\S]*?)(?=COVER_LETTER:|$)/i);
    const coverLetterMatch = responseText.match(/COVER_LETTER:([\s\S]*?)(?=$)/i);
  
    // Extract the content for each section
    const linkedinMessage = linkedinMatch ? linkedinMatch[1].trim() : 'No LinkedIn message generated.';
    const email = emailMatch ? emailMatch[1].trim() : 'No email generated.';
    const coverLetter = coverLetterMatch ? coverLetterMatch[1].trim() : 'No cover letter generated.';
  
    return {
      linkedinMessage,
      email,
      coverLetter
    };
  }
  
  module.exports = {
    formatGeminiResponse
  };