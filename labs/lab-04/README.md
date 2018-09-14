# Lab 04

## Table of Contents

- [Installing React Router](#getting-a-full-fake-rest-api-with-json-server)
- [Adding a Router Component](#adding-a-router-component)

## Installing React Router

**React Router** has been divided into three packages: ```react-router```, ```react-router-dom``` and ```react-router-native```. The main package provides the core routing components and functions  and the other two provide environment specific (browser and mobile) components.

You should choose the right one depending on your application. Because you are building a website, install ```react-router-dom```.

### Install React Router (_react-router-dom_)

**_You can skip this step if you have installed previously in Lab 01_**

```sh
npm install react-router-dom --save 
```
## Adding a Router Component

At the core of every React Router application should be a router component. Also, you need to determine which type of router to use. For web projects that need to handle dynamic requests **_BrowserRouter_** is the most suitable.

Import _BrowserRouter_ from ```react-router-dom``` in your App controller. Wrap the App render with your imported *<BrowserRouter>*:

```js
import { BrowserRouter as Router } from "react-router-dom";

...

render() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="App-root">
          <Fetch path={'general'} fetchOptions={FETCH_OPTIONS}>
            {({ data }) => {
              if (data && data.logo) {
                return <Header logo={data.logo} />
              }
            }}
          </Fetch>
          <div className="Main">
            Main content
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}
```

A Router component only expect to receive a single child element. So, to handle this limitation, create a _div class="App-root"_ to wrap the rest of the components.

>Learn more about [React Router](https://reacttraining.com/react-router)

### Creating a Main Container and Refactoring

Create a new ```src\containers``` directory and add a Main component:

```js
import React from 'react';
import './Main.css';

class Main extends React.PureComponent {
  render() {
    return (
      <div className="Main">
        Main content
      </div>
    );
  }
}

export default Main;
```

In App.jsx, remove the "Main" div and replace it by the new container:

```js
render() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="App-root">
          <Fetch path={'general'} fetchOptions={FETCH_OPTIONS}>
            {({ data }) => {
              if (data && data.logo) {
                return <Header logo={data.logo} />
              }
            }}
          </Fetch>
          <Main />
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}
```

**Refactoring** in React is a common proccess to maintain a clean code and improve the quality of your project, identifying reusable pieces of components and changing the design without modifying the end result of the application and how it is working.

1. Remove the Fetch component in the App controller and render only the Header, Main and Footer components:

```js
render() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="App-root">
          <Header />
          <Main />
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}
```

2. Add the Fetch service in the Header component to get the logo url and delete the PropTypes (Now, you don't need to check the type of the props because the component it is not receiving props):

```js
import { Fetch } from '../../services/api'

...

const FETCH_OPTIONS = {
    method: 'GET',
    headers: {}
};

...

<div className="Header-logo">
  <Fetch path={'general'} fetchOptions={FETCH_OPTIONS}>
    {({ data }) => {
      if (data && data.logo) {
        return (
          <img alt="Accenture Logo"
            src={this.props.logo}
          />
        );
      }
    }}
  </Fetch>
</div>
```

>An online search about how to _Refactor in React_ will return a lot of information, tips and tricks.


## Creating Navigation with Link Component

React Router provides a <Link> component to render an accesible navigation around the application. Wherever you render a _<Link>_, an anchor _<a>_ will appear in the DOM.

_<Link>_ is responsible for requesting the location that they should navigate to using the ```to``` prop, which value can can either be a string or a location object.

Replace anchor _<a>_ links in Menu.jsx using Link component:

```js
<nav>
  <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/services">Services</Link></li>
    <li><Link to="/innovation">Innovation</Link></li>
    <li><Link to="/guestbook">Guestbook</Link></li>
  </ul>
</nav>
```

>Lear more about [Link Component](https://reacttraining.com/react-router/web/api/Link)


