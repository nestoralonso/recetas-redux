import React from 'react';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';

const styles = {
  button: {
    display: 'inline-block',
  },
};
const MyToolbar = () => (
  <Paper role="navigation">
    <RaisedButton
      style={styles.button}
      containerElement={<Link to="/search" />}
      label="RecipesHub"
    />
    <RaisedButton
      style={styles.button}
      containerElement={<Link to="/recipes" />}
      label="My Recipes"
    />
    <RaisedButton
      style={styles.button}
      containerElement={<Link to="/ingredients" />}
      label="My Ingredients"
    />
    <RaisedButton
      style={styles.button}
      containerElement={<Link to="/Login" />}
      label="Login"
    />
  </Paper>
);


export default MyToolbar;
