import React, { Component } from 'react';
import { Header, Footer } from '../../components';
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
                            return <p>{error.message}</p>;
                        }
                        if (loading) {
                            return <p>Loading ...</p>;
                        }
                        if (data && data.logo) {
                            return <Header logo={data.logo} />
                        }
                        return <p>No data yet ...</p>;
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
