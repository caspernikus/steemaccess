import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import SteemitAvatar from './SteemitAvatar';
import './Header.less';

const Header = ({ username }) =>
  <div className="Header">
    {username &&
        <Link to="/dashboard">
          <SteemitAvatar username={username} />
        </Link>
      }
  </div>;

Header.propTypes = {
  username: PropTypes.string,
};

export default Header;
