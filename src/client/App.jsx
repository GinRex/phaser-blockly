import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Fab from '@material-ui/core/Fab';

import Blockly from './dev-index';
import configureStore from './store/configureStore';
import SceneManager from './SceneManager';
import SubMenu from './SubMenu';


const { store, persistor } = configureStore();

// const useStyles = makeStyles(theme => ({
//   fab: {
//     margin: theme.spacing(1),
//   },
//   extendedIcon: {
//     marginRight: theme.spacing(1),
//   },
// }));

class App extends Component {
  state = {
    iframeContainerW: 600,
    iframeContainerH: 600,
    scaleRatio: 1,
    iframeW: 100,
    iframeH: 100,
  }
  componentDidMount() { }
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
                <div
                  style={{
                    width: this.state.iframeContainerW,
                    height: this.state.iframeContainerH,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      zIndex: 10,
                      // transform: 'translateX(-50%)',
                    }}
                  >
                    <Fab
                      color="primary"
                      aria-label="Add"
                      onClick={() => {
                        const newRatio = this.state.scaleRatio + 0.1;
                        this.setState({
                          scaleRatio: newRatio,
                          iframeW: (1 / newRatio) * 100,
                          iframeH: (1 / newRatio) * 100,
                        });
                      }}
                    >
                      +
                    </Fab>
                    <Fab
                      color="secondary"
                      aria-label="Edit"
                      onClick={() => {
                        const newRatio = this.state.scaleRatio - 0.1;
                        this.setState({
                          scaleRatio: newRatio,
                          iframeW: (1 / newRatio) * 100,
                          iframeH: (1 / newRatio) * 100,
                        });
                      }}
                    >
                      -
                    </Fab>
                  </div>
                  <iframe
                    width={`${this.state.iframeW}%`}
                    height={`${this.state.iframeH}%`}
                    style={{
                      WebkitTransform: `scale(${this.state.scaleRatio})`,
                      WebkitTransformOrigin: 'top left',
                    }}
                    title="phaser-game"
                    id="sandboxed"
                    src="game_iframe.html"
                  />

                </div>
                <SceneManager />
                <textarea id="code" style={{ height: 200, width: 400 }} value="" />
                {/* <textarea id="xml" style={{ height: 200, width: 400 }} value="" /> */}
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
