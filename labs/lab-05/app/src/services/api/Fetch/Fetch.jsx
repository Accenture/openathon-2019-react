import React from 'react';

const API_HOST = 'http://localhost:3001/';

class Fetch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            loading: false,
            error: null
        };
    }

    fetchData = async() => {
        this.setState({ loading: true });
        try {
            const data = await (await fetch(`${API_HOST}${this.props.path}`, this.props.options)).json();
            this.setState({ data, loading: false});
        } catch (error) {
            this.setState({ error, loading: false});
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return this.props.children(this.state);
    }
}

export default Fetch;
