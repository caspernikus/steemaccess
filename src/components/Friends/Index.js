import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Icon, Card, Col, Row } from 'antd';
import { logout } from '../actions/auth';
import { getActiveToken } from '../reducers/auth';

@connect(
  state => ({
    auth: state.auth,
  }),
)
export default class Index extends Component {
  static propTypes = {
    logout: PropTypes.func,
    auth: PropTypes.shape({
      user: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({ isLoaded: false });
    const token = getActiveToken();

    fetch('/api/friends/me', {
      method: 'POST',
      headers: new Headers({ Authorization: token }),
    })
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      this.setState({ isLoaded: true });
    })
    .catch(() => {
    });
  }

  render() {
    return (
      <div className="container my-4">
        <h4><FormattedMessage id="dashboard" /></h4>
        <Link onClick={this.handleLogoutClick}><FormattedMessage id="log_out" /></Link>
        <br />
        <br />
      </div>
    );
  }
}
