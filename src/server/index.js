const express = require('express');
const os = require('os');
const fs = require('fs');
const fse = require('fs-extra');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');

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
  },
});
const upload = multer({ storage }).single('file');

// const isDirectory = source => lstatSync(source).isDirectory();
const getDirecttories = source => readdirSync(source);
const getFilesFromDirectorie = source =>
  readdirSync(source);

app.post('/api/loadListGame', (req, res) => {
  const list = getDirecttories(`${__dirname}/games`);
  console.log(list);
  return res.status(200).send(list);
});

app.post('/api/saveGame', (req, res) => {
  const GAME_NAME = req.body.gameName;
  const gameData = req.body.data;
  const gameDir = `${__dirname}/games/${GAME_NAME}`;
  const gameRoot = `${__dirname}/../Game`;
  try {
    if (fs.existsSync(gameDir)) {
      fse.remove(gameDir, (err) => {
        fs.mkdirSync(gameDir);
        // copy game.jsx file
        fse.copySync(`${gameRoot}/Game.jsx`, `${gameDir}/Game.jsx`);
        // save localstorage data
        fs.writeFile(`${gameDir}/data.json`, gameData, (error) => {
          console.log(error);
        });
        // copy scenes and classes
        const scenesFolder = `${gameDir}/Scenes`;
        const classesFolder = `${gameDir}/Classes`;
        fs.mkdirSync(scenesFolder);
        fs.mkdirSync(classesFolder);

        const classes = getFilesFromDirectorie(`${gameRoot}/Classes`);
        classes.forEach((classFile) => {
          fse.copySync(`${gameRoot}/Classes/${classFile}`, `${classesFolder}/${classFile}`);
        });
        const scenes = getFilesFromDirectorie(`${gameRoot}/Scenes`);
        scenes.forEach((sceneFile) => {
          fse.copySync(`${gameRoot}/Scenes/${sceneFile}`, `${scenesFolder}/${sceneFile}`);
        });
      });
    } else fs.mkdirSync(gameDir);
  } catch (err) {
    console.log(err);
  }
  return res.status(200).send(req.file);
});

app.post('/api/loadGame', (req, res) => {
  const GAME_NAME = req.body.gameName;
  const gameRoot = `${__dirname}/games/${GAME_NAME}`;
  const gameDir = `${__dirname}/../Game`;
  try {
    if (fs.existsSync(gameDir)) {
      // copy game.jsx file
      fse.copySync(`${gameRoot}/Game.jsx`, `${gameDir}/Game.jsx`);
      // copy scenes and classes
      const scenesFolder = `${gameDir}/Scenes`;
      const classesFolder = `${gameDir}/Classes`;
      fse.remove(scenesFolder, (err) => {
        fs.mkdirSync(scenesFolder);
        const scenes = getFilesFromDirectorie(`${gameRoot}/Scenes`);
        scenes.forEach((sceneFile) => {
          fse.copySync(`${gameRoot}/Scenes/${sceneFile}`, `${scenesFolder}/${sceneFile}`);
        });
      });
      fse.remove(classesFolder, (err) => {
        fs.mkdirSync(classesFolder);
        const classes = getFilesFromDirectorie(`${gameRoot}/Classes`);
        classes.forEach((classFile) => {
          fse.copySync(`${gameRoot}/Classes/${classFile}`, `${classesFolder}/${classFile}`);
        });
      });
    } else fs.mkdirSync(gameDir);
  } catch (err) {
    console.log(err);
  }
  const gameData = fs
    .readFileSync(`${gameRoot}/data.json`)
    .toString();
  return res.status(200).send(gameData);
});

