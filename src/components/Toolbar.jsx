import React from 'react';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
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
      <RaisedButton style={styles.button} containerElement={<Link to="/recipes" />} label="My Recipes" />
      <RaisedButton style={styles.button} containerElement={<Link to="/ingredients" />} label="My Ingredients" />
      <RaisedButton style={styles.button} containerElement={<Link to="/Login" />} label="Login" />
      <RaisedButton style={styles.button} containerElement={<Link to="/About" />} label="About" />
    </ToolbarGroup>
  </Toolbar>
);


export default MyToolbar;
