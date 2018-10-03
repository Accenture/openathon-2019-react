import React from 'react';
import { Menu, Loader, Notification } from '../../components';
import { Get } from '../../services/api';
import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <div className="Header">
                <div className="Header__logo">
                    {
                    <Get url="general" fetchAfterMount>
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
                    </Get>
                    }
                </div>
                <h1 className="Header__title">II OPENATHON Custom Open Cloud</h1>
                <Menu />
            </div>
        );
    }
}

export default Header;
