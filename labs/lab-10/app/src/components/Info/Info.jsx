import React from 'react';
import PropTypes from 'prop-types';
import './Info.css';

const defaultProps = {
    title: 'About Accenture',
    data: null
};

class Info extends React.PureComponent {
    render() {
        return (
            <article className="Info">
                <header className="Info__header">
                    <h1>{this.props.title}</h1>
                </header>
                <section className="Info__content">
                {Object.keys(this.props.data).map((field) => {
                    let infoContent;
                    if (field === 'link') {
                        infoContent = (
                            <p key={`general-${field}`}
                                className={`Info__${field}`}>
                                <a href="{this.props.data[field]}">Visit our website</a>
                            </p>
                        );
                    } else if (field !== 'logo') {
                        infoContent = (
                            <p key={`general-${field}`}
                                className={`Info__${field}`}>
                                {this.props.data[field]}
                            </p>
                        );
                    }
                    return infoContent;
                })}
                </section>
            </article>
        );
    }
}

Info.defaultProps = defaultProps;

Info.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.objectOf(PropTypes.string).isRequired
}

export default Info;