app.post('/api/addClass', (req, res) => {
  // if (!req.file) {
  //   return res.status(404).send('file not found');
  // }
  // req.body.name = capitalize(path.parse(req.file.filename).name);

  // create class file
  const objectName = `${__dirname}/../Game/Classes/${req.body.name}`;
  fs.readFile(`${__dirname}/gameObjectTemplate.js`, 'utf8', (error, data) => {
    if (error) {
      return console.log(err);
    }
    const result = data.replace(/Name/g, req.body.name);
    fs.writeFile(`${objectName}.jsx`, result, 'utf8', (e) => {
      if (e) return console.log(err);
    });
  });
  // export all objects file to index
  const result = `export ${req.body.name} from './${req.body.name}';\n`;
  fs.appendFile(`${__dirname}/../Game/Classes/index.js`, result, 'utf8', (err) => {
    if (err) return console.log(err);
  });
  return res.status(200).send(req.body.name);
});

app.post('/api/uploadImage', (req, res) => {
  console.log(req.file);
  // if (!req.file) {
  //   return res.status(404).send('file not found');
  // }
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    console.log(req.file);

    req.file.name = capitalize(path.parse(req.file.filename).name);
    // Load image to loader
    try {
      const gameFile = `${__dirname}/../Game/Scenes/boot.jsx`;
      const gameData = fs
        .readFileSync(gameFile)
        .toString()
        .split('\n');
      const selectedSceneEnd = gameData.indexOf('    // launch scene start');
      gameData.splice(
        selectedSceneEnd,
        0,
        `// load asset for ${req.file.filename}\nthis.load.image('${req.file.name}', 'assets/${
          req.file.filename
        }');`,
      );

      const text = gameData.join('\n');
      fs.writeFile(gameFile, text, (err) => {
        console.log(err);
      });
    } catch (err) {
      console.error(err);
    }
    return res.status(200).send(req.file);
  });
});

app.post('/api/uploadAudio', (req, res) => {
  // if (!req.file) {
  //   return res.status(404).send('file not found');
  // }
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    req.file.name = capitalize(path.parse(req.file.filename).name);
    // Load image to loader
    try {
      const gameFile = `${__dirname}/../Game/Scenes/boot.jsx`;
      const gameData = fs
        .readFileSync(gameFile)
        .toString()
        .split('\n');
      const selectedSceneEnd = gameData.indexOf('    // launch scene start');
      gameData.splice(
        selectedSceneEnd,
        0,
        `// load asset for ${req.file.filename}\nthis.load.audio('${req.file.name}', 'assets/${
          req.file.filename
        }');`,
      );

      const text = gameData.join('\n');
      fs.writeFile(gameFile, text, (err) => {
        console.log(err);
      });
    } catch (err) {
      console.error(err);
    }
    return res.status(200).send(req.file);
  });
});

app.post('/api/uploadJson', (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    console.log(req.body);

    req.file.name = capitalize(path.parse(req.file.filename).name);
    const rawData = JSON.parse(fs
      .readFileSync(req.file.path)
      .toString());

    let frames = [];
    if (rawData.frames) {
      if (rawData.frames.length) {
        frames = rawData.frames;
      } else {
        Object.entries(rawData.frames).map((frame) => {
          frame[1].filename = frame[0];
          frames.push(frame[1]);
        });
      }
    } else if (rawData.textures.length > 0) {
      frames = awData.texture[0].frames;
    }

    // load image to loader
    try {
      const gameFile = `${__dirname}/../Game/Scenes/boot.jsx`;
      const gameData = fs
        .readFileSync(gameFile)
        .toString()
        .split('\n');
      const selectedSceneEnd = gameData.indexOf(`// load asset for ${req.body.filename}`);
      gameData.splice(
        selectedSceneEnd + 1,
        1,
        `this.load.atlas('${req.file.name}', 'assets/${req.body.filename}', 'assets/${
          req.file.filename
        }');`,
      );

      const text = gameData.join('\n');
      fs.writeFile(gameFile, text, (err) => {
        console.log(err);
      });
    } catch (err) {
      console.error(err);
    }
    return res.status(200).send({ name: req.file.name, data: frames });
  });
});

