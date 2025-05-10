const { createClient } = require('@supabase/supabase-js');
const { supabaseUrl, supabaseKey } = require('../config/env');

const supabase = createClient(supabaseUrl, supabaseKey);

async function saveDraft(data) {
  const {
    position,
    company,
    url,
    description,
    linkedin_message,
    email,
    cover_letter
  } = data;

  const { error } = await supabase.from('drafts').insert([
    {
      position,
      company,
      url,
      description,
      linkedin_message,
      email,
      cover_letter
    }
  ]);

  if (error) throw error;
}


async function fetchDrafts() {
  const { data, error } = await supabase.from('drafts').select('*').order('created_at', { ascending: false });
  if (error) throw error;

  return data.map(row => ({
    ...row,
    linkedinMessage: row.linkedin_message,
    coverLetter: row.cover_letter
  }));
}


module.exports = { saveDraft, fetchDrafts };
