/* eslint-disable react/prop-types */
import React from 'react';
import { BlockPicker } from 'react-color';

export default class ColorPickerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      background: '#fff',
    };
    this.handleChangeComplete = this.handleChangeComplete.bind(this);
  }

  handleChangeComplete = color => {
    this.setState({ background: color.hex });
    this.props.onChangeColor(color.hex);
  };

  render() {
    return (
      <BlockPicker
        color={this.state.background}
        onChangeComplete={this.handleChangeComplete}
      />
    );
  }
}
