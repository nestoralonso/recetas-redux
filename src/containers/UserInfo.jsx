import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';

const UserInfo = ({ user }) => (
  <div className="user-info">
    {user.displayName ?
      <div>
        <div className="user-info__display-name">{user.displayName}</div>
        <Avatar className="user-info__avatar" src={user.photoURL} />
      </div>
      : 'Anonymous'
    }
  </div>
);

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(UserInfo);
