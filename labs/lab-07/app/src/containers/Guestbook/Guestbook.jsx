import React from 'react';
import { Form } from '../../components'
import './Guestbook.css'

class Guestbook extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            entries: []
        }
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(newEntry) {
        const entries = this.state.entries;
        entries.push(newEntry);
        this.setState({ entries });
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
                        submitForm={this.submitForm}
                    />
                    {this.state.entries.length > 0 ?
                        <div className="Guestbook__entries">
                            <header>
                                <h3>Guestbook Entries</h3>
                            </header>
                            <section>
                                {this.state.entries.map((entry, i) => {
                                    return(
                                        <article key={`entry-${i}`}
                                            className="Guestbook__entry"
                                        >
                                            {Object.keys(entry).map(key => {
                                                return (
                                                <p key={`entry-${i}-${key}`}>{entry[key]}</p>
                                                );
                                            })}
                                        </article>
                                    );
                                })}
                            </section>
                        </div>
                        : <div className="Guestbook__entries Guestbook__entries--empty">
                            <p>No entries yet</p>
                        </div>
                    }
                </section>
            </div>
        );
    }
}

export default Guestbook;
