/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Button from '@material-ui/core/Button';
import ColorPicker from '../../components/common/ColorPicker';
import '../../global-styles.scss';

export default function App() {
  const handleChangeTheme = color => {
    document.documentElement.className = '';
    document.documentElement.style.backgroundColor = color;
  };

  return (
    <div>
      {/* <ColorPicker onChangeColor={handleChangeTheme} /> */}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Button
        style={{ position: 'absolute', bottom: 10, right: 10 }}
        onClick={handleChangeTheme}
      >
        Change Theme
      </Button>
    </div>
  );
}
