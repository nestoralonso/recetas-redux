import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import ActionSearch from 'material-ui/svg-icons/action/search';
import IconButton from 'material-ui/IconButton';
import { searchIngredients } from '../../api';
import PersonAdd from 'material-ui/svg-icons/social/person-add';

const styles = {
  menuItem: {
    width: '14em',
  },
};
class MiniIngredientSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      showPop: false,
      popupAnchorEl: null,
      searchResults: [],
    };

    [this.onChange, this.onSearchPressed,
    this.handleTouchTap, this.handleRequestClose].forEach(f => {
      this[f.name] = f.bind(this);
    });
  }

  onSearchPressed(e) {
    e.preventDefault();
    this.setState({
      showPop: true,
      popupAnchorEl: ReactDOM.findDOMNode(this.refs.searchTF),
    });

    const { searchText } = this.state;
    searchIngredients(searchText).then(res => {
      const apiIngredients = this.resultsAsList(res);

      apiIngredients.push({
        key: `key-${searchText}`,
        value: {
          name: `${searchText}`,
          isNew: true,
        },
      });
      this.setState({
        searchResults: apiIngredients,
      });
    });
  }

  onChange(e) {
    this.setState({
      searchText: e.target.value,
    });
  }

  handleTouchTap(e, menuItem) {
    this.setState({
      showPop: false,
      searchText: '',
    });
    this.props.onIngredientSelected(menuItem.props.ingredient, menuItem.key);
  }

  /**
   * For handling the Popover close
   */
  handleRequestClose() {
    // Only take into account the Popover clickAway when we are
    // not focusing the TextField.
    this.setState({
      showPop: false,
    });
  }

  /**
   * @param {Object} response a key-value object of the api results
   *
   * @returns {Array} a list representation of the above to be consumable by map
   */
  resultsAsList(response) {
    return Object.keys(response).map(key => ({ key, value: response[key] }));
  }

  render() {
    return (
      <form onSubmit={this.onSearchPressed}>
        <TextField ref="searchTF" hintText="cilantro" onChange={this.onChange} />
        <IconButton tooltip="Search" onClick={this.onSearchPressed} tooltipPosition="top-right">
          <ActionSearch />
        </IconButton>

        <Popover
          open={this.state.showPop}
          anchorEl={this.state.popupAnchorEl}
          onRequestClose={this.handleRequestClose}
          useLayerForClickAway={false}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        >
          <Menu
            ref="menu"
            autoWidth={false}
            style={styles.menu}
            onItemTouchTap={this.handleTouchTap}
          >
            {this.state.searchResults.map(entry =>
              <MenuItem
                key={entry.key}
                style={styles.menu}
                ingredient={entry.value}
                primaryText={entry.value.isNew ?
                  `create new ingredient "${entry.value.name}"`
                  : entry.value.name}
                leftIcon={entry.value.isNew ? <PersonAdd /> : null}
              />
            )}
          </Menu>
        </Popover>
      </form>
    );
  }
}
MiniIngredientSearch.propTypes = {
  onIngredientSelected: PropTypes.func.isRequired,
};

export default MiniIngredientSearch;
