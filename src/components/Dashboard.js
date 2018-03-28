import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Icon, Card, Col, Row } from 'antd';
import { logout } from '../actions/auth';
import { getActiveToken } from '../reducers/auth';
import Loading from '../widgets/Loading';

@connect(
  state => ({
    auth: state.auth,
  }),
  dispatch => bindActionCreators({
    logout,
  }, dispatch)
)
export default class Login extends Component {
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
    this.setState({ isLoading: true });
    const token = getActiveToken();

    fetch('/api/friends/me', {
      method: 'POST',
      headers: new Headers({ Authorization: token }),
    })
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      this.setState({ isLoading: false });
    })
    .catch(() => {
    });
  }

  handleLogoutClick = () => {
    this.props.logout();
  };

  render() {
    const { isLoading } = this.state;

    return (
      <div className="container my-4">
        <h4><FormattedMessage id="dashboard" /></h4>
        <Link onClick={this.handleLogoutClick}><FormattedMessage id="log_out" /></Link>
        <br />
        <br />
        <Row gutter={12}>
          <Col className="gutter-row" span={8}>
            <Card style={{ width: '100%' }}>
              <p>Card content</p>
              <p>Card content</p>
              <p>STEEM</p>
            </Card>
          </Col>
          <Col className="gutter-row" span={8}>
            <Card style={{ width: '100%' }}>
              <p>Card content</p>
              <p>Card content</p>
              <p>SBD</p>
            </Card>
          </Col>
          <Col className="gutter-row" span={8}>
            <Card style={{ width: '100%' }}>
              <p>Card content</p>
              <p>Card content</p>
              <p>SP</p>
            </Card>
          </Col>
        </Row>
        <br />
        <br />
        <Row gutter={12}>
          <Col className="gutter-row" span={12}>
            <Card title="My Activity" style={{ width: '100%' }}>
              <p>Card content</p>
            </Card>
          </Col>
          <Col className="gutter-row" span={12}>
            <Card title="My Friends" style={{ width: '100%' }}>
              {isLoading && <Loading />}
              {!isLoading && <p> No Friends found </p>}
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
