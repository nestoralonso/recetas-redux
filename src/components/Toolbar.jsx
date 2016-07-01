import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';

const styles = {
  button: {
    display: 'inline-block',
  },
};
const MyToolbar = () => (
  <Toolbar role="navigation">
    <ToolbarGroup firstChild float="left">
      <RaisedButton style={styles.button} containerElement={<Link to="/recipes" />} label="Recipes" />
      <RaisedButton style={styles.button} containerElement={<Link to="/ingredients" />} label="Ingredients" />
      <RaisedButton style={styles.button} containerElement={<Link to="/Login" />} label="Login" />
      <RaisedButton style={styles.button} containerElement={<Link to="/About" />} label="About" />
    </ToolbarGroup>
  </Toolbar>
);


export default MyToolbar;
