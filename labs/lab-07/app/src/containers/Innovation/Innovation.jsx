import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ListBasic, ListItemDetail, Loader, Notification } from '../../components';
import { Fetch } from '../../services/api';
import './Innovation.css';

const FETCH_OPTIONS = {
    method: 'GET',
    headers: {}
};

class Innovation extends React.Component {
    render() {
        const match = this.props.match;
        return (
            <div className="Innovation" location={this.props.location}>
                <header className="Innovation__header">
                    <h1>Innovation</h1>
                </header>
                <section className="Innovation__container">
                <Fetch path="innovation" options={FETCH_OPTIONS}>
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
                                    <section className="Innovation__content">
                                        <div className="Innovation__list">
                                            <ListBasic data={data}
                                                fields={['image', 'internal_link']}
                                                layout="grid"
                                                url={`${match.url}/`}
                                            />
                                        </div>
                                        <Switch>
                                            <Route exact path={`${match.url}`} render={() => {
                                                return (
                                                    <div className="Innovation__detail Innovation__detail--empty">
                                                        <p>Select an Innovation from the list</p>
                                                    </div>
                                                );
                                            }} />
                                            <Route path={`${match.url}/:id`} render={(props) => {
                                                const itemData = data.filter(item => item.id.toString() === props.match.params.id)
                                                return (
                                                    <div className="Innovation__detail">
                                                        {itemData.length ?
                                                            <ListItemDetail data={itemData[0]}
                                                                fields={['image_alt', 'name', 'description', 'external_link']}
                                                            />
                                                            :
                                                            <div className="Innovation__detail Innovation__detail--empty">
                                                                <p>The Innovation does not exist</p>
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
                    </Fetch>
                </section>
            </div>
        );
    }
}

export default Innovation;
