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

import '../../global-styles.scss';

export default function App() {
  const handleChangeTheme = () => {
    const currentTheme = document.documentElement.className;
    document.documentElement.className = '';

    if (currentTheme === 'theme-light') {
      document.documentElement.classList.add(`theme-dark`);
    } else {
      document.documentElement.classList.add(`theme-light`);
    }
  };

  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Button style={{ position: 'absolute', bottom: 10, right: 10 }} onClick={handleChangeTheme}>Change Theme</Button>
    </div>
  );
}
