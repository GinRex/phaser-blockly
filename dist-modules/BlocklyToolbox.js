/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';
import { is } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

import BlocklyToolboxCategory from './BlocklyToolboxCategory';
import BlocklyToolboxBlock from './BlocklyToolboxBlock';

class BlocklyToolbox extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.componentDidMount = () => {
      this.props.didUpdate();
    }, this.shouldComponentUpdate = nextProps => !(is(nextProps.categories, this.props.categories) && is(nextProps.blocks, this.props.blocks)), this.componentDidUpdate = () => {
      this.props.didUpdate();
    }, this.getRootNode = () => this.rootNode, this.processCategory = category => {
      let processedCategory = category;

      if (processedCategory.has('categories')) {
        processedCategory = category.update('categories', subcategories => subcategories.map(this.processCategory));
      }

      if (this.props.processCategory) {
        return this.props.processCategory(processedCategory);
      }

      return processedCategory;
    }, this.renderCategories = categories => categories.map((category, i) => {
      if (category.get('type') === 'sep') {
        return React.createElement('sep', { key: `sep_${i}` });
      } else if (category.get('type') === 'search') {
        return React.createElement('search', { key: `search_${i}` });
      }
      return React.createElement(BlocklyToolboxCategory, {
        name: category.get('name'),
        custom: category.get('custom'),
        colour: category.get('colour'),
        key: `category_${category.get('name')}_${i}`,
        blocks: category.get('blocks'),
        categories: category.get('categories')
      });
    }), this.render = () => {
      if (this.props.categories) {
        return React.createElement(
          'xml',
          { style: { display: 'none' }, ref: node => {
              this.rootNode = node;
            } },
          this.renderCategories(this.props.categories.map(this.processCategory))
        );
      }
      return React.createElement(
        'xml',
        { style: { display: 'none' }, ref: node => {
            this.rootNode = node;
          } },
        this.props.blocks.map(BlocklyToolboxBlock.renderBlock)
      );
    }, _temp;
  }

}

BlocklyToolbox.propTypes = {
  categories: ImmutablePropTypes.list,
  blocks: ImmutablePropTypes.list,
  processCategory: PropTypes.func,
  didUpdate: PropTypes.func
};
BlocklyToolbox.defaultProps = {
  categories: null,
  blocks: null,
  processCategory: null,
  didUpdate: null
};
export default BlocklyToolbox;