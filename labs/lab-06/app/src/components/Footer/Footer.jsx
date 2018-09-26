import React from 'react';
import './Footer.css';

const defaultProps = {
    footerInfo: 'II Openathon Custom Open Cloud'
};

class Footer extends React.PureComponent {
    render() {
        return (
            <div className="Footer">
                <p className="Footer__info">
                    {this.props.footerInfo}
                </p>
            </div>
        );
    }
}

Footer.defaultProps = defaultProps;
export default Footer;
