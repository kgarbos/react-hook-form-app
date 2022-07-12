const dotenv = require("dotenv");
dotenv.config({path: "./config.env"});
const path = require('path');
const express = require('express');
const routes = require('./routes/result');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
  
} else {
  app.get('/', (req, res) => {
    res.send("Api running");
  })
}

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
})