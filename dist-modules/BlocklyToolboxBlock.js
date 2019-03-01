/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

class BlocklyToolboxBlock extends React.PureComponent {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.componentDidMount = () => {
      if (this.props.mutation) {
        this.props.mutation.get('attributes').forEach((value, attributeName) => {
          this.mutationElement.setAttribute(attributeName, value);
          return true;
        });
      }
    }, this.render = () => {
      let fields = [];
      let values = [];
      let statements = [];
      let mutation = null;
      let nextBlock = null;

      if (this.props.fields) {
        fields = this.props.fields.map((fieldValue, fieldName, i) => React.createElement(
          'field',
          { name: fieldName, key: `field_${fieldName}_${i}` },
          fieldValue
        )).valueSeq();
      }

      if (this.props.values) {
        values = this.props.values.map((valueBlock, valueName, i) => React.createElement(
          'value',
          { name: valueName, key: `value_${valueName}_${i}` },
          BlocklyToolboxBlock.renderBlock(valueBlock)
        )).valueSeq();
      }

      if (this.props.statements) {
        statements = this.props.statements.map((statementBlock, statementName, i) => React.createElement(
          'statement',
          { name: statementName, key: `statement_${statementName}_${i}` },
          BlocklyToolboxBlock.renderBlock(statementBlock)
        )).valueSeq();
      }

      if (this.props.mutation) {
        mutation = React.createElement('mutation', {
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML: { __html: this.props.mutation.get('innerContent') },
          ref: mutationElement => {
            this.mutationElement = mutationElement;
          }
        });
      }

      if (this.props.next) {
        nextBlock = React.createElement(
          'next',
          null,
          BlocklyToolboxBlock.renderBlock(this.props.next)
        );
      }

      if (this.props.shadow) {
        return React.createElement(
          'shadow',
          { type: this.props.type },
          mutation,
          fields,
          values,
          statements,
          nextBlock
        );
      }

      return React.createElement(
        'block',
        { type: this.props.type },
        mutation,
        fields,
        values,
        statements,
        nextBlock
      );
    }, _temp;
  }

}

BlocklyToolboxBlock.propTypes = {
  type: PropTypes.string.isRequired,
  shadow: PropTypes.bool,
  fields: ImmutablePropTypes.map,
  values: ImmutablePropTypes.map,
  statements: ImmutablePropTypes.map,
  next: ImmutablePropTypes.map,
  mutation: ImmutablePropTypes.mapContains({
    attributes: ImmutablePropTypes.map,
    innerContent: PropTypes.string
  })
};
BlocklyToolboxBlock.defaultProps = {
  shadow: false,
  fields: null,
  values: null,
  statements: null,
  next: null,
  mutation: null
};

BlocklyToolboxBlock.renderBlock = (block, key) => React.createElement(BlocklyToolboxBlock, {
  type: block.get('type'),
  key: key,
  fields: block.get('fields'),
  values: block.get('values'),
  statements: block.get('statements'),
  mutation: block.get('mutation'),
  shadow: block.get('shadow'),
  next: block.get('next')
});

export default BlocklyToolboxBlock;