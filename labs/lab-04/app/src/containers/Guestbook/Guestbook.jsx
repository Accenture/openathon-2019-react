import React from 'react';

    class Guestbook extends React.Component {
        render() {
            return (
                <div className="Guestbook" location={this.props.location}>
                    Guestbook Page
                </div>
            );
        }
    }

    export default Guestbook;
