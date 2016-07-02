import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ActionSearch from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import * as axn from '../actions';


class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
    };
    this.onSearchPressed = this.onSearchPressed.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSearchPressed(e) {
    e.preventDefault();

    if (!this.props.onSearchPressed) return;
    this.props.onSearchPressed(this.state.text);
  }

  onChange(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    return (
      <form onSubmit={this.onSearchPressed}>
        <TextField hintText="" onChange={this.onChange} name="search" />
        <IconButton tooltip="Search" onClick={this.onSearchPressed} tooltipPosition="top-right">
          <ActionSearch />
        </IconButton>
      </form>
    );
  }
}
SearchBar.propTypes = {
  onSearchPressed: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    onSearchPressed: (query) => dispatch(axn.searchRecipes(query)),
  };
}

export default connect(null, mapDispatchToProps)(SearchBar);
