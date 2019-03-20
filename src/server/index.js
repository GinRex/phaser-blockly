const express = require('express');
const os = require('os');
const fs = require('fs');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: 'false' }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/assets');
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage }).single('file');
app.post('/api/uploadImage', (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    req.file.name = path.parse(req.file.filename).name;

    // create onject file
    const objectName = `${__dirname}/../client/Game/zelda/${req.file.name}`;
    const data = fs
      .readFileSync(`${__dirname}/gameObjectTemplate.js`)
      .toString()
      .split('\n');
    // data.splice(9, 1, `width: ${req.body.width},`);
    // data.splice(10, 1, `height: ${req.body.height},`);
    const text = data.join('\n');
    fs.writeFile(`${objectName}.jsx`, text, (err) => {
      console.log(err);
    });

    return res.status(200).send(req.file);
  });
});

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

app.post('/api/createGameObject', (req, res) => {});
app.listen(8080, () => console.log('Listening on port 8080!'));
