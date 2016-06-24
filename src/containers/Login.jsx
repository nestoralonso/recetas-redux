import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginProcess } from '../actions'

import {
  Card,
  CardText,
  RaisedButton
} from 'material-ui';


class Login extends Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    return (
      <Card
        style={{
          'maxWidth': '800px',
          'margin': '30px auto',
          'padding': '50px'
      }}>
        <CardText
          style={{ 'textAlign': 'center' }}>
          To start using this app Login
        </CardText>

        <RaisedButton
          style={{ display: 'block' }}
          onClick={this.onClick}
          label="Log in with Google"
          primary={true}/>
      </Card>

    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onClick: () => dispatch(loginProcess())
  };
}
export default connect(null, mapDispatchToProps)(Login);
