import React from 'react';
import { connect } from 'react-redux';
import { makeSelectLocked } from '../HomePage/selectors';

import Button from '@material-ui/core/Button';
import { GridStack } from 'gridstack';
import Image from '../../components/Image';
import 'gridstack/dist/gridstack.min.css';

import { WIDGET_DEFAULT_HEIGHT } from './constants';
import 'gridstack/dist/h5/gridstack-dd-native';
// import './style.scss';

class Board extends React.Component {
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

    componentDidUpdate() {
        if (!this.props.locked) {
            this.grid.enable();
        } else {
            this.grid.disable();
        }
    }

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
        const { widgetsLocked, hideEditor } = this.state;

        return (
            <div className="BoardContainer">
                <div className="grid-stack">{this.renderWidgets()}</div>
                <div style={hideEditor ? { display: 'none' } : { display: 'block' }}>
                    <Button className="hideEditor" onClick={this.hideEditor}>
                        {' '}
                Hide Editor
              </Button>
                    <Button className="addWidget" onClick={this.addWidget}>
                        Add Widget
              </Button>

                    <Button
                        style={{ position: 'absolute', bottom: 10, right: 10 }}
                        onClick={this.handleChangeTheme}
                    >
                        Change Theme
              </Button>
                </div>
            </div>
        )

    }
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {})(Board);