/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import Button from '@material-ui/core/Button';
import Image from '../../components/Image';
import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';

import 'gridstack/dist/h5/gridstack-dd-native';
import './style.scss';

export default class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currId: 0,
      widgets: [],
      registeredWidgets: []
    }
  }

  componentDidMount() {
    this.grid = GridStack.init({ minRow: 3, float: true });
  }

  componentDidUpdate() {
  }

  getUID = () => {
    const { currId } = this.state;
    const nextId = currId + 1;
    this.setState({ currId: nextId });
    return currId
  }

  registerWidget = (r, id) => {
    const { registeredWidgets } = this.state;

    console.log(registeredWidgets);

    if (!registeredWidgets.includes(id)) {
      this.setState(state => {
        const newRegisteredWidgets = state.registeredWidgets.concat(id);
        return { registeredWidgets: newRegisteredWidgets }
      });
      this.grid.makeWidget(r);
    }
  }

  addWidget = () => {
    const newWidget = {
      id: this.getUID(),
      type: 'image'
    };

    this.setState(state => {
      const newWidgets = state.widgets.concat(newWidget);
      return { widgets: newWidgets };
    });
  }

  renderWidgets = () => {
    const { widgets } = this.state;
    // const widgetsCopy = widgets.concat();

    return widgets.map((widget) => {
      if (widget.type === 'image') {
        return (
          <div id={widget.id} ref={(r) => this.registerWidget(r, widget.id)}>
            <Image />
          </div>
        )
      }
    });
  }


  render() {
    return (
      <div className="HomeContainer">
        <div className="grid-stack">
          {this.renderWidgets()}
        </div>
        <Button className='addWidget' onClick={this.addWidget}>Add Widget</Button>
      </div>
    );
  }
}
