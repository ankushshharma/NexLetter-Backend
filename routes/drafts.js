const express = require('express');
const router = express.Router();
const { generateDrafts } = require('../services/geminiAPI');
const { saveDraft, fetchDrafts } = require('../services/supabase');
const validateInput = require('../middlewares/validateInput');

// POST /generate
// routes/drafts.js
router.post('/generate', async (req, res) => {
  const { position, company, url, description, contentType } = req.body;

  try {
    if (!contentType) {
      return res.status(400).json({ success: false, error: 'Missing contentType field' });
    }

    // console.log('[DEBUG] contentType:', contentType);

    const draft = await generateDrafts(position, company, url, description, contentType);

    res.json({ success: true, draft });
  } catch (error) {
    console.error('Gemini error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/generateAndSave', async (req, res) => {
  const { position, company, url, description, contentType } = req.body;

  try {
    const generated = await generateDrafts(position, company, url, description, contentType);

    // console.log('[DEBUG] Generated content:', generated); // 🔍 This is critical

    const flatDraft = {
      linkedin_message: contentType === 'linkedinMessage' ? generated[contentType] : null,
      email: contentType === 'email' ? generated[contentType] : null,
      cover_letter: contentType === 'coverLetter' ? generated[contentType] : null
    };

    await saveDraft({
      position,
      company,
      url,
      description,
      linkedin_message: contentType === 'linkedinMessage' ? generated[contentType] : null,
      email: contentType === 'email' ? generated[contentType] : null,
      cover_letter: contentType === 'coverLetter' ? generated[contentType] : null
    });
    
    

    res.json({ success: true, draft: flatDraft });

  } catch (error) {
    console.error('Gemini error:', error.message);
    res.status(500).json({ success: false, error: 'Failed to generate and save draft' });
  }
});




// POST /save
router.post('/save', async (req, res) => {
  try {
    const { position, company, url, description, drafts } = req.body;
    await saveDraft({ position, company, url, description, ...drafts });
    res.json({ success: true, message: 'Data saved successfully.' });
  } catch (error) {
    console.error('Supabase save error:', error.message);
    res.status(500).json({ success: false, error: 'Failed to save data' });
  }
});

// GET /fetch
router.get('/fetch', async (_, res) => {
  try {
    const data = await fetchDrafts();
    res.json({ success: true, data });
  } catch (error) {
    console.error('Supabase fetch error:', error.message);
    res.status(500).json({ success: false, error: 'Failed to fetch data' });
  }
});

module.exports = router;
