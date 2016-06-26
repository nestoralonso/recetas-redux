import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import UserInfo from '../containers/UserInfo';

const styles = {
  title: {
    cursor: 'pointer',
  },
  buttons: {
    color: 'white'
  }
};
const MyAppBar = () => (
  <AppBar
    title={<span style={styles.title}>Recetas Redux</span>}
    iconElementRight={<UserInfo />} />
);

export default MyAppBar;
