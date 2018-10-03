import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ListBasic, ListItemDetail, Loader, Notification } from '../../components';
import { Get } from '../../services/api';
import './Services.css';

class Services extends React.Component {
    render() {
        const match = this.props.match;
        return (
            <div className="Services" location={this.props.location}>
                <header className="Services__header">
                    <h1>Services</h1>
                </header>
                <div className="Services__container">
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
                                    <section className="Services__content">
                                        <div className="Services__list">
                                            <ListBasic data={data}
                                                fields={['image', 'internal_link']}
                                                url={`${match.url}/`}
                                            />
                                        </div>
                                        <Switch>
                                            <Route exact path={`${match.url}`} render={() => {
                                                return (
                                                    <div className="Services__detail Services__detail--empty">
                                                        <p>Select a Service from the list</p>
                                                    </div>
                                                );
                                            }} />
                                            <Route path={`${match.url}/:id`} render={(props) => {
                                                const itemData = data.filter(item => item.id.toString() === props.match.params.id)
                                                return (
                                                    <div className="Services__detail">
                                                        {itemData.length ?
                                                            <ListItemDetail data={itemData[0]}
                                                                fields={['image', 'detail', 'external_link']}
                                                            />
                                                            :
                                                            <div className="Services__detail Services__detail--empty">
                                                                <p>The Service does not exist</p>
                                                            </div>
                                                        }
                                                    </div>
                                                );
                                            }} />
                                        </Switch>
                                    </section>
                                );
                            }
                            return <Loader />;
                        }}
                    </Get>
                </div>
            </div>
        );
    }
}

export default Services;