app.post('/api/createAnimation', (req, res) => {
  const {
    key, frames, repeat, frameRate,
  } = req.body.animation;
  console.log(frames);
  try {
    const gameFile = `${__dirname}/../Game/Scenes/boot.jsx`;
    const gameData = fs
      .readFileSync(gameFile)
      .toString()
      .split('\n');
    const animationStart = gameData.indexOf('      // create animations');
    const replaceAnimationStart = gameData.indexOf(`// create animation for ${key}`);
    const replaceAnimationEnd = gameData.indexOf(`// end create animation for ${key}`);
    if (replaceAnimationStart !== -1) {
      console.log('no', replaceAnimationStart);
      gameData.splice(
        replaceAnimationStart + 1,
        replaceAnimationEnd - replaceAnimationStart - 1,
        `this.anims.create({
        key: '${key}',
        frames: ${JSON.stringify(frames)}, 
        frameRate: ${frameRate},
        repeat: ${repeat},
      });`,
      );
    } else {
      console.log('yes', animationStart);
      gameData.splice(
        animationStart + 1,
        0,
        `// create animation for ${key}
        this.anims.create({
        key: '${key}',
        frames: ${JSON.stringify(frames)}, 
        frameRate: ${frameRate},
        repeat: ${repeat},
      });\n// end create animation for ${key}`,
      );
    }

    const text = gameData.join('\n');
    fs.writeFile(gameFile, text, (err) => {
      console.log(err);
    });
  } catch (err) {
    console.error(err);
  }
  return res.status(200).send(req.body.animation);
});

app.post('/api/createGame', (req, res) => {
  const GAME_NAME = req.body.game_name;
  const width = req.body.width;
  const height = req.body.height;
  console.log(GAME_NAME);
  // create scenes folder and default scene
  const scenesFolder = `${__dirname}/../Game/Scenes`;
  const classesFolder = `${__dirname}/../Game/Classes`;
  // const scenesFolder = `${__dirname}/../Game/${GAME_NAME}/Scenes`;
  const gameDir = `${__dirname}/games/${GAME_NAME}`;
  try {
    if (fs.existsSync(gameDir)) {
      fse.remove(gameDir, (err) => {
        console.log('a', err);
        fs.mkdirSync(gameDir);
      });
    } else fs.mkdirSync(gameDir);
  } catch (err) {
    console.error(err);
  }
  try {
    fse.remove(scenesFolder, (err) => {
      fs.mkdir(scenesFolder, () => {
        // create boot scene
        try {
          const data = fs.readFileSync(`${__dirname}/bootTemplate.js`).toString();
          fs.writeFile(`${__dirname}/../Game/Scenes/boot.jsx`, data, (err) => {
            console.log(err);
          });
        } catch (err) {
          console.error(err);
        }
        const data = fs
          .readFileSync(`${__dirname}/sceneTemplate.js`)
          .toString()
          .replace(/SceneName/g, 'scene1');
        fs.writeFile(`${scenesFolder}/scene1.jsx`, data, (err) => {
          console.log(err);
        });
      });
    });
    if (fs.existsSync(classesFolder)) {
      fse.remove(classesFolder, (err) => {
        fs.mkdirSync(classesFolder);
        fs.writeFile(`${classesFolder}/index.js`, '', (err) => {
          console.log(err);
        });
      });
    } else fs.mkdirSync(classesFolder);
  } catch (err) {
    console.error(err);
  }

  // create game file
  try {
    // add imported files
    const keyData = fs.readFileSync(`${__dirname}/keyBoardInput.js`).toString();
    fs.writeFile(`${__dirname}/../Game/keyBoardInput.js`, keyData, (err) => {
      console.log(err);
    });
    const data = fs.readFileSync(`${__dirname}/gameTemplate.js`).toString().replace(/GAME_WIDTH/g, width).replace(/GAME_HEIGHT/g, height);
    fs.writeFile(`${__dirname}/../Game/Game.jsx`, data, (err) => {
      console.log(err);
    });
  } catch (err) {
    console.error(err);
  }
  return res.status(200).send(GAME_NAME);
});

