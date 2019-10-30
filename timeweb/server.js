import 'dotenv/config';
import cors from 'cors';
import path from 'path';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`listening on 127.0.0.1:${PORT}`);
});
