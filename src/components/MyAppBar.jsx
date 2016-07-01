import React from 'react';
import AppBar from 'material-ui/AppBar';
import UserInfo from '../containers/UserInfo.jsx';

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
    title={<span style={styles.title}>Recetas Redux</span>}
    iconElementRight={<UserInfo />}
  />
);

export default MyAppBar;
