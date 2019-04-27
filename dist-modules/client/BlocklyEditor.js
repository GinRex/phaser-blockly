var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import BlocklyToolbox from './BlocklyToolbox';
import BlocklyWorkspace from './BlocklyWorkspace';

const BlockPropType = PropTypes.shape({
  type: PropTypes.string,
  shadow: PropTypes.bool,
  fields: PropTypes.object,
  values: PropTypes.object,
  statements: PropTypes.object,
  next: PropTypes.object,
  mutation: PropTypes.shape({
    attributes: PropTypes.object,
    innerContent: PropTypes.string
  })
});

const categoryPropsNonRecursive = {
  type: PropTypes.string,
  name: PropTypes.string,
  custom: PropTypes.string,
  colour: PropTypes.string,
  blocks: PropTypes.arrayOf(BlockPropType)
};

const CategoryPropType = PropTypes.shape(_extends({}, categoryPropsNonRecursive, {
  categories: PropTypes.arrayOf(PropTypes.shape(categoryPropsNonRecursive))
}));

class BlocklyEditor extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.componentDidMount = () => {
      this.toolboxDidUpdate();

      if (this.props.xmlDidChange) {
        if (typeof console !== 'undefined') {
          // eslint-disable-next-line no-console
          console.error('Warning: xmlDidChange is deprecated and will be removed in future versions! Please use workspaceDidChange instead.');
        }
      }
    }, this.componentDidUpdate = prevProps => {
      if (this.props.toolboxBlocks && !Immutable.fromJS(this.props.toolboxBlocks).equals(Immutable.fromJS(prevProps.toolboxBlocks)) || this.props.toolboxCategories && !Immutable.fromJS(this.props.toolboxCategories).equals(Immutable.fromJS(prevProps.toolboxCategories))) {
        this.toolboxDidUpdate();
      }
    }, this.toolboxDidUpdate = () => {
      const workspaceConfiguration = this.props.workspaceConfiguration || {};
      if (this.workspace && !workspaceConfiguration.readOnly) {
        this.workspace.toolboxDidUpdate(this.toolbox.getRootNode());
      }
    }, this.xmlDidChange = newXml => {
      if (this.props.xmlDidChange) {
        this.props.xmlDidChange(newXml);
      }
    }, this.workspaceDidChange = workspace => {
      if (this.props.workspaceDidChange) {
        this.props.workspaceDidChange(workspace);
      }
    }, this.importFromXml = xml => this.workspace.importFromXml(xml), this.resize = () => {
      this.workspace.resize();
    }, this.render = () => {
      let toolboxMode;
      if (this.props.toolboxCategories) {
        toolboxMode = 'CATEGORIES';
      } else if (this.props.toolboxBlocks) {
        toolboxMode = 'BLOCKS';
      }

      return React.createElement(
        'div',
        { className: this.props.wrapperDivClassName },
        React.createElement(BlocklyToolbox, {
          categories: Immutable.fromJS(this.props.toolboxCategories),
          blocks: Immutable.fromJS(this.props.toolboxBlocks),
          didUpdate: this.toolboxDidUpdate,
          processCategory: this.props.processToolboxCategory,
          ref: toolbox => {
            this.toolbox = toolbox;
          }
        }),
        React.createElement(BlocklyWorkspace, {
          ref: workspace => {
            this.workspace = workspace;
          },
          initialXml: this.props.initialXml,
          onImportXmlError: this.props.onImportXmlError,
          toolboxMode: toolboxMode,
          xmlDidChange: this.xmlDidChange,
          workspaceDidChange: this.workspaceDidChange,
          wrapperDivClassName: this.props.wrapperDivClassName,
          workspaceConfiguration: this.props.workspaceConfiguration
        })
      );
    }, _temp;
  }

}

BlocklyEditor.propTypes = {
  initialXml: PropTypes.string,
  workspaceConfiguration: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  wrapperDivClassName: PropTypes.string,
  toolboxCategories: PropTypes.arrayOf(CategoryPropType.isRequired),
  toolboxBlocks: PropTypes.arrayOf(BlockPropType.isRequired),
  xmlDidChange: PropTypes.func,
  workspaceDidChange: PropTypes.func,
  onImportXmlError: PropTypes.func,
  processToolboxCategory: PropTypes.func
};
BlocklyEditor.defaultProps = {
  initialXml: null,
  workspaceConfiguration: null,
  wrapperDivClassName: null,
  toolboxCategories: null,
  toolboxBlocks: null,
  xmlDidChange: null,
  workspaceDidChange: null,
  onImportXmlError: null,
  processToolboxCategory: null
};
export default BlocklyEditor;