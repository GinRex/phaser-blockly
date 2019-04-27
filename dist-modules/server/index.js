const express = require('express');
const os = require('os');
const fs = require('fs');
const fse = require('fs-extra');
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

const capitalize = s => s[0].toUpperCase() + s.slice(1);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/assets');
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  }
});
const upload = multer({ storage }).single('file');

app.post('/api/uploadImage', (req, res) => {
  upload(req, res, err => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    req.file.name = capitalize(path.parse(req.file.filename).name);

    // load image to loader
    try {
      const gameFile = `${__dirname}/../Game/Scenes/boot.jsx`;
      const gameData = fs.readFileSync(gameFile).toString().split('\n');
      const selectedSceneEnd = gameData.indexOf('    // launch scene start');
      gameData.splice(selectedSceneEnd, 0, `this.load.image('${req.file.name}', 'assets/${req.file.filename}');`);

      const text = gameData.join('\n');
      fs.writeFile(gameFile, text, err => {
        console.log(err);
      });
    } catch (err) {
      console.error(err);
    }

    // create object file
    const objectName = `${__dirname}/../Game/Classes/${req.file.name}`;
    fs.readFile(`${__dirname}/gameObjectTemplate.js`, 'utf8', (err, data) => {
      if (err) {
        return console.log(err);
      }
      const result = data.replace(/Name/g, req.file.name);
      fs.writeFile(`${objectName}.jsx`, result, 'utf8', err => {
        if (err) return console.log(err);
      });
    });
    // export all objects file to index
    const result = `export ${req.file.name} from './${req.file.name}';\n`;
    fs.appendFile(`${__dirname}/../Game/Classes/index.js`, result, 'utf8', err => {
      if (err) return console.log(err);
    });
    return res.status(200).send(req.file);
  });
});

app.post('/api/createGame', (req, res) => {
  GAME_NAME = req.body.game_name;
  console.log(GAME_NAME);
  // // create game foler
  // const folderName = `${__dirname}/../Game/${GAME_NAME}`;
  // try {
  //   if (!fs.existsSync(folderName)) {
  //     fs.mkdirSync(folderName);
  //   }
  // } catch (err) {
  //   console.error(err);
  // }
  // create scenes folder and default scene
  const scenesFolder = `${__dirname}/../Game/Scenes`;
  const classesFolder = `${__dirname}/../Game/Classes`;
  // const scenesFolder = `${__dirname}/../Game/${GAME_NAME}/Scenes`;
  try {
    fse.remove(scenesFolder, err => {
      fs.mkdir(scenesFolder, () => {
        // create boot scene
        try {
          const data = fs.readFileSync(`${__dirname}/bootTemplate.js`).toString();
          fs.writeFile(`${__dirname}/../Game/Scenes/boot.jsx`, data, err => {
            console.log(err);
          });
        } catch (err) {
          console.error(err);
        }
      });
    });
    if (fs.existsSync(classesFolder)) {
      fse.remove(classesFolder, err => {
        fs.mkdirSync(classesFolder);
        fs.writeFile(`${classesFolder}/index.js`, '', err => {
          console.log(err);
        });
      });
    } else fs.mkdirSync(classesFolder);
  } catch (err) {
    console.error(err);
  }

  // create game file
  try {
    const data = fs.readFileSync(`${__dirname}/gameTemplate.js`).toString();
    fs.writeFile(`${__dirname}/../Game/Game.jsx`, data, err => {
      console.log(err);
    });
  } catch (err) {
    console.error(err);
  }
  return res.status(200).send(GAME_NAME);
});

app.post('/api/createScene', (req, res) => {
  const scene = req.body;
  // create scenes folder and default scene
  const scenesFolder = `${__dirname}/../Game/Scenes`;
  try {
    if (!fs.existsSync(scenesFolder)) {
      fs.mkdirSync(scenesFolder);
    }
    const data = fs.readFileSync(`${__dirname}/sceneTemplate.js`).toString().replace(/SceneName/g, scene.name);
    fs.writeFile(`${scenesFolder}/${scene.name}.jsx`, data, err => {
      console.log(err);
    });

    // import scene to game
    try {
      const gameFile = `${__dirname}/../Game/Game.jsx`;
      const gameData = fs.readFileSync(gameFile).toString().split('\n');
      const importIndex = gameData.indexOf("import 'phaser';");
      gameData.splice(importIndex + 1, 0, `import ${scene.name} from './Scenes/${scene.name}';`);
      const selectedSceneEnd = gameData.indexOf('    // scenes go here');
      gameData.splice(selectedSceneEnd, 0, `${scene.name},`);

      const text = gameData.join('\n');
      fs.writeFile(gameFile, text, err => {
        console.log(err);
      });
    } catch (err) {
      console.error(err);
    }

    // import scene to bootscene
    try {
      const gameFile = `${__dirname}/../Game/Scenes/boot.jsx`;
      const gameData = fs.readFileSync(gameFile).toString().split('\n');

      const selectedSceneStart = gameData.indexOf('    // launch scene start');
      const selectedSceneEnd = gameData.indexOf('    // launch scene end');
      gameData.splice(selectedSceneStart + 1, selectedSceneEnd - selectedSceneStart - 1, `this.scene.start('${scene.name}');
        `);

      const text = gameData.join('\n');
      fs.writeFile(gameFile, text, err => {
        console.log(err);
      });
    } catch (err) {
      console.error(err);
    }
  } catch (err) {
    console.error(err);
  }
  return res.status(200).send(scene);
});

