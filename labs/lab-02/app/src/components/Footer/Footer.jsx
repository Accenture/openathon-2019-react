import React from 'react';
import './Footer.css';

const defaultProps = {
    footerInfo: 'Copyright 2001-2018 Accenture. All rights reserved. Accenture Confidential. For internal use only.'
};

class Footer extends React.PureComponent {
    render() {
        return (
            <div className="Footer">
                <p className="Footer-info">
                    {this.props.footerInfo}
                </p>
            </div>
        );
    }
}

Footer.defaultProps = defaultProps;
export default Footer;
