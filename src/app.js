/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { Icon, Layout, Menu } from 'antd';
import Header from './widgets/Header';
import SteemitAvatar from './widgets/SteemitAvatar';

export default class App extends PureComponent {
  static propTypes = {
    children: PropTypes.shape(),
    auth: PropTypes.shape({
      user: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
  }

  render() {
    const { children, auth } = this.props;

    return (
      <Layout style={{ minHeight: '100%' }} >
        <Layout.Sider
          collapsed={true}
        >
          <Menu selectable={false} theme="dark" mode="inline" style={{ minHeight: '100%', backgroundColor: '#001529' }}>
            <Header username={this.props.auth.user.name} />
            <Menu.Item key="1">
              <Link to="/apps"><Icon type="appstore-o" /></Link>
              <span> <FormattedMessage id="applications" /> </span>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/apps/authorized"><Icon type="appstore" /></Link>
              <span> <FormattedMessage id="authorized_apps" /> </span>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/apps/me"><Icon type="code-o" /></Link>
              <span> <FormattedMessage id="my_apps" /> </span>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/docs/oauth2"><Icon type="share-alt" /></Link>
              <span> <FormattedMessage id="oauth2" /> </span>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/friends/me"><Icon type="team" /></Link>
              <span> My Friends </span>
            </Menu.Item>
          </Menu>
        </Layout.Sider>
        <Layout>
          <Layout.Content>
            {React.cloneElement(
              children,
              { auth }
            )}
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}
