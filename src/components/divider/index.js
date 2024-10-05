import { memo } from 'react';
import PropTypes from 'prop-types';

function Divider({ height = 1, backgroundColor = '#CCC' }) {
  return <div style={{ height: `${height}px`, backgroundColor }}></div>;
}

Divider.propTypes = {
  height: PropTypes.number,
  backgroundColor: PropTypes.string,
};

export default memo(Divider);
