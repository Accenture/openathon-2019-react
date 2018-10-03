import React from 'react';
import { Info, ListBasic, Loader, Notification } from '../../components';
import { Get } from '../../services/api';
import './Home.css';

class Home extends React.Component {
    render() {
        return (
            <div className="Home" location={this.props.location}>
                <div className="Home__info">
                    <Get url="general" method="get" fetchAfterMount>
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
                            if (data) {
                                return (
                                    <Info title="About Accenture" data={data} />
                                );
                            }
                            return <Loader />;
                        }}
                    </Get>
                </div>
                <div className="Home__list">
                    <div className="Home__services">
                        <Get url="services" fetchAfterMount>
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
                                if (data) {
                                    return (
                                        <ListBasic title="Services"
                                            data={data}
                                            fields={['name', 'description', 'image', 'internal_link']}
                                        />
                                    );
                                }
                                return <Loader />;
                            }}
                        </Get>
                    </div>
                    <div className="Home__innovation">
                        <Get url="innovation" fetchAfterMount>
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
                                if (data) {
                                    return (
                                        <ListBasic title="Innovation"
                                            data={data}
                                            fields={['image']}
                                            layout="grid"
                                        />
                                    );
                                }
                                return <Loader />;
                            }}
                        </Get>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
