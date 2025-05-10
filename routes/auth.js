const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const { validateSignup, validateLogin } = require('../middlewares/validators');



if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing required Supabase environment variables');
}

// Initialize Supabase client with service role key for admin operations
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Initialize Supabase client with anon key for regular operations
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Signup endpoint
router.post('/signup', validateSignup, async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    // Sign up the user with Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (authError) throw authError;

    // Create user profile in profiles table using admin client
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          full_name: fullName,
          email: email,
          created_at: new Date().toISOString(),
        },
      ]);

    if (profileError) {
      console.error('Profile creation error:', profileError);
      throw profileError;
    }

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: authData.user.id,
        email: authData.user.email,
        fullName: authData.user.user_metadata.full_name,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Error during signup',
    });
  }
});

// Login endpoint
router.post('/login', validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Sign in the user with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError) throw profileError;

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: data.user.id,
        email: data.user.email,
        fullName: profile.full_name,
      },
      session: data.session,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({
      success: false,
      message: error.message || 'Invalid credentials',
    });
  }
});

// Logout endpoint
router.post('/logout', async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Error during logout',
    });
  }
});

// Get current user endpoint
router.get('/me', async (req, res) => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) throw error;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) throw profileError;

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: profile.full_name,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Error fetching user data',
    });
  }
});

module.exports = router; 