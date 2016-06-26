import React, { Component } from 'react';
import { connect } from 'react-redux';

const UserInfo = ({user}) => {
  return (
    <div>
      {user? user.displayName: null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, null)(UserInfo);;
