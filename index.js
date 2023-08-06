//052905062203

const express = require('express');
const app = express();
const PORT  = process.env.PORT || 3500;
const path = require('path');
const countries = require('./countries');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'getting-started.html'));
});

app.get('/countries', (req, res) => {
  res.json(countries);
});


app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/gifPic', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'imgs', '404_error_page.gif'));
});

app.get('/getingStartedImg', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'imgs', 'login-img.jpeg'));
});

app.get('/location', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dataPlace.html'))

})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '404_page.html'));
})

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));