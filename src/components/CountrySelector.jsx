import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MapsPlace from 'material-ui/svg-icons/maps/place';


const CountrySelector = ({ dispatch, currLocale }) => (
  <IconMenu
    iconButtonElement={<IconButton><MapsPlace /></IconButton>}
    anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
    onItemTouchTap={(e, child) => {
      dispatch({ type: 'USER_LOCALE_CHANGED', locale: child.props.value });
    }}
    value={currLocale}
    maxHeight={272}
  >
    <MenuItem value="es-ar" primaryText="Argentina" />
    <MenuItem value="es-cl" primaryText="Chile" />
    <MenuItem value="es-co" primaryText="Colombia" />
    <MenuItem value="es-gt" primaryText="Guatemala" />
    <MenuItem value="es-mx" primaryText="Mexico" />
    <MenuItem value="es-pe" primaryText="Peru" />
    <MenuItem value="es-pr" primaryText="Puerto Rico" />
    <MenuItem value="es-ve" primaryText="Venezuela" />
    <MenuItem value="es-es" primaryText="Spain" />
  </IconMenu>
);
CountrySelector.propTypes = {
  currLocale: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currLocale: state.user.locale,
});

export default connect(
  mapStateToProps,
  null)(CountrySelector);
