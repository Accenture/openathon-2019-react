# Lab 03 - Fetching Data in Your React Application

## Table of Contents

* [Getting a full fake REST API with json-server](#getting-a-full-fake-rest-api-with-json-server)
* [Fetching Data: Part 1](#fetching-data:-part-1)
* [React Lifecycle Methods](#react-lifecycle-methods)
* [Fetching Data: Part 2](#fetching-data:-part-2)
* [Validating Data Types: PropTypes](#validating-data-types:-proptypes)

## Getting a full fake REST API with json-server

JSON Server is a Node Module that you can use to create a demo REST
Json web service in less than a minute.  All you need is a JSON file
for sample data.

[View JSON server repository](https://github.com/typicode/json-server)

### Install JSON Server

```sh
npm install -g json-server
```

### Adding mocked data to your project

Copy and paste the `api.json` file from the `/server` folder into a
new `/src/mockdata` directory in your project.

> You can find more information about the available endpoints and
> methods in the II Openathon repository: `server/public/index.html`

### Starting JSON Server

Create a `server` script to configure your json-server and add it to
the `start` script to run concurrently.  Update your `package.json`
replacing the following lines:

```json
"scripts": {
    "server": "json-server --watch src/mockdata/api.json --port 3001",
    "build": "concurrently \"npm run sass:build\" \"react-scripts build\"",
    "eject": "react-scripts eject",
    "sass:watch": "node-sass -w src -o src --output-style compressed --include-path src",
    "sass:build": "node-sass src -o src --output-style compressed --include-path src",
    "start": "concurrently --kill-others \"npm run server\" \"npm run sass:watch\" \"react-scripts start\"",
    "test": "react-scripts test --env=jsdom"
},
```

Run `npm start` and go to <http://localhost:3001/general> to inspect the
returned data from the `/general` endpoint.

> Note: It’s common to serve the front-end and back-end of your app in
> the same server and port.  However, you cannot do this at
> development time since Create React App runs the app in its own
> development server.  You can add a proxy field to your
> `package.json` file: `"proxy": "http://localhost:3001/"`.
>
> Now, instead of making a request like this:
>
>```javascript
>fetch('http://localhost:3001/endpoint').then()
>```
>
> You should make them like this:
>
>```javascript
>fetch('endpoint').then()
>```
>
> But to prevent future issues in your application due to some routes
> match with your server endpoints, skip this step and store your
> server host as a global variable [Fetching Data: Part 2]
> (#fetching-data:-part-2).

## Fetching Data: Part 1

React doesn't prescribe a specific approach to data fetching, but
people commonly use either the `fetch()` API provided by the browser
or a library like axios.  (_In the current lab we are going to use the
`fetch()` API and we will implement the axios library in a next
optional lab_).

To initiate a component with remote data, React components have many
useful lifecycle hooks.

It's time for a break.  Let's know all these methods first.

## React Lifecycle Methods

On the component class we can declare special hooks called “lifecycle
methods” to run some code when a component mounts, unmounts, renders
new values, etc.

### Commonly Used Lifecycle Methods

* `componentDidMount()` is invoked immediately after a component is
  mounted.

* `shouldComponentUpdate()` is invoked before rendering when new props
  or state are being received.

* `componentDidUpdate()` is invoked immediately after updating
  occurs. This method is not called for the initial.

* `componentWillUnmount()` is invoked immediately before a component
  is unmounted and destroyed.

### Rarely Used Lifecycle Methods (_React 16.3+_)

* `getDerivedStateFromProps()` is invoked right before calling the
  render method, both on the initial mount and on subsequent updates.

* `getSnapshotBeforeUpdate()` is invoked right before the most
  recently rendered output is committed to the DOM.

* `componentDidCatch()` method works like a JavaScript `catch {}`
  block, but for components.

### Legacy Lifecycle Methods

* `UNSAFE_componentWillMount()` is invoked just before mounting
  occurs.

* `UNSAFE_componentWillReceiveProps()` is invoked before a mounted
  component receives new props.

* `UNSAFE_componentWillUpdate()` is invoked just before rendering when
  new props or state are being received.

> See a [React Lifecycle method
> diagram](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

## Fetching Data: Part 2

Because React uses components, it’s easy to fetch data from an API and
store the result in one component.  Then, we can import the entire
component to the App or another component.

### Creating a new Fetch component

1. Create a new **Fetch** component in `src/services/api` including a
   constructor _—with three initial states: data, loading and error—_
   a `fetchData` method, a `componentDidMount` lifecycle method and a
   render.

    ```javascript
    /* Fetch.jsx */

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

        fetchData() {}

        componentDidMount() {}

        render() {
            return;
        }
    }

    export default Fetch;
    ```

2. Store in a variable the API host of your JSON Server adding the
   following line before the Fetch class definition:

    ```javascript
    /* Fetch.jsx */

    const API_HOST = 'http://localhost:3001/';
    ```

    Alternatively, you can add [Custom Environment
    Variables](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables).

3. Create a `index.js` file in `src/services/api` to export your Fetch
   component:

    ```javascript
    /*src/services/api/index.js*/

    import Fetch from './Fetch/Fetch';

    export {
        Fetch
    };

    ```

### Using Fetch API

The `fetchData` method must take one mandatory argument: the `path` to
the resource we want to fetch.  It returns a `Promise` that resolves
to the `Response` to the request, whether it is successful or not.
Also, you can pass as the second argument some options.

```js
fetch(path, options);
```

> Learn more about the [JavaScript Fetch API][js-fetch] and [how to
> use it][js-fetch-howto].

[js-fetch]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[js-fetch-howto]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

1. Use **Async/Await** or **Javascript Promises** to resolve the
   asynchronous response. When the data is fetched successfully, store
   it in the local state with React’s `this.setState()` method. Replace
   the empty `fetchData` method with:

    ```javascript
    /* Fetch.jsx */

    ...

    fetchData = async () => {
        this.setState({ loading: true });
        try {
            const data = await (await fetch(`${API_HOST}${this.props.path}`, this.props.options)).json();
            this.setState({ data, loading: false});
        } catch (error) {
            this.setState({ error, loading: false});
        }
    }

    ...
    ```

    > Using Async/Await rather than Promises has several advantages:
    > makes our code more readable and clean, with the same construct
    > allows to handle both synchronous and asynchronous errors and
    > it’s much easier to debug. Use `setState()` to store the
    > returned data/error.

    Example using Promises:

    ```javascript
    /* Fetch.jsx */

    ...

    fetchData() {
        this.setState({ loading: true });
        fetch(`${API_HOST}${this.props.path}`, this.props.options)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error trying to fetch data...');
                }
            })
            .then(data => this.setState({ data, loading: false }))
            .catch(error => this.setState({ error, loading: false }));
    }

    ...
    ```

    > Learn more about the [JavaScript
    > Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
    > and [Async
    > Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function).

2. Invoke `fetchData` method in `componentDidMount()`.

    ```javascript
    /* Fetch.jsx */

    componentDidMount() {
        this.fetchData();
    }
    ```

    This is the best place to put calls to fetch data by default for
    two reasons:

    * The data won’t be loaded until after the initial render and
      reminds you to set up initial state properly.

    * Let you handle the case where the data to be rendered is empty.

3. Finally, return the children elements (`this.props.children`) into
   the render method:

    ```javascript
    /* Fetch.jsx */

    render() {
        return this.props.children(this.state);
    }
    ```

    > The concept of children as a function or **render props** is one
    > of the advanced patterns in React.  The term refers to a simple
    > technique to share code between React components using a prop
    > whose value is a function.  Learn more about [Render
    > Props](https://reactjs.org/docs/render-props.html).

### Using Fetch Component

Using your Fetch component in `App.jsx` you can retrieve the logo url
from the fake REST API json-server and pass it to the Header as a
`logo` prop.

1. Add the Fetch component into the App render method and replace the
   logo attribute with the `data.logo` returned:

    ```javascript
    /* App.jsx */

    import { Fetch } from '../../services/api'

    ...

    const FETCH_OPTIONS = {
        method: 'GET',
        headers: {}
    };

    render() {
        return (
            <div className="App">
                <Fetch path={'general'} options={FETCH_OPTIONS}>
                    {({ data, loading, error }) => {
                        if (error) {
                            return <p>{error.message}</p>;
                        }
                        if (loading) {
                            return <p>Loading ...</p>;
                        }
                        if (data && data.logo) {
                            return <Header logo={data.logo} />
                        }
                        return <p>No data yet ...</p>;
                    }}
                </Fetch>
                <p className="Main">
                    Main content
                </p>
                <Footer />
            </div>
        );
    }
    ```

### Creating a Loader Component - Optional

Create a Loader component to show an animation while your Fetch
component is retrieving data.

1. Create a new Loader component and import in the
   `components/index.js`file:

    ```javascript
    /* Loader.jsx */

    import React from 'react';
    import './Loader.css';

    class Loader extends React.Component {

        render() {
            return (
                <div className="Loader">
                    <div className="Loader__icon"></div>
                </div>
            );
        }
    }

    export default Loader;
    ```

2. Add some styles to animate the icon:

    ```scss
    /* Loader.scss */

    @import 'assets/styles/common/variables';

    .Loader {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(255,255,255,0.8);

        .Loader__icon {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            border: 5px solid $light-gray;
            animation: spin 1s linear infinite;
            border-top: 5px solid $dark-gray;
            border-radius: 50%;
            width: 50px;
            height: 50px;
        }
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    ```

### Creating a Notification Component - Optional

Create a Notification component to provide short information to your
users about events in your application, for example, when a error
occurs retrieving data.

1. Create a new Notification component.

    ```javascript
    /* Notification.jsx */

    import React from 'react';
    import './Notification.css';

    const defaultProps = {
        type: 'info',
        message: ''
    }

    class Notification extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                opened: true
            }
            this.closeNotification = this.closeNotification.bind(this);
        }

        closeNotification() {
            this.setState({ opened: false });
        }

        render() {
            const element = this.state.opened &&
                <div className={`Notification Notification--${this.props.type}`}>
                    <div className="Notification__message">
                        {this.props.message}
                        <div className="Notification__close"
                            onClick={this.closeNotification}
                        />
                    </div>
                </div>;
            return element;
        }
    }

    Notification.defaultProps = defaultProps;

    export default Notification;

    ```

2. Add the following styles to `Notification.scss`

    ```scss
    /* Notification.scss */

    @import 'assets/styles/common/variables';

    .Notification {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(255,255,255,0.8);
        width: 100%;
        height: 100%;
        z-index: 8;

        &.Notification--error{
            .Notification__message{
                border-top: 2px solid $red;
            }
        }

        .Notification__message{
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            width: 300px;
            height: 80px;
            margin: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid $border-color;
            border-radius: 2px;
            padding: $space-m;
            background: $white;
            z-index: 16;
        }

        .Notification__close{
            position: absolute;
            top: -8px;
            right: -8px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: white;
            border: 1px solid #ccc;
            cursor: pointer;

            &:before,
            &:after{
                content: ' ';
                position: absolute;
                left: 8px;
                top: 4px;
                height: 10px;
                width: 2px;
                background-color: $text-color;
            }
            &:before {
                transform: rotate(45deg);
            }
            &:after {
                transform: rotate(-45deg);
            }
        }
    }
    ```

### Adding Loader and Notification components to your application

1. Replace de Loading and Error messages in `App.jsx` by the new
   components:

    ```javascript
    /* App.jsx */

    render() {
        return (
            <div className="App">
                <Fetch path={'general'} options={FETCH_OPTIONS}>
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
                        if (data && data.logo) {
                            return <Header logo={data.logo} />
                        }
                        return <Loader />;
                    }}
                </Fetch>
                <p className="Main">
                    Main content
                </p>
                <Footer />
            </div>
        );
    }
    ```

To check the new Notification component, you can remove the
`general` endpoint from the `api.json` file. Save the changes
and reload the page. A notification error will appear. Restore
the deleted endpoint.

Now, if you stop the execution of the App adding a breakpoint
at the line 31 in `Fetch.jsx` file via Chrome DevTools, after
resume the first script execution, the Loader is rendered.

## Validating data types: PropTypes

**React PropTypes** are a good way to help you catch bugs by
validating data types of values passed through props.  If props are
missing, or if they're present but they aren't what you're expecting,
then a warning will be printed to the console.

They also offer possibilities to flag props as mandatory or set
default values and serve as a handy documentation on how a component
has to be used in terms of passing props.

The first step to use PropTypes is to import the library into your component:

```js
import PropTypes from 'prop-types';
```

PropTypes exports a range of validators that can be used to make sure the data you receive is valid.

You can declare that a prop is a specific JS type. By default, this
basic data types are all optional:

```javascript
CustomComponent.propTypes = {
    optionalArray: PropTypes.array,
    optionalBool: PropTypes.bool,
    optionalFunc: PropTypes.func,
    optionalNumber: PropTypes.number,
    optionalObject: PropTypes.object,
    optionalString: PropTypes.string,
    optionalSymbol: PropTypes.symbol,
}
```

1. Import the library in to your Header component and add a PropType
   to the logo prop after the close of the component declaration:

    ```javascript
    /* Header.jsx */

    import propTypes from 'prop-types';
    ...

    Header.propTypes = {
        logo: propTypes.string
    }

    ```

Now, change the value of the logo in your `api.json` file by a number.
Save and refresh your app. An error appears in the browser console:

``` javascript
index.js:2178 Warning: Failed prop type: Invalid prop `logo` of type `number` supplied to `Header`, expected `string`.
    in Header (at App.jsx:27)
    in Fetch (at App.jsx:14)
    in div (at App.jsx:13)
    in App (at src/index.js:7)
```

Restore the previous value.

Complex Data Types:

```javascript
CustomComponent.propTypes = {
    // Anything that can be rendered: numbers, strings, elements or an array (or fragment) containing these types.
    optionalNode: PropTypes.node,

    // A React element.
    optionalElement: PropTypes.element,

    // You can also declare that a prop is an instance of a class. This uses JS's instanceof operator.
    optionalMessage: PropTypes.instanceOf(Message),

    // You can ensure that your prop is limited to specific values by treating it as an enum.
    optionalEnum: PropTypes.oneOf(['News', 'Photos']),

    // An object that could be one of many types
    optionalUnion: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Message)
    ]),

    // An array of a certain type
    optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

    // An object with property values of a certain type
    optionalObjectOf: PropTypes.objectOf(PropTypes.number),

    // An object taking on a particular shape
    optionalObjectWithShape: PropTypes.shape({
      color: PropTypes.string,
      fontSize: PropTypes.number
    })
};
```

If you want to require anyone who uses your component to always pass a
certain prop, you can flag it as mandatory:

```javascript
CustomComponent.propTypes = {
    // You can chain any of the above with `isRequired` to make sure a warning
    // is shown if the prop isn't provided.
    requiredString: PropTypes.string.isRequired,

    // A value of any data type
    requiredAny: PropTypes.any.isRequired
}
```

> More info about
> [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html).

[< Prev](../lab-02) | [Next >](../lab-04)
