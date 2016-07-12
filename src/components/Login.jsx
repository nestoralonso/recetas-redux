import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loginProcess } from '../actions';

import {
  Card,
  CardText,
  RaisedButton,
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
    const { user } = this.props;
    return (
      <Card
        style={{
          maxWidth: '800px',
          margin: '30px auto',
          padding: '50px' }}
      >
        {user.displayName == null ?
          <div>
            <CardText
              style={{ textAlign: 'center' }}
            >
              To start using Recipes-redux you have to sigin first
            </CardText>

            <RaisedButton
              style={{ display: 'block' }}
              onClick={this.onClick}
              label="Log in with Google"
              primary
            />
          </div>
        :
          <CardText
            style={{ textAlign: 'center' }}
          >
            You are already logged as {user.displayName}
          </CardText>
      }
      </Card>

    );
  }
}
Login.propTypes = {
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
const mapStateToProps = (state) => ({
  user: state.user,
});

function mapDispatchToProps(dispatch) {
  return {
    onClick: () => dispatch(loginProcess()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
