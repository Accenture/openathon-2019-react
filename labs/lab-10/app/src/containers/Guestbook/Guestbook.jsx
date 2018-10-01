import React from 'react';
import { Form, Loader, Notification } from '../../components';
import { Get }from '../../services/api';
import './Guestbook.css';

class Guestbook extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            entry: null,
            action: null,
        }
    }

    render() {
        return (
            <div className="Guestbook" location={this.props.location}>
                <header className="Guestbook__header">
                    <h1>Guestbook</h1>
                </header>
                <section className="Guestbook__content">
                    <Form className="Guestbook__form"
                        title="Guestbook Form"
                        requestUrl="guestbook"
                    />
                    <Get url="guestbook" fetchAfterMount>
                        {({ data, loading, error, onReload }) => {
                            return (
                                <section className="Guestbook__entries">
                                <header>
                                    <h3>Guestbook Entries</h3>
                                </header>
                                    <button className="Guestbook__refresh button"
                                        onClick={() => onReload({ params:{ refresh: true } })}>
                                        Refresh
                                    </button>
                                    {error &&
                                        <Notification type="error"
                                            message= {error.message}
                                        />
                                    }
                                    {loading &&
                                        <Loader />
                                    }
                                    {data && data.length > 0 ?
                                        <article>
                                            {data.map((entry, i) => {
                                                return(
                                                    <article key={`entry-${i}`}
                                                        className="Guestbook__entry"
                                                    >
                                                        {Object.keys(entry).map(key => {
                                                            return (
                                                                <div key={`entry-${i}-${key}`}>
                                                                {(key !== 'id') &&
                                                                    <p className={`Guestbook__entry__${key}`}>
                                                                        {entry[key]}
                                                                    </p>
                                                                }
                                                                </div>
                                                            );
                                                        })}
                                                    </article>
                                                );
                                            })}
                                        </article>
                                        : <div className="Guestbook__entries--empty">
                                            <p>No entries yet</p>
                                        </div>
                                    }
                                </section>
                            );
                        }}
                    </Get>
                </section>
            </div>
        );
    }
}

export default Guestbook;
