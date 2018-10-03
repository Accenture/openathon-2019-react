import React from 'react';
import PropTypes from 'prop-types';
import { Loader, Notification } from '../../components';
import { Post } from '../../services/api';
import './Form.css';

const defaultProps = {
    className: ''
}

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fields: [
                {id:'1', value:'', metadata: { label: 'Name', type: 'text' }},
                {id:'2', value:'', metadata: { label: 'Comment', type: 'textarea' }}
            ]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const updatedFields = this.state.fields.map(field => {
            if(field.id === event.target.id)
               return Object.assign({}, field, {value: event.target.value})
            return field
        });
        this.setState({ fields: updatedFields });
    }

    handleSubmit(e, submitForm) {
        e.preventDefault();
        if(submitForm && {}.toString.call(submitForm) === '[object Function]') {
            const entry = {};
            this.state.fields.map(field => entry[field.metadata.label.toLowerCase()] = field.value);
            submitForm({data: entry});
        } else {
            const formValues = this.state.fields.reduce((result, field) => {
                result += `${field.metadata.label.toLowerCase()}: ${field.value}\n`;
                return result;
            }, '');
            alert('A new form was submitted\n' + formValues);
        }
        const resetFields = this.state.fields.map(field => Object.assign({}, field, {value: ''}));
        this.setState({ fields: resetFields });
    }

    render() {
        return (
            <div className={`Form ${this.props.className}`}>
                {this.props.title &&
                    <header className="Form__title">
                        <h3>{this.props.title}</h3>
                    </header>
                }
                <Post url={this.props.requestUrl} fetchAfterMount={false}>
                    {({ data, loading, error, onReload }) => {
                        return (
                            <form onSubmit={(e) => this.handleSubmit(e, onReload)}>
                                {this.state.fields.map((field) => {
                                    if (field.id === '1') {
                                        return (
                                            <div key={`input-${field.id}`} className="Form__row">
                                                <label>{field.metadata.label}</label>
                                                <input type="text" id={field.id} value={field.value} onChange={this.handleChange} required />
                                            </div>
                                        );
                                    } else if (field.id === '2') {
                                        return (
                                            <div key={`input-${field.id}`} className="Form__row">
                                                <label>{field.metadata.label}</label>
                                                <textarea id={field.id} value={field.value} onChange={this.handleChange} required />
                                            </div>
                                        );
                                    } else {
                                        return null;
                                    }
                                })}
                                <section className="Form__submit">
                                    <button className="Form__button" type="submit">
                                        Save Entry
                                    </button>
                                    {error &&
                                        <Notification type="error"
                                            message= {error.message}
                                        />
                                    }
                                    {loading &&
                                        <Loader />
                                    }
                                    {data &&
                                        <span className="Form__message--success">Data Saved</span>
                                    }
                                </section>
                            </form>
                        );
                    }}
                </Post>
            </div>
            );
    }
}

Form.defaultProps = defaultProps;

Form.propTypes = {
    requestUrl: PropTypes.string.isRequired,
}

export default Form;
