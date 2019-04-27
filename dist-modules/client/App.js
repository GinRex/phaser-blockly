import _UsersMacPhaserBlocklyNode_modulesRedboxReactLibIndexJs from '/Users/mac/phaser-blockly/node_modules/redbox-react/lib/index.js';
import _UsersMacPhaserBlocklyNode_modulesReactTransformCatchErrorsLibIndexJs from '/Users/mac/phaser-blockly/node_modules/react-transform-catch-errors/lib/index.js';
import _react from 'react';
import _UsersMacPhaserBlocklyNode_modulesReactTransformHmrLibIndexJs from '/Users/mac/phaser-blockly/node_modules/react-transform-hmr/lib/index.js';
const _components = {
  App: {
    displayName: 'App'
  }
};

const _UsersMacPhaserBlocklyNode_modulesReactTransformHmrLibIndexJs2 = _UsersMacPhaserBlocklyNode_modulesReactTransformHmrLibIndexJs({
  filename: 'src/client/App.jsx',
  components: _components,
  locals: [module],
  imports: [_react]
});

const _UsersMacPhaserBlocklyNode_modulesReactTransformCatchErrorsLibIndexJs2 = _UsersMacPhaserBlocklyNode_modulesReactTransformCatchErrorsLibIndexJs({
  filename: 'src/client/App.jsx',
  components: _components,
  locals: [],
  imports: [_react, _UsersMacPhaserBlocklyNode_modulesRedboxReactLibIndexJs]
});

function _wrapComponent(id) {
  return function (Component) {
    return _UsersMacPhaserBlocklyNode_modulesReactTransformHmrLibIndexJs2(_UsersMacPhaserBlocklyNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Blockly from './dev-index';
import configureStore from './store/configureStore';
import SceneManager from './SceneManager';
import SubMenu from './SubMenu';

const { store, persistor } = configureStore();

const App = _wrapComponent('App')(class App extends Component {
  componentDidMount() {}
  render() {
    return React.createElement(
      Provider,
      { store: store },
      React.createElement(
        PersistGate,
        { loading: null, persistor: persistor },
        React.createElement(
          'div',
          null,
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
              'div',
              { className: 'col-sm-10', style: { height: 500 } },
              React.createElement(Blockly, null)
            ),
            React.createElement(
              'div',
              { className: 'col-sm-2' },
              React.createElement(SubMenu, null),
              React.createElement('iframe', {
                style: { height: 500, width: 550 },
                title: 'phaser-game',
                id: 'sandboxed',
                src: 'game_iframe.html'
              }),
              React.createElement(SceneManager, null),
              React.createElement('textarea', { id: 'code', style: { height: 200, width: 400 }, value: '' })
            )
          )
        )
      )
    );
  }
});

window.addEventListener('load', () => {
  const editor = React.createElement(App);
  ReactDOM.render(editor, document.getElementById('blockly'));
});