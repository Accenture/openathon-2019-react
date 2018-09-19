import React from 'react';
import './Info.css';

class Info extends React.PureComponent {
    render() {
        return (
            <article className="Info">
                <header className="Info-header">
                    <h1>{this.props.title}</h1>
                </header>
                <section>
                {Object.keys(this.props.data).map((field) => {
                    let infoContent;
                    if (field === 'link') {
                        infoContent = (
                            <p key={`general-${field}`}
                                className={`Info-${field}`}>
                                <a href="{this.props.data[field]}">Visit our website</a>
                            </p>
                        );
                    } else if (field !== 'logo') {
                        infoContent = (
                            <p key={`general-${field}`}
                                className={`Info-${field}`}>
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

export default Info;
