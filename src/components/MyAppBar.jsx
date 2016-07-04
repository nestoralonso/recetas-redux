import React from 'react';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import UserInfo from '../containers/UserInfo.jsx';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const styles = {
  title: {
    cursor: 'pointer',
  },
  buttons: {
    color: 'white',
  },
};
const MyAppBar = () => (
  <AppBar
    title={<span style={styles.title}>Recetas</span>}
    iconElementLeft={
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <MenuItem primaryText="Recipes Hub" onTouchTap={() => browserHistory.push('/search')} />
        <MenuItem primaryText="My Recipes" onTouchTap={() => browserHistory.push('/recipes')} />
        <MenuItem primaryText="My Ingredients" onTouchTap={() => browserHistory.push('/ingredients')} />
      </IconMenu>
    }
    iconElementRight={<UserInfo />}
  />
);

export default MyAppBar;
