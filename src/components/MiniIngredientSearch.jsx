import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import ActionSearch from 'material-ui/svg-icons/action/search';
import IconButton from 'material-ui/IconButton';
import { searchIngredients } from '../api';

class MiniIngredientSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };

    [this.onChange, this.onSearchPressed].forEach(f => {
      this[f.name] = f.bind(this);
    });
  }

  onSearchPressed(e) {
    console.log('hello=', e);
    searchIngredients(this.state.searchText).then(res => console.log(res));
  }

  onChange(e) {
    this.setState({
      searchText: e.target.value,
    });
  }

  render() {
    return (
      <form onSubmit={this.onSearchPressed}>
        <TextField hintText="cilantro" onChange={this.onChange} />
        <IconButton tooltip="Search" onClick={this.onSearchPressed} tooltipPosition="top-right">
          <ActionSearch />
        </IconButton>
      </form>
    );
  }
}

export default MiniIngredientSearch;
