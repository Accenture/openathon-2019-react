import React from 'react';
import { Menu, Loader, Notification } from '../../components';
import { Fetch } from '../../services/api';
import './Header.css';

const FETCH_OPTIONS = {
    method: 'GET',
    headers: {}
};

class Header extends React.Component {
    render() {
        return (
            <div className="Header">
                <div className="Header__logo">
                    {
                    <Fetch path={'general'} options={FETCH_OPTIONS}>
                        {({ data, loading, error }) => {
                            if (error) {
                                return (
                                    <Notification type="error"
                                        message= {error.message}
                                    />
                                );
                            }
                            if (loading) {
                                return <Loader />;
                            }
                            if (data && data.logo) {
                                return (
                                    <img alt="Accenture Logo"
                                        src={data.logo}
                                    />
                                );
                            }
                            return <Loader />;
                        }}
                    </Fetch>
                    }
                </div>
                <h1 className="Header__title">II OPENATHON Custom Open Cloud</h1>
                <Menu />
            </div>
        );
    }
}

export default Header;
