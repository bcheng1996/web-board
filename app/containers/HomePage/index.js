/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import Button from '@material-ui/core/Button';
import Image from '../../components/Image';
import WidgetWrapper from '../../components/WidgetWrapper';
import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';

import { WIDGET_DEFAULT_HEIGHT, WIDGET_DEFAULT_WIDTH } from './constants';
import 'gridstack/dist/h5/gridstack-dd-native';
import './style.scss';

export default class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currId: 0,
      widgets: [],
      widgetsLocked: false,
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

  toggleWidgetLock = () => {
    const { widgetsLocked } = this.state;

    if (widgetsLocked) {
      this.grid.enable();
    } else {
      this.grid.disable();
    }

    this.setState({ widgetsLocked: !widgetsLocked });
  }

  hideEditor = () => {
    this.setState({ hideEditor: true });
  }

  handleChangeTheme = () => {
    const currentTheme = document.documentElement.className;
    document.documentElement.className = '';

    if (currentTheme === 'theme-light') {
      document.documentElement.classList.add(`theme-dark`);
    } else {
      document.documentElement.classList.add(`theme-light`);
    }
  };


  renderWidgets = () => {
    const { widgets, widgetsLocked } = this.state;
    // const widgetsCopy = widgets.concat();

    return widgets.map((widget) => {
      if (widget.type === 'image') {
        return (
          <div id={widget.id} gs-w={WIDGET_DEFAULT_HEIGHT} gs-h={WIDGET_DEFAULT_HEIGHT} ref={(r) => this.registerWidget(r, widget.id)}>
            <Image editing={!widgetsLocked} />
          </div>
        )
      }
    });
  }


  render() {
    const { widgetsLocked, hideEditor } = this.state;
    return (
      <div className="HomeContainer">
        <div className="grid-stack">
          {this.renderWidgets()}
        </div>
        <div style={hideEditor ? { display: 'none' } : { display: 'block' }}>
          <Button className='hideEditor' onClick={this.hideEditor}> Hide Editor</Button>
          <Button className='addWidget' onClick={this.addWidget}>Add Widget</Button>
          <Button className='lockWidget' onClick={this.toggleWidgetLock}>{`${widgetsLocked ? 'Unlock Widgets' : 'Lock Widgets'}`}</Button>
          <Button style={{ position: 'absolute', bottom: 10, right: 10 }} onClick={this.handleChangeTheme}>Change Theme</Button>
        </div>
      </div>
    );
  }
}
