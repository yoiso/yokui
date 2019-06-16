import React from 'react';
import PropTypes from 'prop-types';
import {Grid, FlexCol} from '../flex-grids';

export class Header extends React.PureComponent {
  static propTypes = {
    cols: PropTypes.array,
    companyName: PropTypes.node.isRequired,
    logo: PropTypes.node,
    productName: PropTypes.node
  };

  static defaultProps = {
    cols: [],
    logo: null
  };

  render() {
    const {cols, companyName, logo, productName} = this.props;

    return (
      <Grid className="pui-siteframe-header">
        {[
          logo && <FlexCol fixed>
            {logo}
          </FlexCol>,
          <FlexCol fixed className="pui-siteframe-header-title">
            <h4>{companyName} {productName && <span className="em-high">{productName}</span>}</h4>
          </FlexCol>,
          ...cols
        ].filter(Boolean).map((col, key) => React.cloneElement(col, {key}))}
      </Grid>
    );
  }
}