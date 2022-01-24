const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const readJSON = fs.readFileSync('./data.json');
let data = JSON.parse(readJSON);

app.get('/', (req, res, next) => {
  res.status(200).json({
    data: data
  });
});

app.listen(port, () => {
  console.log('listening on port', port);
});
