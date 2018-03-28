import React, { PropTypes } from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import steem from '@steemit/steem-js';
import { Form, Icon, Input, Button } from 'antd';
import { accountExist } from '../../utils/validator';
import './Sign.less';

class SelectAccount extends React.Component {
  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func,
      getFieldValue: PropTypes.func,
    }),
    intl: intlShape.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      selecting: false,
    };
  }

  componentWillMount() {
    this.setState({ selecting: false });
  }

  onClick(username) {
    this.setState({ selecting: true });
    
    this.props.parentCallback(username);
  }

  getAllAccounts() {
    const tokens = JSON.parse(localStorage.getItem('tokens'));
    const usernames = Object.keys(tokens);

    let formData = [];

    usernames.forEach((username) => {
      formData.push(
        <Form.Item>
          <Button type="default" onClick={this.onClick.bind(this, username)} className="SignForm__button_default" icon="user">
            {username}
          </Button>
        </Form.Item>
      );
    });

    return formData;
  }

  render() {
    const { form: { getFieldDecorator }, intl } = this.props;
    const title = this.props.title ? this.props.title : <FormattedMessage id="sign_in" />;
    const accountsItem = this.getAllAccounts();
    return (
      <Form onSubmit={this.handleSubmit} className="SignForm">
        <h5>Select Account</h5>
        <p>We recognised you already used our service, please select an account or login with a new one.</p>
        {accountsItem}
        <Form.Item>
          <Button type="primary" onClick={this.onClick.bind(this, "")} className="SignForm__button">
            Log In
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(injectIntl(SelectAccount));
