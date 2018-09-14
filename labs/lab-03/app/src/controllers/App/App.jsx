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
                <Fetch path={'general'} fetchOptions={FETCH_OPTIONS}>
                    {({ data }) => {
                        if (data && data.logo) {
                            return <Header logo={data.logo} />
                        }
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
