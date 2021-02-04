import React from 'react';
import PropTypes from 'prop-types';

import PlaceHolderImage from './default-placeholder-image.png';

import './index.scss';

function Image(props) {
  const { width, height, frame = true } = props;

  return (
    <div className="ImageContainer">
      <div className="outer_container" style={{ width, height }}>
        <div className={`inner_container ${frame ? 'frame' : ''}`}>
          <img alt="placeholder" className="image" src={PlaceHolderImage} />
        </div>
      </div>
    </div>
  );
}

Image.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  frame: PropTypes.bool,
};

export default Image;
