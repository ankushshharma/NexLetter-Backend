require('dotenv').config();
const express = require('express');
const app = express();
const { port } = require('./config/env');
const draftsRouter = require('./routes/drafts');
const cors = require('cors');
const config = require('./config/config');

app.use(cors(config.corsOptions));

app.use(express.json());
app.use('/api', draftsRouter);

app.listen(port, () => {
  console.log(`Assistant Dashboard backend running on port ${port}`);
});
