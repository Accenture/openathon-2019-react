# Lab 04 - Using React Router

## Table of Contents

* [Installing React Router](#installing-react-router)
* [Adding a Router Component](#adding-a-router-component)
* [React Navigation: Links, Switches and Routes](#react-navigation-links-switches-and-routes)
* [Creating a custom 404 NotFound Page](#creating-a-custom-404-notfound-page)

## Installing React Router

**React Router** is the standard routing library for React that keeps
your UI in sync with the URL.

The library has been divided into three packages: `react-router`,
`react-router-dom` and `react-router-native`.  The main package
provides the core routing components and functions and the other two
provide environment specific (browser and mobile) components.

You should choose the right one depending on your application. Because
you are building a website, start installing the `react-router-dom`.

### Install React Router (_react-router-dom_)

```sh
npm install react-router-dom --save
```

## Adding a Router Component

At the core of every React Router application should be a **router**
component. Also, you need to determine which type of router to use.
For web projects that need to handle dynamic requests `BrowserRouter`
is the most suitable.

BrowserRouter is a wrapper for your application that uses the HTML5
history API (pushState, replaceState and the popstate event) to keep
your UI in sync with the URL of the browser.

1. Import `BrowserRouter` from `react-router-dom` in your App
   controller:

    ```javascript
    /* App.jsx */

    import { BrowserRouter } from "react-router-dom";
    ```

2. Wrap the App render with your imported `<BrowserRouter>`:

    ```javascript
    /* App.jsx */

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div className="App__root">
                        <Fetch path={'general'} fetchOptions={FETCH_OPTIONS}>
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

    A Router component only expect to receive a single child element.
    So, to handle this limitation, you have created a `<div
    class="App__root"></div>` tag to wrap the rest of the components.

> Learn more about [React
> Router](https://reacttraining.com/react-router)

### Creating a Main Container and Refactoring

1. Create a new directory `src/containers/Main` and add a Main
   component:

    ```js
    /* Main.jsx */

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

    Create an `index.js` file and import/export your component:

    ```javascript
    /* src\containers\index.js */

    import Main from './Main/Main';

    export {
        Main,
    };
    ```

2. Create an empty `Main.scss` file and add the following styles:

    ```css
    /* Main.scss */

    @import 'assets/styles/common/variables';

    .Main {
        padding: 2.5rem 0;
        background: $light-gray;
        text-align: center;
    }
    ```

3. In `App.jsx`, remove the `Main` div and replace it by the new Main
   component:
   
   ```javascript
     /* App.jsx */
     
   import { Main } from '../../containers';
   ```

    ```diff
    /* App.jsx */

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div className="App__root">
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

**Refactoring** in React is a common process to maintain a clean code
and improve the quality of your project, identifying reusable pieces
of components and changing the design without modifying the end result
of the application and how it is working.

1. Remove the Fetch component in the App controller and render only
   the Header, Main and Footer components:

    ```js
    /* App.jsx */

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div className="App__root">
                        <Header />
                        <Main />
                        <Footer />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
    ```

2. Add the Fetch service in the Header component to get the logo url
   and delete the PropTypes (Now, you don't need to check the type of
   the props because the component it is not receiving props):

    ```js
    /* Header.jsx */

    import { Menu, Loader, Notification } from '../../components';
    import { Fetch } from '../../services/api';

    ...

    const FETCH_OPTIONS = {
        method: 'GET',
        headers: {}
    };

    ...

        <div className="Header__logo">
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

    Now, your Header component is responsible by itself to call to the
    Fetch service and get the url for the logo.

> An online search about how to _Refactor in React_ will return a lot
> of information, tips and tricks.

## React Navigation: Links, Switches and Routes

React Router provides a `Link` component to render an accessible
navigation around the application.  Wherever you render a `<Link>`, an
anchor `<a>` will appear in the DOM.

`Link` component is responsible for requesting the location that it
should navigate to using the `to` prop, which value can be either a
string or a location object.

1. Replace the anchor `<a>` links in`Menu.js` using `Link` component:

    ```javascript
    /* Menu.jsx */

    import { Link } from 'react-router-dom'

    ...

    <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/innovation">Innovation</Link></li>
            <li><Link to="/guestbook">Guestbook</Link></li>
        </ul>
    </nav>
    ```

    > Learn more about [Link
    > Component](https://reacttraining.com/react-router/web/api/Link)

    Now, launch your application by running `npm start` and click on
    each menu link.  The address in your browser is updated each time
    you click on a link item.

2. Create four new containers _—Home, Services, Innovation and
   Guestbook—_ as React Components, to render each page of your
   application following this basic structure:

    ```javascript
    /* Home.jsx */

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

3. Add your new container Components to the `containers/index.js`
   file:

    ```javascript
    /* src/containers/index.js */

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

4. Render the content for each page using **Switch** and **Routes**
   from React Router inside of your Main controller.  The `Switch`
   component renders the first `Route` or `Redirect` that matches the
   location.  On the other hand, the Route component, perhaps the most
   important in React Router, is responsible to render other
   components or HTML content when a location matches the route’s
   path.

    ```javascript
    /* Main.jsx */

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

   The route for Home includes an exact prop to `__` match only when
   the pathname matches the route’s path exactly.

   > Learn more about
   > [Switch](https://reacttraining.com/react-router/web/api/Switch)
   > and [Route](https://reacttraining.com/react-router/web/api/Route)

## Creating a custom 404 NotFound Page

Now, what happens if a user hits a route that is not defined?  Let’s
set up a 404 route and component that will return if the route is not
found.

1. Create a new `NotFound` folder in `scr/containers` directory.

2. Create a `NotFound.jsx` and a `NotFound.scss` files:

    ```javascript
    /* NotFound.jsx */

    import React from 'react';
    import { Link } from 'react-router-dom';
    import './NotFound.css'

    class NotFound extends React.PureComponent {
        render() {
            return (
                <div className="NotFound">
                    <p className="NotFound__title">404<br/>This page is not found</p>
                    <p><Link to="/">Return to Home Page</Link></p>
                </div>
            );
        }
    }

    export default NotFound;
    ```

    ```scss
    /* NotFound.scss */

    .NotFound{
        .NotFound__title{
            font-size: 2.5rem;
        }
    }
    ```

3. Import your new component into the `containers/index.js`file:

    ```diff
    /* src/containers/index.js */
        import Home from './Home/Home';
        import Main from './Main/Main';
    +   import NotFound from './NotFound/NotFound';
        import Services from './Services/Services';
        import Innovation from './Innovation/Innovation';
        import Guestbook from './Guestbook/Guestbook';

        export {
            Home,
            Main,
    +       NotFound,
            Services,
            Innovation,
            Guestbook
        };
    ```

4. Below your `/guestbook` route in Main component, create a new
   route:

    ```diff
    /* Main.jsx */

    import {
        Home,
    +   NotFound,
        Services,
        Innovation,
        Guestbook
    } from "../../containers";

    ...

    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/innovation" component={Innovation} />
        <Route path="/guestbook" component={Guestbook} />
    +   <Route path='*' component={NotFound} />
    </Switch>
    ```

Now, if you navigate to some route that has not been defined
<http://localhost:3000/example>, your 404 NotFound page will appear.

[< Prev](../lab-03) | [Next >](../lab-05)
