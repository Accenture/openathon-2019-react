# Lab 08 - Integrating Axios Library

## Table of Contents

* [Fetch API _versus_ Axios Library](#fetch-api-versus-axios-library)
* [Using Axios](#using-axios)
* [Refactoring Fetch Component](#refactoring-fetch-component)

## Fetch API _versus_ Axios Library

Fetch is a low level API which with some known issues:

* Fetch requires an extra step to extract the JSON from a response.

* In a `Fetch` request, you will get `error` only if network error is
  encountered while in all other cases if will log `ok`.

* By default, `Fetch` does not send cookies with API calls.

* Fetch does not support by default some functionalities: timeout,
  uploading progress or cancelling request.

Therefore, in most applications Fetch API should not be used
directly.  Fortunately, there are other options out there for making
HTTP requests.  One of those options is **Axios** library.

Axios.js is a promise-based HTTP client for the browser and Node.js
with some advantages over Fetch:

* It will reject the request promise if a response with status code in
  the `4xx` or `5xx` range is returned.

* It performs automatic JSON data transformation and supports upload
  progress.

* It has ways to abort a request or to set a response timeout.

* It automatically sends cookies back to the server when making a
  request and has built-in CSRF protection.

* It can be used in both the browser and Node.js and facilitates
  sharing JavaScript code between the browser and the back end.

## Using Axios

Let’s refactor your React project for using axios instead of the
native fetch API to request data.

1. Install Axios:

    ```sh
    npm install axios
    ```

2. Open your Fetch component and import axios:

    ```javascript
    /* Fetch.jsx */

    import axios from 'axios';
    ```

3. Refactor your `fetchData()` method using `axios.get()`:

    ```javascript
    fetchData = async() => {
        this.setState({ loading: true });
        try {
            const response = await axios.get(`${API_HOST}${this.props.path}`, this.props.options);
            this.setState({ data: response.data, loading: false});
        } catch (error) {
            this.setState({ error, loading: false});
        }
    }
    ```

Save the changes and run `npm start`to verify that everything works.

## Refactoring Fetch Component

Axios library provides multiple **config options** for making
requests.  Only the `url` is required. Requests will default to `GET`
if method is not specified.

Visit [Axios Documentation][axios] to know more.

[axios]: https://github.com/axios/axios#request-config

To allow the `Fetch` component to handle different request methods
(`GET`, `POST`, `PUT`, `PATCH`, `DELETE`, etc.), refactor the
`fetchData` and the `render` functions of your component:

1. Remove the `API_HOST` constant and declare some default props in
   the `Fetch.jsx` file:

    ```javascript
    /* Fetch.jsx */

    const defaultProps = {
        fetchAfterMount: true,
        url: null,
        method: 'get',
        baseURL: 'http://localhost:3001/',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    }

    ...

    Fetch.defaultProps = defaultProps;
    ```

2. Refactor the `fetchData()` method using axios config options and
   check if the `fetchAfterMount` prop is true before call to the fetch
   method.  This prop will allow to your `Fetch` component to request
   data only when it's required and not always in `componentDidMount()`.
   To achieve this, you need also refactor the `render` of the component
   to pass the `fetchData` method in the children props:

    ```javascript
    /* Fetch.jsx */

    fetchData = async() => {
        this.setState({ loading: true });
        const { children, fetchAfterMount, ...requestConfig } = this.props;
        try {
            const response = await axios(requestConfig);
            this.setState({ data: response.data, loading: false});
        } catch (error) {
            this.setState({ error, loading: false});
        }
    }

    componentDidMount() {
        if (this.props.fetchAfterMount) this.fetchData();
    }

    render() {
        const {
            state: { data, loading, error },
            props: { children },
            fetchData
        } = this;

        return children({
            data,
            loading,
            error,
            fetchData
        });
    }
    ```

3. Set the `propType` of the `url` prop to `string` and `required`:

    ```javascript
    import PropTypes from 'prop-types';

    ...

    Fetch.propTypes = {
        url: PropTypes.string.isRequired
    }
    ```

4. Wherever your are using the Fetch component —`Header.jsx`,
   `Home.jsx`, `Services.jsx` and `Innovation.jsx`—, delete the
   `FETCH_OPTIONS` constant and set the url and the method to the
   component depending on the endpoint you need to call:

    ```javascript
    /* Header.jsx */

    <Fetch url="general" method="get">
    ...
    </Fetch>
    ```

    ```javascript
    /* Home.jsx */

    <div className="Home__info">
        <Fetch url="general" method="get">
            ...
        </Fetch>
    </div>
    <div className="Home__list">
        <div className="Home__services">
            <Fetch url="services" method="get">
                ...
            </Fetch>
        </div>
        <div className="Home__innovation">
            <Fetch url="innovation" method="get">
                ...
            </Fetch>
        </div>
    </div>
    ```

    ```javascript
    /* Services.jsx */

    <Fetch url="services" method="get">
    ...
    </Fetch>
    ```

    ```javascript
    /* Innovation.jsx */

    <Fetch url="innovation" method="get">
    ...
    </Fetch>
    ```

Once the refactor of the `Fetch` component is finished, you will use
it in the next Lab to persist the data of the `Guestbook` form.

[< Prev](../lab-07) | [Next >](../lab-09)
