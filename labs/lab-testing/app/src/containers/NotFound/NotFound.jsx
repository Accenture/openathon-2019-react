import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'

class NotFound extends React.PureComponent {
    render() {
        return (
            <div className="NotFound">
                <p className="NotFound__title">404<br/>This page is not found</p>
                <p><Link to="/">Return to Home Page</Link></p>
            </div>
        );
    }
}

export default NotFound;
