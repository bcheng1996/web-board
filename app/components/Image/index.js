import React from 'react';
import PropTypes from 'prop-types';

import WidgetWrapper from '../WidgetWrapper';
import PlaceHolderImage from './default-placeholder-image.png';

import './index.scss';

class Image extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleUploadClick = event => {
    const file = event.target.files[0];
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      this.setState({
        selectedFile: [reader.result]
      });
    }.bind(this);

    console.log(url);

    this.setState({
      mainState: "uploaded",
      selectedFile: event.target.files[0],
      imageUploaded: 1,
      showFrame: false,
    });
  };

  handleEditClick = () => {
    // TODO: introduce more edit options. for now toggle frame
    const { showFrame } = this.state;

    this.setState({ showFrame: !showFrame })

  }

  render() {
    const { width, height, editing } = this.props;
    const { showFrame } = this.state;

    return (
      <WidgetWrapper onEditClick={this.handleEditClick}>
        <div className="ImageContainer">
          <div className="outer_container" style={{ width, height }}>
            <div className={`inner_container ${showFrame ? 'frame' : ''}`}>
              <img alt="placeholder" className="image" src={this.state.selectedFile || PlaceHolderImage} />
              {editing ? <input
                accept="image/*"
                id="contained-button-file"
                type="file"
                onChange={this.handleUploadClick}
              /> : null}
            </div>
          </div>
        </div>
      </WidgetWrapper>

    );
  }
}

Image.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  frame: PropTypes.bool,
};

export default Image;
