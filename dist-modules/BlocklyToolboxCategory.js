import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import BlocklyToolboxBlock from './BlocklyToolboxBlock';

class BlocklyToolboxCategory extends React.PureComponent {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.render = () => {
      const subcategories = (this.props.categories || []).map(BlocklyToolboxCategory.renderCategory);
      const blocks = (this.props.blocks || []).map(BlocklyToolboxBlock.renderBlock);

      return React.createElement(
        'category',
        { name: this.props.name, custom: this.props.custom, colour: this.props.colour },
        blocks,
        subcategories
      );
    }, _temp;
  }

}

BlocklyToolboxCategory.propTypes = {
  name: PropTypes.string,
  custom: PropTypes.string,
  colour: PropTypes.string,
  categories: ImmutablePropTypes.list,
  blocks: ImmutablePropTypes.list
};
BlocklyToolboxCategory.defaultProps = {
  name: null,
  custom: null,
  colour: null,
  categories: null,
  blocks: null
};

BlocklyToolboxCategory.renderCategory = (category, key) => {
  if (category.get('type') === 'sep') {
    return React.createElement('sep', { key: key });
  } else if (category.get('type') === 'search') {
    return React.createElement('search', { key: key });
  }
  return React.createElement(BlocklyToolboxCategory, {
    name: category.get('name'),
    custom: category.get('custom'),
    colour: category.get('colour'),
    key: key,
    blocks: category.get('blocks'),
    categories: category.get('categories')
  });
};

export default BlocklyToolboxCategory;