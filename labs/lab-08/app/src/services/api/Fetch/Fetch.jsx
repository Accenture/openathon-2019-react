import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const defaultProps = {
    fetchAfterMount: true,
    url: null,
    method: 'get',
    baseURL: 'http://localhost:3001/',
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    }
}

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
        const { children, fetchAfterMount, ...requestConfig } = this.props;
        try {
            const response = await axios(requestConfig);
            this.setState({ data: response.data, loading: false});
        } catch (error) {
            this.setState({ error, loading: false});
        }
    }

    componentDidMount() {
        if (this.props.fetchAfterMount) this.fetchData();
    }

    render() {
        const {
            state: { data, loading, error },
            props: { children },
            fetchData
        } = this;

        return children({
            data,
            loading,
            error,
            fetchData
        });
    }
}

Fetch.defaultProps = defaultProps;

Fetch.propTypes = {
    url: PropTypes.string.isRequired
}

export default Fetch;