app.post('/api/selectScene', (req, res) => {
  const sceneName = req.body.index;
  // import scene to config
  try {
    const gameFile = `${__dirname}/../Game/Scenes/boot.jsx`;
    const gameData = fs.readFileSync(gameFile).toString().split('\n');

    const selectedSceneStart = gameData.indexOf('    // launch scene start');
    const selectedSceneEnd = gameData.indexOf('    // launch scene end');
    gameData.splice(selectedSceneStart + 1, selectedSceneEnd - selectedSceneStart - 1, `this.load.on('progress', (value) => {
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(width / 4, height / 2, (width / 2) * value, height / 12);
      });
      this.load.on('fileprogress', (file) => {
        console.log(file.src);
      });
      this.load.on('complete', () => {
        this.scene.start('${sceneName}');
      });`);

    const text = gameData.join('\n');
    fs.writeFile(gameFile, text, err => {
      console.log(err);
    });
  } catch (err) {
    console.error(err);
  }
  return res.status(200).send(sceneName);
});

// need to reimplement this for when create object from class-block
app.post('/api/importToScene', (req, res) => {
  const { scene } = req.body;
  // import to main
  const mainfile = `${__dirname}/../Game/scenes/${scene.name}.jsx`;
  try {
    const data = fs.readFileSync(mainfile).toString().split('\n');
    const importIndex = data.indexOf("import 'phaser';");
    data.splice(importIndex + 1, 0, `import ${req.file.name} from '../${req.file.name}';`);
    const preloadIndex = data.indexOf('    // preload image here');
    data.splice(preloadIndex, 0, `this.load.image('${req.file.name}', 'assets/${req.file.filename}');`);

    const createIndex = data.indexOf('    // create object here');
    data.splice(createIndex, 0, `this.${req.file.name} = new ${req.file.name}({
        scene: this,
        key: '${req.file.name}',
        x: 200,
        y: 200,
        width: 100,
        height: 100,
      });`);

    const updateIndex = data.indexOf('    // update here');
    data.splice(updateIndex, 0, `this.${req.file.name}.update();`);
    const text = data.join('\n');
    fs.writeFile(`${mainfile}`, text, err => {
      console.log(err);
    });
  } catch (err) {
    console.error(err);
  }
});

app.post('/api/updateCode', (req, res) => {
  req.body.map(object => {
    const objectName = `${__dirname}/../Game/Classes/${object.name}.jsx`;
    try {
      const data = fs.readFileSync(objectName).toString().split('\n');
      const updateEndIndex = data.indexOf('    // update here');
      const updateStartIndex = data.indexOf('  update(cursors) {');
      data.splice(updateStartIndex + 1, updateEndIndex - updateStartIndex - 1, object.jsCode);
      const text = data.join('\n');
      fs.writeFile(`${objectName}`, text, err => {
        console.log(err);
      });
    } catch (err) {
      console.error(err);
    }
  });
  return res.status(200).send({});
  // const gameObjects = req.data.gameObjects
});

app.post('/api/updateSceneCode', (req, res) => {
  req.body.map(scene => {
    const sceneName = `${__dirname}/../Game/Scenes/${scene.name}.jsx`;
    try {
      const data = fs.readFileSync(sceneName).toString().split('\n');
      const updateEndIndex = data.indexOf('  // game state end');
      const updateStartIndex = data.indexOf('  // game state start');
      data.splice(updateStartIndex + 1, updateEndIndex - updateStartIndex - 1, scene.jsCode);
      const text = data.join('\n');
      fs.writeFile(`${sceneName}`, text, err => {
        console.log(err);
      });
    } catch (err) {
      console.error(err);
    }
  });
  return res.status(200).send({});
  // const gameObjects = req.data.gameObjects
});

app.post('/api/createGameObject', (req, res) => {});
app.listen(8080, () => console.log('Listening on port 8080!'));