import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';

const MyToolbar = () => {
  return (
    <Toolbar>
      <ToolbarGroup firstChild={true} float="left">
        <RaisedButton containerElement={<Link to="/recipes" />} label="Recipes"  />
        <RaisedButton containerElement={<Link to="/About" />} label="About"  />
      </ToolbarGroup>
    </Toolbar>
  );
};

export default MyToolbar;