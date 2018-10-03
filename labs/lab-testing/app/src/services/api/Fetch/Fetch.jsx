import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const defaultProps = {
    fetchAfterMount: false,
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
        this.fetchData = this.fetchData.bind(this);
        this.getRequestConfig = this.getRequestConfig.bind(this);
        this.onReload = this.onReload.bind(this);
    }

    fetchData = async(props) => {
        if (this._isMounted) {
            this.setState({ loading: true });
            try {
                const response = await axios(this.getRequestConfig(props));
                this.setState({ data: response.data, loading: false});
            } catch (error) {
                this.setState({ error, loading: false});
            }
        }
    }

    getRequestConfig(props) {
        return Object.assign({ baseURL: props.baseURL, url: props.url, method: props.method, data: props.data, params: props.params }, props.config)
    }

    onReload(props) {
        if (!this.state.loading) {
            this.fetchData(this.getRequestConfig(props ? Object.assign({}, this.props, props) : this.props));
        }
    }

    componentDidMount() {
        this._isMounted = true;
        if (this.props.fetchAfterMount) this.fetchData(this.getRequestConfig(this.props));
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const {
            state: { data, loading, error },
            props: { children },
            onReload
        } = this;

        return children({
            data,
            loading,
            error,
            onReload
        });
    }
}

Fetch.defaultProps = defaultProps;

Fetch.propTypes = {
    url: PropTypes.string.isRequired
}

export default Fetch;
