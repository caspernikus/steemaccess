import React, { PropTypes } from 'react';
import { injectIntl, FormattedMessage, intlShape } from 'react-intl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Button, Popover, Icon } from 'antd';
import * as actions from '../actions/appLocale';
import locales from '../../helpers/locales.json';
import './Index.less';

const LanguageItem = ({ setLocale, locale }) => (
  <li>
    <button onClick={() => setLocale(locale)}>
      {locales[locale]}
    </button>
  </li>
);
LanguageItem.propTypes = {
  setLocale: PropTypes.func,
  locale: PropTypes.string,
};

@connect(
  state => ({
    locale: state.appLocale.locale,
  }),
  dispatch =>
    bindActionCreators(
      {
        setLocale: actions.setLocale,
      },
      dispatch,
    ),
)
class Index extends React.Component {
  static propTypes = {
    form: PropTypes.shape(),
    intl: intlShape.isRequired,
    setLocale: PropTypes.func,
    locale: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { form: { getFieldDecorator }, setLocale, locale, intl } = this.props;
    return (
      <div>
        <div id="header">
          <div className="lp-container">
            <div id="menu">
              <div className="menu-item">
                <Button href="/dashboard">
                  <a href="/dashboard" rel="noopener noreferrer" target="_blank">
                    <FormattedMessage id="lp_dashboard_button" />
                  </a>
                </Button>
              </div>
              <div className="menu-item">
                <Popover
                  placement="bottom"
                  content={
                    <ul className="lp-language-select">
                      <LanguageItem locale="en" setLocale={setLocale} />
                    </ul>
                  }
                  trigger="click"
                >
                  <Button>{locales[locale]}<Icon type="down" /></Button>
                </Popover>
              </div>
            </div>
            <div className="logo-big">
              <object data="img/onlylogowhite.svg" type="image/svg+xml" />
            </div>
            <h3 className="title"><FormattedMessage id="lp_hero_title" /></h3>
            <h3 className="title medium-text"><FormattedMessage id="lp_hero_subtitle_1" /></h3>
            <h3 className="title medium-text"><FormattedMessage id="lp_hero_subtitle_2" /></h3>
          </div>
        </div>

        <div className="steem-features-container">
          <div className="lp-container steem-features">
            <div className="steem-feature">
              <object data="img/find_steem.svg" type="image/svg+xml" />
              <strong className="feature-title">
                <FormattedMessage id="lp_feature_1_title" />
              </strong>
              <p className="feature-desc">
                <FormattedMessage id="lp_feature_1_description" />
              </p>
            </div>
            <div className="steem-feature">
              <object data="img/access_bc.svg" type="image/svg+xml" />
              <strong className="feature-title">
                <FormattedMessage id="lp_feature_2_title" />
              </strong>
              <p className="feature-desc">
                <FormattedMessage id="lp_feature_2_description" />
              </p>
            </div>
            <div className="steem-feature">
              <object data="img/multi_account.svg" type="image/svg+xml" />
              <strong className="feature-title">
                <FormattedMessage id="lp_feature_3_title" />
              </strong>
              <p className="feature-desc">
                <FormattedMessage id="lp_feature_3_description" />
              </p>
            </div>
          </div>
          <div className="lp-container steem-features">
            <div className="steem-feature">
              <object data="img/friendlists.svg" type="image/svg+xml" height="150px" />
              <strong className="feature-title">
                <FormattedMessage id="lp_feature_4_title" />
              </strong>
              <p className="feature-desc">
                <FormattedMessage id="lp_feature_4_description" />
              </p>
            </div>
            <div className="steem-feature">
              <object data="img/notifications.svg" type="image/svg+xml" />
              <strong className="feature-title">
                <FormattedMessage id="lp_feature_5_title" />
              </strong>
              <p className="feature-desc">
                <FormattedMessage id="lp_feature_5_description" />
              </p>
            </div>
          </div>
        </div>

        <div className="safe-secure-container">
          <div className="lp-container safe-secure">
            <div>
              <object data="img/safe_secure.svg" type="image/svg+xml" height="200px" />
            </div>
            <div>
              <span className="small-title">
                <FormattedMessage id="lp_section_2_tag" />
              </span>
              <h3><FormattedMessage id="lp_section_2_title" /></h3>
              <p><FormattedMessage id="lp_section_2_description" /></p>
            </div>
          </div>
        </div>

        <div className="lp-container learn-more">
          <span className="small-title">
            <FormattedMessage id="lp_section_3_tag" />
          </span>
          <h3><FormattedMessage id="lp_section_3_title" /></h3>
        </div>

        <div className="lp-container project">
          <div className="project-item">
            <object data="img/open_source.svg" type="image/svg+xml" height="80px" />
            <div>
              <h4 className="project-title"><FormattedMessage id="lp_opensource_title" /></h4>
              <p><FormattedMessage id="lp_opensource_description" /></p>
              <a href="https://github.com/caspernikus/steemaccess" target="_blank" rel="noreferrer noopener" className="lp-link">
                <FormattedMessage id="lp_opensource_button" />
              </a>
            </div>
          </div>
          <div className="project-item">
            <object data="img/build.svg" type="image/svg+xml" height="80px" />
            <div>
              <h4 className="project-title"><FormattedMessage id="lp_developers_title" /></h4>
              <p><FormattedMessage id="lp_developers_description" /></p>
              <a href="/dashboard" rel="noopener noreferrer" target="_blank" className="lp-link">
                <FormattedMessage id="lp_developers_button" />
              </a>
            </div>
          </div>
        </div>

        <div className="lp-container footer-menu">
          <ul>
            <li><FormattedMessage id="lp_footer" /></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Form.create()(
  injectIntl(Index)
);
