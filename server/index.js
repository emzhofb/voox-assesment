const express = require('express');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

const readJSON = fs.readFileSync('./data.json');
let data = JSON.parse(readJSON);

app.get('/', (req, res, next) => {
  const { priority, label } = req.query;
  let returnedData = [...data];
  
  if (priority) {
    returnedData = returnedData.filter((v, i) => {
      return v.priority === priority.toLocaleLowerCase();
    });  
  }
  if (label) {
    returnedData = returnedData.filter((v, i) => {
      return v.label === label.toLocaleLowerCase();
    });  
  }
  
  res.status(200).json({
    data: returnedData
  });
});

app.listen(port, () => {
  console.log('listening on port', port);
});
