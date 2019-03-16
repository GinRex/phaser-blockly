import React, { Component } from "react";
import Game from "./Game";
import Blockly from "./dev-index";
import { Provider } from "react-redux";

import store from "./store";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <div class="row" >
                        <div class="col-sm-10" style={{ height: 500 }}><Blockly /></div>

                        <div class="col-sm-2">
                        <Game />
                        <textarea id="code" style={{height: 200, width: 400}} value=""></textarea>
                        </div>
                    </div>
                </div>
            </Provider>
        );
    }
}

window.addEventListener('load', () => {
    const editor = React.createElement(App);
    ReactDOM.render(editor, document.getElementById('blockly'));
});

