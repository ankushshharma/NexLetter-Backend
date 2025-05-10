module.exports = function (req, res, next) {
  const { position, company, url, description } = req.body;
  if (!position || !company || !url || !description) {
    return res.status(400).json({ success: false, error: 'All fields are required.' });
  }
  next();
};
