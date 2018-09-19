import React, { Component } from 'react';
import { Header, Footer, Loader, Notification } from '../../components';
import { Fetch } from '../../services/api';

const FETCH_OPTIONS = {
    method: 'GET',
    headers: {}
};

class App extends Component {
    render() {
        return (
            <div className="App">
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
                            return <Header logo={data.logo} />
                        }
                        return <Loader />;
                    }}
                </Fetch>
                <p className="Main">
                    Main content
                </p>
                <Footer />
            </div>
        );
    }
}

export default App;