app.post('/api/updateGameSetting', (req, res) => {
  const GAME_NAME = req.body.game_name;
  const width = req.body.width;
  const height = req.body.height;
  const gravity = req.body.gravity;
  const debug = req.body.debug;
  console.log(GAME_NAME);

  // update game file
  try {
    // add imported files
    const data = fs.readFileSync(`${__dirname}/../Game/Game.jsx`).toString().split('\n');
    const updateEndIndex = data.indexOf('  // game width and height end');
    const updateStartIndex = data.indexOf('  // game width and height start');
    data.splice(
      updateStartIndex + 1, updateEndIndex - updateStartIndex - 1,
      `width: ${width},
        height: ${height},`,
    );
    const gravityEndIndex = data.indexOf('        // game gravity end');
    const gravityStartIndex = data.indexOf('        // game gravity start');
    data.splice(
      gravityStartIndex + 1, gravityEndIndex - gravityStartIndex - 1,
      `y: ${gravity}`,
    );
    const debugEndIndex = data.indexOf('      // game debug end');
    const debugStartIndex = data.indexOf('      // game debug start');
    data.splice(
      debugStartIndex + 1, debugEndIndex - debugStartIndex - 1,
      `debug: ${debug},`,
    );
    const text = data.join('\n');
    fs.writeFile(`${__dirname}/../Game/Game.jsx`, text, (err) => {
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
    const data = fs
      .readFileSync(`${__dirname}/sceneTemplate.js`)
      .toString()
      .replace(/SceneName/g, scene.name);
    fs.writeFile(`${scenesFolder}/${scene.name}.jsx`, data, (err) => {
      console.log(err);
    });

    // import scene to game
    try {
      const gameFile = `${__dirname}/../Game/Game.jsx`;
      const gameData = fs
        .readFileSync(gameFile)
        .toString()
        .split('\n');
      const importIndex = gameData.indexOf("import 'phaser';");
      gameData.splice(importIndex + 1, 0, `import ${scene.name} from './Scenes/${scene.name}';`);
      const selectedSceneEnd = gameData.indexOf('    // scenes go here');
      gameData.splice(selectedSceneEnd, 0, `${scene.name},`);

      const text = gameData.join('\n');
      fs.writeFile(gameFile, text, (err) => {
        console.log(err);
      });
    } catch (err) {
      console.error(err);
    }

    // import scene to bootscene
    try {
      const gameFile = `${__dirname}/../Game/Scenes/boot.jsx`;
      const gameData = fs
        .readFileSync(gameFile)
        .toString()
        .split('\n');

      // fix this for first time init scene no scene is loaded
      // const selectedSceneStart = gameData.indexOf('    // launch scene start');
      // const selectedSceneEnd = gameData.indexOf('    // launch scene end');
      // gameData.splice(
      //   selectedSceneStart + 1,
      //   selectedSceneEnd - selectedSceneStart - 1,
      //   `this.scene.start('${scene.name}');
      //   `,
      // );

      const text = gameData.join('\n');
      fs.writeFile(gameFile, text, (err) => {
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
    const gameData = fs
      .readFileSync(gameFile)
      .toString()
      .split('\n');

    const selectedSceneStart = gameData.indexOf('      // select scene');
    if (selectedSceneStart !== -1) {
      gameData.splice(
        selectedSceneStart + 1,
        1,
        `      this.scene.start('${sceneName}');`,
      );
    }
    const text = gameData.join('\n');
    fs.writeFile(gameFile, text, (err) => {
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
    const data = fs
      .readFileSync(mainfile)
      .toString()
      .split('\n');
    const importIndex = data.indexOf("import 'phaser';");
    data.splice(importIndex + 1, 0, `import ${req.file.name} from '../${req.file.name}';`);
    const preloadIndex = data.indexOf('    // preload image here');
    data.splice(
      preloadIndex,
      0,
      `this.load.image('${req.file.name}', 'assets/${req.file.filename}');`,
    );

    const createIndex = data.indexOf('    // create object here');
    data.splice(
      createIndex,
      0,
      `this.${req.file.name} = new ${req.file.name}({
        scene: this,
        key: '${req.file.name}',
        x: 200,
        y: 200,
      });`,
    );

    const updateIndex = data.indexOf('    // update here');
    data.splice(updateIndex, 0, `this.${req.file.name}.update(scene);`);
    const text = data.join('\n');
    fs.writeFile(`${mainfile}`, text, (err) => {
      console.log(err);
    });
  } catch (err) {
    console.error(err);
  }
});

app.post('/api/updateCode', (req, res) => {
  req.body.map((object) => {
    const objectName = `${__dirname}/../Game/Classes/${object.name}.jsx`;
    try {
      const data = fs
        .readFileSync(objectName)
        .toString()
        .split('\n');
      const updateEndIndex = data.indexOf('    // update end');
      const updateStartIndex = data.indexOf('    // update start');
      data.splice(updateStartIndex + 1, updateEndIndex - updateStartIndex - 1, object.jsCode[2]);
      const createEndIndex = data.indexOf('    // create end');
      const createStartIndex = data.indexOf('    // create start');
      data.splice(createStartIndex + 1, createEndIndex - createStartIndex - 1, object.jsCode[1]);
      const functionsEndIndex = data.indexOf('  // functions end');
      const functionsStartIndex = data.indexOf('  // functions start');
      data.splice(functionsStartIndex + 1, functionsEndIndex - functionsStartIndex - 1, object.jsCode[0]);
      const text = data.join('\n');
      fs.writeFile(`${objectName}`, text, (err) => {
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
  req.body.map((scene) => {
    const sceneName = `${__dirname}/../Game/Scenes/${scene.name}.jsx`;
    try {
      const data = fs
        .readFileSync(sceneName)
        .toString()
        .split('\n');
      const functionsEndIndex = data.indexOf('  // functions end');
      const functionStartIndex = data.indexOf('  // functions start');
      data.splice(functionStartIndex + 1, functionsEndIndex - functionStartIndex - 1, scene.jsCode[0]);
      const createEndIndex = data.indexOf('    // create end');
      const createStartIndex = data.indexOf('    // create start');
      data.splice(createStartIndex + 1, createEndIndex - createStartIndex - 1, scene.jsCode[1]);
      const updateEndIndex = data.indexOf('    // update end');
      const updateStartIndex = data.indexOf('    // update start');
      data.splice(updateStartIndex + 1, updateEndIndex - updateStartIndex - 1, scene.jsCode[2]);
      const text = data.join('\n');
      fs.writeFile(`${sceneName}`, text, (err) => {
        console.log(err);
      });
    } catch (err) {
      console.error(err);
    }
  });
  return res.status(200).send({});
  // const gameObjects = req.data.gameObjects
});


// delete this
app.post('/api/initObject', (req, res) => {
  const scene = req.body;
  const sceneName = `${__dirname}/../Game/Scenes/${scene.name}.jsx`;
  try {
    const data = fs
      .readFileSync(sceneName)
      .toString()
      .split('\n');
    let code = '';
    let objectCode = '';
    scene.objects.map((object) => {
      code +=
        `this.${object.variableName} = new Class.${object.class}({
          scene: this,
          key: '${object.class}',
          x: ${object.x},
          y: ${object.y},
          w: ${object.w},
          h: ${object.h},
        });\n`;
      objectCode +=
        `this.${object.variableName}.update(this);\n`;
    });
    const updateEndIndex = data.indexOf('    // create instances end');
    const updateStartIndex = data.indexOf('    // create instances start');
    data.splice(updateStartIndex + 1, updateEndIndex - updateStartIndex - 1, code);

    const updateObjectEndIndex = data.indexOf('    // update object end');
    const updateObjectStartIndex = data.indexOf('    // update object start');
    data.splice(updateObjectStartIndex + 1, updateObjectEndIndex - updateObjectStartIndex - 1, objectCode);

    const text = data.join('\n');
    fs.writeFile(`${sceneName}`, text, (err) => {
      console.log(err);
    });
  } catch (err) {
    console.error(err);
  }
  return res.status(200).send({});
  // const gameObjects = req.data.gameObjects
});

app.post('/api/createGameObject', (req, res) => { });
app.listen(8080, () => console.log('Listening on port 8080!'));
