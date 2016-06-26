import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import ActionSearch from 'material-ui/svg-icons/action/search';
import IconButton from 'material-ui/IconButton';
import { searchIngredients } from '../api';


class MiniIngredientSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      showPop: false,
      popupAnchorEl: null,
      searchResults: {},
    };

    [this.onChange, this.onSearchPressed].forEach(f => {
      this[f.name] = f.bind(this);
    });
  }

  onSearchPressed() {
    this.setState({
      showPop: true,
      popupAnchorEl: ReactDOM.findDOMNode(this.refs.searchTF),
    });

    console.log('this.refs.searchTF=', this.refs.searchTF);
    searchIngredients(this.state.searchText).then(res => {
      this.setState({
        searchResults: res,
      });
    });
  }

  onChange(e) {
    this.setState({
      searchText: e.target.value,
    });
  }

  handleTouchTap(e, menuItem) {
    console.log('tapa tapa', menuItem, menuItem.key);
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
          useLayerForClickAway={false}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        >
          <Menu
            ref="menu"
            autoWidth={false}
            onItemTouchTap={this.handleTouchTap}
          >
            {Object.keys(this.state.searchResults).map(keyIng =>
              <MenuItem
                key={keyIng}
                ingredient={this.state.searchResults[keyIng]}
                primaryText={this.state.searchResults[keyIng].name}
              />
            )}
          </Menu>
        </Popover>
      </form>
    );
  }
}

export default MiniIngredientSearch;
