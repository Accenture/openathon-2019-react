# Lab 04 - Using React Router

## Table of Contents

- [Installing React Router](#getting-a-full-fake-rest-api-with-json-server)
- [Adding a Router Component](#adding-a-router-component)
- [React Navigation: Links, Switch and Routes](#react-navigation:-links,-switch-and-routes)

<br/>  

## Installing React Router

**React Router** has been divided into three packages: ```react-router```, ```react-router-dom``` and ```react-router-native```. The main package provides the core routing components and functions and the other two provide environment specific (browser and mobile) components.

You should choose the right one depending on your application. Because you are building a website, install ```react-router-dom```.

<br/>  

### Install React Router (_react-router-dom_)

```sh
npm install react-router-dom --save 
```

<br/>  

## Adding a Router Component

At the core of every React Router application should be a router component. Also, you need to determine which type of router to use. For web projects that need to handle dynamic requests **_BrowserRouter_** is the most suitable.

1. Import _BrowserRouter_ from ```react-router-dom``` in your App controller:

    ```javascript
    import { BrowserRouter as Router } from "react-router-dom";
    ```

    <br/>  
2. Wrap the App render with your imported *<BrowserRouter>*:

    ```javascript
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

<br/>  

### Creating a Main Container and Refactoring

1. Create a new ```src\containers``` directory and add a Main component:

    ```js
    import React from 'react';
    import './Main.css';

    class Main extends React.Component {
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

    <br/>  
2. Create an empty Main.scss file and add the following styles:

    ```css
    .Main {
        padding: 2.5rem 0;
        background: $light-gray;
        text-align: center;
    }
    ```

    <br/>  
3. In App.jsx, remove the "Main" div and replace it by the new Main component:

    ```diff
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div className="App-root">
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
    -                   <p className="Main">
    -                       Main content
    -                   </p>
    +                   <Main />
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

    <br/>  
2. Add the Fetch service in the Header component to get the logo url and delete the PropTypes (Now, you don't need to check the type of the props because the component it is not receiving props):

    ```js
    import { Menu, Loader, Notification } from '../../components';
    import { Fetch } from '../../services/api';

    ...

    const FETCH_OPTIONS = {
        method: 'GET',
        headers: {}
    };

    ...

        <div className="Header-logo">
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
                        return (
                            <img alt="Accenture Logo"
                                src={data.logo}
                            />
                        );
                    }
                    return <Loader />;
                }}
            </Fetch>
        </div>
    ```

    Now, your Header component is responsible by itself to call to the Fetch service and get the url for the logo.

>An online search about how to _Refactor in React_ will return a lot of information, tips and tricks.

<br/>  

## React Navigation: Links, Switch and Routes

React Router provides a **Link** component to render an accesible navigation around the application. Wherever you render a _<Link>_, an anchor _<a>_ will appear in the DOM.

Link component is responsible for requesting the location that it should navigate to using the ```to``` prop, which value can be either a string or a location object.

1. Replace the anchor _<a>_ links in Menu.jsx using Link component:

    ```javascript
    <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/innovation">Innovation</Link></li>
            <li><Link to="/guestbook">Guestbook</Link></li>
        </ul>
    </nav>
    ```

    >Learn more about [Link Component](https://reacttraining.com/react-router/web/api/Link)

    Now, launch your application by running ```npm start``` and click on each menu link. The address in your browser is updated each time you click on a link item. 

    <br/>  
2. Create four new containers _—Home, Services, Innovation and Guestbook—_ as React Components, to render each page of your application following this basic structure:

    ```javascript
    import React from 'react';

    class Home extends React.Component {
        render() {
            return (
                <div className="Home">
                    Home Page
                </div>
            );
        }
    }

    export default Home;
    ```

    <br/>  
3. Add your new container Components to the ```containers\index.js``` file:

    ```javascript
    import Main from './Main/Main';
    import Home from './Home/Home';
    import Services from './Services/Services';
    import Innovation from './Innovation/Innovation';
    import Guestbook from './Guestbook/Guestbook';

    export {
        Main,
        Home,
        Services,
        Innovation,
        Guestbook
    };
    ```

    <br/>  
4. Render the content for each page using **Switch** and **Routes** from React Router inside of your Main controler. The Switch component renders the first Route or Redirect that matches the location. On the other hand, the Route component —perhaps the most important in React Router— is responsible to render other components or HTML content when a location matches the route’s path. 

    ```javascript
    import { Switch, Route } from "react-router-dom";
    import { Home, Services, Innovation, Guestbook } from "../../containers";

    ...

    <div className="Main">
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/services" component={Services} />
            <Route path="/innovation" component={Innovation} />
            <Route path="/guestbook" component={Guestbook} />
        </Switch>
    </div>
    ```
    The route for Home includes an exact prop to __ match only when the pathname matches the route’s path exactly.

    >Learn more about [Switch](https://reacttraining.com/react-router/web/api/Switch) and [Route](https://reacttraining.com/react-router/web/api/Route)