const express = require('express');
const os = require('os');
const fs = require('fs');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: 'false' }));
app.use(bodyParser.json());

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.post('/api/createGame', (req, res) => {
  // create game foler
  const folderName = `${__dirname}/../client/Game/${req.body.game_name}`;
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
  } catch (err) {
    console.error(err);
  }
  // create scenes folder and default scene
  const scenesFolder = `${__dirname}/../client/Game/${req.body.game_name}/Scenes`;
  try {
    if (!fs.existsSync(scenesFolder)) {
      fs.mkdirSync(scenesFolder);
    }
    const data = fs.readFileSync(`${__dirname}/mainTemplate.js`).toString();
    fs.writeFile(`${scenesFolder}/Main.jsx`, data, (err) => {
      console.log(err);
    });
  } catch (err) {
    console.error(err);
  }

  // create game file
  try {
    const data = fs
      .readFileSync(`${__dirname}/gameTemplate.js`)
      .toString()
      .split('\n');
    data.splice(9, 1, `width: ${req.body.width},`);
    data.splice(10, 1, `height: ${req.body.height},`);
    const text = data.join('\n');
    fs.writeFile(`${folderName}/Game.jsx`, text, (err) => {
      console.log(err);
    });
  } catch (err) {
    console.error(err);
  }
});

app.post('/api/createGame', (req, res) => {});
app.listen(8080, () => console.log('Listening on port 8080!'));
