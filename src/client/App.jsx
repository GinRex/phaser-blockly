import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Blockly from './dev-index';
import configureStore from './store/configureStore';
import SceneManager from './SceneManager';
import SubMenu from './SubMenu';

const { store, persistor } = configureStore();

class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div>
            <div className="row">
              <div className="col-sm-10" style={{ height: 500 }}>
                <Blockly />
              </div>
              <div className="col-sm-2">
                <SubMenu />
                <iframe
                  width="550"
                  height="500"
                  // style={{ WebkitTransform: 'scale(0.5)', MozTransform: 'scale(0.5)' }}
                  title="phaser-game"
                  id="sandboxed"
                  src="game_iframe.html"
                />
                <SceneManager />
                <textarea id="code" style={{ height: 200, width: 400 }} value="" />
              </div>
            </div>
          </div>
        </PersistGate>
      </Provider>
    );
  }
}

window.addEventListener('load', () => {
  const editor = React.createElement(App);
  ReactDOM.render(editor, document.getElementById('blockly'));
});
