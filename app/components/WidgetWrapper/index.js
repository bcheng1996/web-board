import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import './index.scss';

class WidgetWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { onEditClick } = this.props;
    return (
      <div className="WidgetWrapper">
        <div className="toolbar">
          <Button onClick={onEditClick}>E</Button>
        </div>
        {this.props.children}
      </div>
    )
  }
}

WidgetWrapper.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  frame: PropTypes.bool,
};

export default WidgetWrapper;
