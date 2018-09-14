import React from 'react';
import { Menu } from '../../components';
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
                <div className="Header-logo">
                    {/*
                    // TODO: Fetching in React Router Loop
                    <Fetch path={'general'} options={FETCH_OPTIONS}>
                        {({ data, loading, error }) => {
                            if (data && data.logo) {
                                return <Header logo={data.logo} />
                            }
                            return <p>No data yet ...</p>;
                        }}
                    </Fetch>
                    */}
                </div>
                <h1 className="Header-title">Accenture - II OPENATHON Custom Open Cloud</h1>
                <Menu />
            </div>
        );
    }
}

export default Header;
