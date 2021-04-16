/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import { GridStack } from 'gridstack';
import Board from '../Board';
import { toggleLock } from './actions';
import { makeSelectLocked, makeSelectMode } from './selectors';
import Image from '../../components/Image';
import 'gridstack/dist/gridstack.min.css';

import { WIDGET_DEFAULT_HEIGHT } from './constants';
import 'gridstack/dist/h5/gridstack-dd-native';
import './style.scss';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currId: 0,
      widgets: [],
      widgetsLocked: false,
      registeredWidgets: [],
    };
  }

  componentDidMount() {
    this.grid = GridStack.init({ minRow: 3, float: true });
  }

  componentDidUpdate() {}

  getUID = () => {
    const { currId } = this.state;
    const nextId = currId + 1;
    this.setState({ currId: nextId });
    return currId;
  };

  registerWidget = (r, id) => {
    const { registeredWidgets } = this.state;
    if (!registeredWidgets.includes(id)) {
      this.setState(state => {
        const newRegisteredWidgets = state.registeredWidgets.concat(id);
        return { registeredWidgets: newRegisteredWidgets };
      });
      this.grid.makeWidget(r);
    }
  };

  addWidget = () => {
    const newWidget = {
      id: this.getUID(),
      type: 'image',
    };

    this.setState(state => {
      const newWidgets = state.widgets.concat(newWidget);
      return { widgets: newWidgets };
    });
  };

  toggleWidgetLock = () => {
    const { widgetsLocked } = this.state;

    if (widgetsLocked) {
      this.grid.enable();
    } else {
      this.grid.disable();
    }

    this.setState({ widgetsLocked: !widgetsLocked });
  };

  hideEditor = () => {
    this.setState({ hideEditor: true });
  };

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

    return widgets.map(widget => {
      if (widget.type === 'image') {
        return (
          <div
            id={widget.id}
            gs-w={WIDGET_DEFAULT_HEIGHT}
            gs-h={WIDGET_DEFAULT_HEIGHT}
            ref={r => this.registerWidget(r, widget.id)}
          >
            <Image editing={!widgetsLocked} />
          </div>
        );
      }
    });
  };

  render() {
    const { mode, locked } = this.props;
    console.log(this.props);
    return (
      <div className="HomeContainer">
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <ColorLensIcon />
            </IconButton>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => this.props.toggleLock(true)}
            >
              {locked ? <LockIcon /> : <LockOpenIcon />}
            </IconButton>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <AddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Board locked={locked} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  mode: makeSelectMode(state),
  locked: makeSelectLocked(state),
});

const mapDispatchToProps = dispatch => ({
  toggleLock: () => dispatch(toggleLock()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
