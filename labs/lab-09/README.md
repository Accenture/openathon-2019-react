# Lab 09 - Persisting data in your JSON Server

## Table of Contents

- [Posting Form Data to your JSON Server](#posting-form-data-to-your-json-server)

## Posting Form Data to your JSON Server

Using JSON Server, if you make a post request, changes will be automatically and safely saved to your `api.json` file. You can handle other methods such as DELETE and PUT in a similar way.

To persist the new entry into your mocked data, pass the new entry object as _data_ property. Let’s refactor your Form component to POST the content to the fake REST API:

1. Create a FetchWrapper component in `src\services\api\`:

    ```javascript
    /* FetchWrapper.jsx */

    import React from 'react';
    import Request from '../Fetch/Fetch';

    const FetchWrapper = (method) => {
        return (props) => (
            <Request {...props} method={method}>
                {props.children}
            </Request>
        )
    }

    export default FetchWrapper;
    ```

2. Import the new component in `src\services\api\index.jsx` and export as three new components _Get_, _Post_, and _Delete_ using FetchWrapper with different methods:

    ```javascript
    /* index.js */

    import Fetch from './Fetch/Fetch';
    import FetchWrapper from './FetchWrapper/FetchWrapper';
    const Delete = FetchWrapper('delete');
    const Get = FetchWrapper('get');
    const Post = FetchWrapper('post');

    export {
        Fetch,
        Delete,
        Get,
        Post
    };
    ```

3. In your `mockdata\api.json` file include a new `guestbook` endpoint:

    ```json
    /* api.json */

    "guestbook": [],
    ```

4. Refactor your Fetch component including `getRequestConfig` and `onReload` methods to allow the user fetch data when he _calls_ an action:

    ```javascript
    /* Fetch.jsx */

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
    ```

5. Refactor the Guestbook container using the new Get component:

    ```javascript
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

    ```

6. Reactor `Header.jsx`, `Home.jsx`, `Services.jsx` and `Innovation.jsx` using the Get component and adding `fetchAfterMount` property:

    ```javascript
    /* Header.jsx */
    import { Get } from '../../services/api';

    ...

    class Header extends React.Component {
        render() {
            return (
                <div className="Header">
                    <div className="Header__logo">
                        {
                        <Get url="general" fetchAfterMount>
                        ...
                        </Get>
                        }
                    </div>
                    <h1 className="Header__title">II OPENATHON Custom Open Cloud</h1>
                    <Menu />
                </div>
            );
        }
    }
    ```

    ```javascript
    /* Home.jsx */

    import { Get } from '../../services/api';

    ...

    class Home extends React.Component {
        render() {
            return (
                <div className="Home" location={this.props.location}>
                    <div className="Home__info">
                        <Get url="general" method="get" fetchAfterMount>
                        ...
                        </Get>
                    </div>
                    <div className="Home__list">
                        <div className="Home__services">
                            <Get url="services" fetchAfterMount>
                                ...
                            </Get>
                        </div>
                        <div className="Home__innovation">
                            <Get url="innovation" fetchAfterMount>
                                ...
                            </Get>
                        </div>
                    </div>
                </div>
            );
        }
    }
    ```

    ```javascript
    /* Services.jsx */

    import { Get } from '../../services/api';

    ...

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
                        ...
                        </Get>
                    </div>
                </div>
            );
        }
    }
    ```

    ```javascript
    /* Innovation.jsx */

    import { Get } from '../../services/api';

    ...

    class Innovation extends React.Component {
        render() {
            const match = this.props.match;
            return (
                <div className="Innovation" location={this.props.location}>
                    <header className="Innovation__header">
                        <h1>Innovation</h1>
                    </header>
                    <section className="Innovation__container">
                        <Get url="innovation" fetchAfterMount>
                        ...
                        </Get>
                    </section>
                </div>
            );
        }
    }
    ```

7. Refactor the Form component using `onReload`:

    ```javascript
    /* Form.jsx */

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

    ```

[< Prev](../lab-08) | [Next >](../lab-testing)