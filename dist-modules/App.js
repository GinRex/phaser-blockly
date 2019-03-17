import React, { Component } from "react";
import Game from "./Game";
import Blockly from "./dev-index";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./store/configureStore";

class App extends Component {
    render() {
        return React.createElement(
            Provider,
            { store: store },
            React.createElement(
                PersistGate,
                { loading: null, persistor: persistor },
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        { "class": "row" },
                        React.createElement(
                            "div",
                            { "class": "col-sm-10", style: { height: 500 } },
                            React.createElement(Blockly, null)
                        ),
                        React.createElement(
                            "div",
                            { "class": "col-sm-2" },
                            React.createElement(Game, null),
                            React.createElement("textarea", { id: "code", style: { height: 200, width: 400 }, value: "" })
                        )
                    )
                )
            )
        );
    }
}

window.addEventListener('load', () => {
    const editor = React.createElement(App);
    ReactDOM.render(editor, document.getElementById('blockly'));
});