# Lab 03

## Table of Contents

- [Getting a full fake REST API with json-server](#getting-a-full-fake-rest-api-with-json-server)
- [Fetching Data: Part 1](#fetching-data:-part-1)
- [React Lifecycle Methods](#react-lifecycle-methods)
- [Fetching Data: Part 2](#fetching-data:-part-2)
- [Validating Data: PropTypes](#validating-data:-proptypes)

## Getting a full fake REST API with json-server

JSON Server is a Node Module that you can use to create a demo REST Json webservice in less than a minute. All you need is a JSON file for sample data. https://github.com/typicode/json-server

### Install JSON Server

**_You can skip this step if you have installed JSON Server previously_**

```sh
npm install -g json-server
```

### Proxying server requests

It’s common to serve the front-end and back-end of your app in the same server and port. However, you cannot do this at development time since Create React App runs the app in its own development server.

Add a proxy field to your package.json file:

```json
"scripts": {
    ...
},
"proxy": "http://localhost:3001/"
```

Instead of making a request like this :

```js
fetch('http://localhost:5000/endpoint').then()
```

You should make them like this:

```js
fetch('/endpoint').then()
```

### Adding mocked data to your project

Copy and paste the api.json file from the ```\server``` folder into a new ```\src\mockeddata``` directory

>More info about available endpoints and methods in ```server\public\index.html```

## Fetching Data: Part 1

React doesn't prescribe a specific approach to data fetching, but people commonly use either the fetch() API provided by the browser or a library like axios. (_In the current lab we are going to use the fetch() API and we will implement the axios library in a next optional lab_)

React components have many useful lifecycle hooks in order to initiate a component with remote data.

It's time for a break.
Let's know all these methods first.

## React Lifecycle Methods

On the component class we can declare special hooks called “lifecycle methods” to run some code when a component mounts, unmounts, renders new values,...

### Commonly Used Lifecycle Methods

* **_componentDidMount()_** is invoked immediately after a component is mounted
* **_shouldComponentUpdate()_** is invoked before rendering when new props or state are being received
* **_componentDidUpdate()_** is invoked immediately after updating occurs. This method is not called for the initial
* **_componentWillUnmount()_** is invoked immediately before a component is unmounted and destroyed

### Rarely Used Lifecycle Methods (_React 16.3+_)

* **_getDerivedStateFromProps()_** is invoked right before calling the render method, both on the initial mount and on subsequent updates
* **_getSnapshotBeforeUpdate()_** is invoked right before the most recently rendered output is committed to the DOM
* **_componentDidCatch()_** method works like a JavaScript catch {} block, but for components

### Legacy Lifecycle Methods

* __*UNSAFE_componentWillMount()*__ is invoked just before mounting occurs
* __*UNSAFE_componentWillReceiveProps()*__ is invoked before a mounted component receives new props
* __*UNSAFE_componentWillUpdate()*__ is invoked just before rendering when new props or state are being received

[See a React Lifecycle method diagram](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

## Fetching Data: Part 2

Because React uses components, it’s easy to fetch data from an api and store the result in one component. Then we can import the entire component to the app or another component.

### Creating a new Fetch component

Create a new **Fetch** component in ```src\services\api``` including a constructor —with three initial states: data, loading and error— a fetchData method, a componentDidMount lifecycle method and a render.

```js
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

    render() {}
}

export default Fetch;
```

### Using Fetch API

The _fetchData_ method must take one mandatory argument: the **path** to the resource we want to fetch. It returns a _Promise_ that resolves to the _Response_ to the request, whether it is successful or not. Also, you can pass as the second argument some options.

```js
fetch(path, options);
```

>Learn more about the [JavaScript Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and [how to use it](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

Use **Async/Await** or **Javascript Promises** to resolve the asynchronous response. When the data is fetched successfully, store it in the local state with React’s _this.setState()_ method. 

>Using Async/Await rather than Promises has several advantages: makes our code more readable and clean, with the same construct allows to handle both synchronous and asynchronous errors and it’s much easier to debug. Use _setState()_ to store the returned data/error.

```js
fetchData = async () => {
  this.setState({ loading: true });
  try {
    const data = await (await fetch(this.props.url, this.props.options)).json();
    this.setState({ data, loading: false});
  } catch (error) {
    this.setState({ error, loading: false});
  }
}
```

Example using Promises:

```js
fetchData() {
  this.setState({ loading: true });
  fetch(this.props.path, this.props.options)
    .then(response => response.json())
    .then(
      (data) => {
        this.setState({data});
      },
      (error) => {
        this.setState({error});
      }
      this.setState({ loading: false });
    )
}
```

>Learn more about the [JavaScript Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) and [Async Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

Invoke _fetchData_ method in _componentDidMount()_. This is the best place to put calls to fetch data by default for two reasons:

1. The data won’t be loaded until after the initial render and reminds you to set up initial state properly. 
2. Let you handle the case where the data to be rendered is empty.

```js
componentDidMount() {
  this.fetchData();
}
```

Finally, return the children elements (_this.props.children_) into the render method:

```js
render() {
  return this.props.children(this.state);
}
```

>The concept of children as a function or **render props** is one of the advanced patterns in React. The term refers to a simple technique to share code between React components using a prop whose value is a function. Learn more about [Render Props](https://reactjs.org/docs/render-props.html).

### Using Fetch Component

You can retrieve the logo url from the fake REST API json-server. 

To do this, add in the Fetch component to the App render method and replace the logo attribute with the data.logo returned:

```js
import { Fetch } from '../../services/api'

...

const FETCH_OPTIONS = {
  method: 'GET',
  headers: {}
};

render() {
  return (
    <div className="App">
      <Fetch url={'general'} options={FETCH_OPTIONS}>
         ({ data, loading, error }) => {
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

## Validating data type: PropTypes

React PropTypes are a good way to help you catching bugs by validating data types of values passed through props. If props are missing, or if they're present but they aren't what you're expecting, then a warning will print in the console.

They also offer possibilities to flag props as mandatory or set default values and serve as a handy documentation on how a component has to be used in terms of passing props.

The first step to use PropTypes is to import the library in to your component:

```js
import PropTypes from 'prop-types';
```
PropTypes exports a range of validators that can be used to make sure the data you receive is valid.

You can declare that a prop is a specific JS type. By default, this basic data types are all optional:

```js
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

Add a PropType to the logo prop after the close of the component declaration in Header.jsx 

```js

import propTypes from 'prop-types';
...

Header.propTypes = {
    logo: propTypes.string,
}

```

Complex Data Types:

```js
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

If you want to require anyone who uses your component to always pass a certain prop, you can flag it as mandatory:

```js
CustomComponent.propTypes = {
  // You can chain any of the above with `isRequired` to make sure a warning
  // is shown if the prop isn't provided.
  requiredString: PropTypes.string.isRequired,

  // A value of any data type
  requiredAny: PropTypes.any.isRequired
}
```
>More info about [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html).
