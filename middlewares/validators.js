const validateSignup = (req, res, next) => {
  const { email, password, fullName } = req.body;

  // Check if all required fields are present
  if (!email || !password || !fullName) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required',
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format',
    });
  }

  // Validate password strength
  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 8 characters long',
    });
  }

  // Validate full name
  if (fullName.length < 2) {
    return res.status(400).json({
      success: false,
      message: 'Full name must be at least 2 characters long',
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  // Check if all required fields are present
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required',
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format',
    });
  }

  next();
};

module.exports = {
  validateSignup,
  validateLogin,
}; 