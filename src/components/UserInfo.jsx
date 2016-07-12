import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import * as consts from '../constants';
import CountrySelector from './CountrySelector.jsx';

const UserInfo = ({ user }) => (
  <div className="user-info">
    {user.userId ?
      <div>
        <div className="user-info__display-name">{user.displayName}</div>
        <Avatar className="user-info__avatar" src={user.photoURL} />
        <CountrySelector currLocale={user.locale} /> {consts.getLocaleName(user.locale)}
      </div>
      :
      <div>
        <div className="user-info__display-name">Anonymous</div>
        <div className="user-info__locale">
          <CountrySelector currLocale={user.locale} /> {consts.getLocaleName(user.locale)}
        </div>
      </div>
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
