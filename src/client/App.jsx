import React, { Component } from 'react';
import Game from '../Game/zelda/Game';
import Blockly from './dev-index';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/configureStore';

class App extends Component {
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
                <Game />
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
