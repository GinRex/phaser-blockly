var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import PropTypes from 'prop-types';

function debounce(func, wait) {
  let timeout;

  return function debouncedFunction(...args) {
    const context = this;
    const later = function later() {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

class BlocklyWorkspace extends React.Component {

  constructor(props) {
    super(props);

    this.componentDidMount = () => {
      // TODO figure out how to use setState here without breaking the toolbox when switching tabs
      this.state.workspace = Blockly.inject(this.editorDiv, _extends({}, this.props.workspaceConfiguration, {
        toolbox: this.dummyToolbox
      }));

      if (this.state.xml) {
        if (this.importFromXml(this.state.xml)) {
          this.xmlDidChange();
        } else {
          this.setState({ xml: null }, this.xmlDidChange);
        }
      }

      this.state.workspace.addChangeListener(this.workspaceDidChange);

      this.state.workspace.addChangeListener(debounce(() => {
        const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.state.workspace));
        if (newXml === this.state.xml) {
          return;
        }

        this.setState({ xml: newXml }, this.xmlDidChange);
      }, 200));
    };

    this.componentWillReceiveProps = newProps => {
      if (this.props.initialXml !== newProps.initialXml) {
        this.setState({ xml: newProps.initialXml });
      }
    };

    this.shouldComponentUpdate = () => false;

    this.componentWillUnmount = () => {
      if (this.state.workspace) {
        this.state.workspace.dispose();
      }
    };

    this.importFromXml = xml => {
      try {
        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), this.state.workspace);
        return true;
      } catch (e) {
        if (this.props.onImportXmlError) {
          this.props.onImportXmlError(e);
        }
        return false;
      }
    };

    this.xmlDidChange = () => {
      if (this.props.xmlDidChange) {
        this.props.xmlDidChange(this.state.xml);
      }
    };

    this.workspaceDidChange = () => {
      if (this.props.workspaceDidChange) {
        this.props.workspaceDidChange(this.state.workspace);
      }
    };

    this.toolboxDidUpdate = toolboxNode => {
      if (toolboxNode && this.state.workspace) {
        this.state.workspace.updateToolbox(toolboxNode);
      }
    };

    this.resize = () => {
      Blockly.svgResize(this.state.workspace);
    };

    this.render = () => {
      // We have to fool Blockly into setting up a toolbox with categories initially;
      // otherwise it will refuse to do so after we inject the real categories into it.
      let dummyToolboxContent;
      if (this.props.toolboxMode === 'CATEGORIES') {
        dummyToolboxContent = React.createElement('category', { name: 'Dummy toolbox' });
      }

      return React.createElement(
        'div',
        { className: this.props.wrapperDivClassName },
        React.createElement(
          'xml',
          { style: { display: 'none' }, ref: dummyToolbox => {
              this.dummyToolbox = dummyToolbox;
            } },
          dummyToolboxContent
        ),
        React.createElement('div', {
          className: this.props.wrapperDivClassName,
          ref: editorDiv => {
            this.editorDiv = editorDiv;
          }
        })
      );
    };

    this.state = {
      workspace: null,
      xml: this.props.initialXml
    };
  }

}

BlocklyWorkspace.propTypes = {
  initialXml: PropTypes.string,
  workspaceConfiguration: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  wrapperDivClassName: PropTypes.string,
  xmlDidChange: PropTypes.func,
  workspaceDidChange: PropTypes.func,
  onImportXmlError: PropTypes.func,
  toolboxMode: PropTypes.oneOf(['CATEGORIES', 'BLOCKS'])
};
BlocklyWorkspace.defaultProps = {
  initialXml: null,
  workspaceConfiguration: null,
  wrapperDivClassName: null,
  xmlDidChange: null,
  workspaceDidChange: null,
  onImportXmlError: null,
  toolboxMode: 'BLOCKS'
};
export default BlocklyWorkspace;