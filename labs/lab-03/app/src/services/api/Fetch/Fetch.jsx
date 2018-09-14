import React from 'react';

class Fetch extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data: null,
            loading: false,
            error: null
        };
    }

    async fetchData() {
        this.setState({ loading: true });
        try {
            const data = await (await fetch(this.props.path, this.props.options)).json();
            this.setState({ data });
        } catch (error) {
            this.setState({ error });
        }
        this.setState({ loading: false });
    }

    componentDidMount() {
        this.fetchData(this.props.path, this.props.options);
    }

    render() {
        return this.props.children(
            {
                data: this.state.data,
                loading: this.state.loading,
                error: this.state.error,
                fetchData: this.fetchData
            }
        );
    }
}

export default Fetch;
