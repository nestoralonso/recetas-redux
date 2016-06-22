import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';

import MyAppBar from './MyAppBar.jsx';
import Toolbar from './Toolbar.jsx';
import RecipeForm from './RecipeForm.jsx';
import RecipeList from '../containers/RecipeList';


class AppShell extends Component {
  render() {
    const { children } = this.props;
    return (
      <MuiThemeProvider >
        <Paper>
          <MyAppBar />
          <Toolbar />
          <RecipeList />

          <RecipeForm />
        </Paper>
      </MuiThemeProvider>
    );
  }
};

export default AppShell;
