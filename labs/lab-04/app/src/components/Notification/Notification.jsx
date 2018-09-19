import React from 'react';
import './Notification.css';

const defaultProps = {
    type: 'info',
    message: ''
}

class Notification extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            opened: true
        }
        this.closeNotification = this.closeNotification.bind(this);
    }

    closeNotification() {
        this.setState({ opened: false });
    }

    render() {
        const element = this.state.opened &&
            <div className="Notification">
                <div className={`Notification-message Notification-${this.props.type}`}>
                    {this.props.message}
                    <div className="Notification-close"
                        onClick={this.closeNotification}
                    />
                </div>
            </div>;
        return element;
    }
}

Notification.defaultProps = defaultProps;

export default Notification;
