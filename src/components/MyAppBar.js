import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';


const styles = {
  title: {
    cursor: 'pointer',
  },
  buttons: {
    color: 'white'
  }
};
const MyAppBar = () => {
  const appBarButtons = <span style={styles.buttons}>
    <FlatButton label="Recipes" containerElement={<Link to="/recipes" />} />
    <FlatButton label="About"  containerElement={<Link to="/about" />} />
  </span>;

  return (
    <AppBar
      title={<span style={styles.title}>Recetas Redux</span>} />
  );
};

export default MyAppBar;
