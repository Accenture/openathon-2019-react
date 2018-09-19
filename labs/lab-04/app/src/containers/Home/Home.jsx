import React from 'react';

class Home extends React.Component {
    render() {
        return (
            <div className="Home" location={this.props.location}>
                Home Page
            </div>
        );
    }
}

export default Home;
