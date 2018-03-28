import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { login } from '../../utils/auth';
import SignForm from '../Form/Sign';
import SelectAccountForm from '../Form/SelectAccount';
import Loading from '../../widgets/Loading';
import './Login.less';

export default class Login extends Component {
  static propTypes = {
    location: PropTypes.shape({
      query: PropTypes.shape({
        next: PropTypes.string,
      }),
    }),
  };

  constructor(props) {
    super(props);

    const tokens = JSON.parse(localStorage.getItem('tokens'));

    if (!tokens) { 
      this.state = {
        step: 2,
        success: false,
        username: "",
      };
      return; 
    }

    this.state = {
      step: 1,
      success: false,
      username: "",
    };
  }

  resetForm = () => {
    this.setState({
      step: 0,
      success: false,
      username: "",
    });
  };

  handleSubmit = (auth) => {
    const { next } = this.props.location.query;
    this.setState({ step: 3 });
    login({ ...auth }, () => {
      window.location = next || '/dashboard';
    });
  };

  accountSelected(account) {
    this.setState({ 
      step: 2,
      username: account,
    });
  };

  render() {
    const { step } = this.state;

    return (
      <div className="Sign">
         <div className="Sign_frame">
            <div className="Sign__header">
              <object data="/img/logoblacktext.svg" type="image/svg+xml" id="logo"  style={{ height: '40px' }} />
            </div>
            <div className="Sign__wrapper">
              {step === 1 && <SelectAccountForm parentCallback={this.accountSelected.bind(this)} />}
              {step === 2 && <SignForm title={<FormattedMessage id="log_in" />} username={this.state.username} roles={['memo', 'posting']} sign={this.handleSubmit} />}
              {step === 3 && <Loading />}
            </div>
          </div>
      </div>
    );
  }
}
