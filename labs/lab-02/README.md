# Lab 02 - React Fundamentals

## Table of Contents

* [Creating your first React Component](#creating-your-first-react-component)
* [Composing Components](#composing-components)
* [Components and Props](#components-and-props)
* [State Management and Event Handling in Components](#state-management-and-event-handling-in-components)
* [Stateless Components _versus_ Pure Components](#stateless-components-versus-pure-components)
* [Adding Default Props](#adding-default-props)

## Creating your first React Component

**React Components** let you split the user interface into independent
and reusable pieces, thinking about each piece in isolation.

As a general rule, keep components inside the dedicated components
directory.  Create a new folder for each component and place all the
component files inside.

### Naming conventions

* Extensions: Use `.jsx` extension for React components.
* Filename: Use `PascalCase` for filenames (e.g.: `ListDetail.jsx`).

### Create a .jsx file

1. Create a new Header folder in components directory and place a new
   `Header.jsx` file inside:

    ```text
    app/
    └── src/
        └── components/
            └── Header/
                └── Header.jsx
    ```

> JSX is a syntax extension for JavaScript.  It was written to be used
> with React.  JSX is not valid JavaScript.  Before a `.jx` file
> reaches a web browser, a JSX compiler will translate any JSX into
> regular JavaScript.  More info about [JXS Syntax][jsx-syntax].

[jsx-syntax]: https://reactjs.org/docs/introducing-jsx.html

### Import the React library

1. Import the React library in the `Header.jsx` file

    ```javascript
    /* Header.jsx */

    import React from 'react';
    ```

> Note: If your project is running during the next steps,
sometimes you will find errors in your application or in your browser
console. It's also applicable to the next Labs. **Do not worry**, they
should disappear once you reach the end of each section. You can
also review them to get some extra information and clues about
the next steps you need to do to fix them. Consider this errors as a
powerful learning source!

### Create a Component Class

To create a new Header component you can use ES6 classes and extend
the `React.Component` class:

```javascript
/* Header.jsx */

import React from 'react';

class Header extends React.Component {
  // Instructions go here
}
```

1. Include a `render()` method in your instructions.  A render method
   is a property of each component whose value is a function that
   returns a JSX expression.

    ```javascript
    /* Header.jsx */

    class Header extends React.Component {
    render() {
        return (
        //JSX expression
        );
    }
    }
    ```

2. Inside of the render method's body, write a `return` statement that
   returns the logo, the title and the menu of the App.

    ```javascript
    /* Header.jsx */

    class Header extends React.Component {
    render() {
        return (
        <div className="Header">
            <div className="Header__logo">
                <img alt="Accenture Logo"
                src="https://www.accenture.com/t20180820T081710Z__w__/us-en/_acnmedia/Accenture/Dev/Redesign/Acc_Logo_Black_Purple_RGB.PNG"
                />
            </div>
            <h1 className="Header__title">II OPENATHON Custom Open Cloud</h1>
            <div className="Header__menu">
                <nav>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#innovation"></a>Innovation</li>
                        <li><a href="#guestbook">Guestbook</a></li>
                    </ul>
                </nav>
            </div>
        </div>
        );
    }
    }
    ```

### Adding styles to your Component

1. In your `src/assets/styles` directory add a `common` folder.  Copy
   the contents from the same directory in the `lab-02` repository and
   paste in your project.

    ```text
    app/
    └── src/
        └── assets/
            └── styles/
                └── common/
                    ├── _normalize.scss
                    ├── _typography.scss
                    └── _variables.scss
    ```

2. Into your `index.scss` file in `src/styles`, import the recently
   added files:

    ```css
    /* index.scss */

    @import 'assets/styles/common/normalize';
    @import 'assets/styles/common/variables';
    @import 'assets/styles/common/typography';
    ```

3. Add a new `Header.scss` file to your component folder and import
   the processed `.css` file in our component:

    ```bash
    app/
    └── src/
        └── components/
            └── Header/
                ├── Header.jsx
                ├── Header.scss
                └── + Header.css
    ```

    ```javascript
    /* Header.jsx */

    import './Header.css';
    ```

4. Finally add the proper styles to the `.scss` file:

    ```scss
    /* Header.scss */

    // Import variables.scss file
    @import 'assets/styles/common/variables';

    .Header{
        display: flex;
        flex: 0 1 auto;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        padding: $space-s $space-m;
        border-bottom: 1px solid $border-color;

        .Header__logo{
            img{
                max-width: 150px;
            }
        }

        .Header__menu{
            display: flex;
            flex: 0 1 auto;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: flex-end;
            align-items: center;

            nav{
                ul{
                    margin: 0;
                    li{
                        float: left;
                        margin: 0 $space-s;
                        list-style: none;
                        a{
                            color: $text-color;
                            text-decoration: none;
                        }
                    }
                }
            }
        }

        .Header__title{
            font-size: 1rem;
            text-align: left;
        }
    }
    ```

### How to export your Component

1. Add at the end of your `Header.jsx` file:

    ```javascript
    /* Header.jsx */

    export default Header;
    ```

2. One of the drawbacks of your components directory structure is that
   importing components requires you to import the fully qualified path. To
   enable shorter import statements, add a new `index.js` file into your
   components directory and export the named component. This will be a common
   pattern in your project that you need to repeat every time you add a
   new component:

    ```javascript
    /* src/components/index.js */

    import Header from './Header/Header';

    export {
        Header
    };
    ```

Now, you can import your Header component in other components of your app
doing this:

```javascript
import { Header } from '../../components';
```

Instead of this:

```javascript
import { Header } from '../../components/Header/Header';
```

### How to render your Component

Ensure that your `public/index.html` page contains an empty `<div
id="root"></div>` tag.  This `<div>` with an unique id attribute will
allow you to find it from the JavaScript code and display a React
component inside of it.

Go to `src/index.js` and check that the following lines exist:

```javascript
/* src/index.js */

import ReactDOM from 'react-dom';

...

ReactDOM.render(<App />, document.getElementById('root'));
```

The `react-dom` package provides DOM-specific methods that can be used
at the top level of your app.  The last line of code finds the `<div>`
in your `index.html` and then displays your App React component inside
of it.

> Learn more about the [ReactDom
> package](https://reactjs.org/docs/react-dom.html).

Finally, save all the changes and check it in your browser.  Run `npm
start` if the project is not running currently.

## Composing Components

Components can refer to other components in their output.  This lets
us use the same component abstraction for any level of detail.  A
button, a form, a dialog, a screen: in React apps, all those are
commonly expressed as components.

Create an App component that renders the new Header component:

1. Move the App folder from `components` directory to a new folder
   `controllers`.

2. Change the new route for your App controller in `src\index.js`
   file: `import App from './controllers/App/App'`;

3. Change the extension of your `App.js` file to `App.jsx`.

4. Delete unnecessary `App.scss` and `App.css` files and remove the
   `import './App.css';` in your `App.jsx` file and delete the
   imported logo.

5. Add `import { Header } from '../../components'` in `App.jsx`.

6. Add your Header component inside the render method.

    ```javascript
    /* App.jsx */

    render() {
        return (
        <div className="App">
            <Header />
            <p className="Main">
                Main content
            </p>
        </div>
        );
    }
    ```

In the same way, we can split components into smaller components.

1. Remove all the following JSX statement from the Header render
   method.

    ```javascript
    /* Header.jsx */

    <div className="Header__menu">
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#innovation">Innovation</a></li>
                <li><a href="#guestbook">Guestbook</a></li>
            </ul>
        </nav>
    </div>
    ```

2. Create a new Menu component (following the previous steps to create
   a new component) that renders the removed menu in Header:

    ```javascript
    /* Menu.jsx */

    import React from 'react';

    class Menu extends React.Component {
        render() {
            return (
            <div className="Menu">
                <nav>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#innovation">Innovation</a></li>
                        <li><a href="#guestbook">Guestbook</a></li>
                    </ul>
                </nav>
            </div>
            );
        }
    }

    export default Menu;
    ```

3. Add the Menu component to the `index.js` file in `components`

    ```javascript
    /* src/components/index.js */

    import Header from './Header/Header';
    import Menu from './Menu/Menu';

    export {
        Header,
        Menu
    };
    ```

4. Import the Menu component in Header.jsx file and replace the
   removed code by the new Menu:

    ```javascript
    /* Header.jsx */

    import React from 'react';
    import { Menu } from '../../components'

    class Header extends React.Component {
        render() {
            return (
                <div className="Header">
                    <div className="Header__logo">
                        <img alt="Accenture Logo"
                            src="https://www.accenture.com/t20180820T081710Z__w__/us-en/_acnmedia/Accenture/Dev/Redesign/Acc_Logo_Black_Purple_RGB.PNG"
                        />
                    </div>
                    <h1 className="Header__title">II OPENATHON Custom Open Cloud</h1>
                    <Menu />
                </div>
            );
        }
    }

    export default Header;
    ```

## Components and Props

Another way that components can interact is passing information from
one component to another.  This information is known as **props**.

1. In the `App.jsx` render method, add a new `logo` attribute to the
   Header instance:

    ```javascript
    /* App.jsx */

    render() {
        return (
        <div className="App">
            <Header logo="https://www.accenture.com/t20180820T081710Z__w__/us-en/_acnmedia/Accenture/Dev/Redesign/Acc_Logo_Black_Purple_RGB.PNG"/>
            <p className="Main">
                Main content
            </p>
        </div>
        );
    }
    ```

    This prop will be received by our Header component and can be
    accesses via `this.props.<propName>`:

2. Add your prop value in the `Header.jsx` render method:

    ```javascript
    /* Header.jsx */

    render() {
            return (
                <div className="Header">
                    <div className="Header__logo">
                        <img alt="Accenture Logo"
                            src={this.props.logo}
                        />
                    ...
    ```

Conceptually, components are like JavaScript functions.  They accept
arbitrary inputs (_props_) and return React elements describing what
should appear on the screen.  At the same time, we can pass props from
a component to a different component.

**Props are Read-Only**, so all React components must act like pure
functions with respect to their props.

> More info about
> [Props](https://reactjs.org/docs/components-and-props.html)

## State Management and Event Handling in Components

React components will often need dynamic information (_information
that can change_) in order to render themselves.  Unlike props, a
component's **_state_** is not passed in from the outside and each
component decides its own state.

To make a component have state, give it an initial state property.

1. Declare a new State inside of a `constructor(props)` method in Menu
   component:

    ```javascript
    /* Menu.jsx */

    constructor(props){
        super(props);
        this.state = {
            expandedMenu: true
        };
    }
    ```

A component can read its own state `this.state.<stateName>` and also
it can change its value by calling the function `this.setState()`.
This function takes an object and merges it with the component's
current state.

### Events

The most common way to change a current state is to call a custom
function when a **event** is triggered, for example by clicking on a
button.

Handling events with React elements is very similar to handling events
on DOM elements, with two syntactic differences:

* React events are named using `camelCase`, rather than
  lowercase. E.g.: `onClick` instead `onclick`.

* With JSX you pass a function as the event handler, rather than a
  string.

1. Add a new button inside Menu render method and an event handler
   when the user clicks on the button (`onClick`):

    ```javascript
    /* Menu.jsx */

    render() {
        <div className="Menu">
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#innovation">Innovation</a></li>
                <li><a href="#guestbook">Guestbook</a></li>
            </ul>
        </nav>
        <button onClick={this.toggleMenu}>
        Menu
        </button>
        </div>
    }
    ```

2. Add a custom method that changes the `expandedMenu` state of Menu
   component:

    ```javascript
    /* Menu.jsx */

    toggleMenu() {
        this.setState({ expandedMenu: !this.state.expandedMenu });
    }
    ```

3. Bind `this` in the component constructor:

    ```javascript
    /* Menu.jsx */

    constructor(props){
        ...
        this.toggleMenu = this.toggleMenu.bind(this);
    }
    ```

    > In JavaScript, class methods are not bound by default. If you
    > forget to bind `this.toggleMenu` and pass it to `onClick`, this
    > will be `undefined` when the function is actually called.  If
    > calling `bind` annoys you, there are two ways you can get around
    > this: using the experimental public class fields syntax or using
    > an arrow function in the callback.

4. Add a condition that checks `expandedMenu` state to render or not
   the navigation:

    ```javascript
    /* Menu.jsx */

    render() {
    ...
        {this.state.expandedMenu &&
        <nav>
            ...
        </nav>
        }
        ...
    ```

    Test to change the initial state `expandedmenu` to `false`
    and the menu will be hidden by default. Change again the value
    to true.

    > Learn more about [Conditional Rendering in
    > React](https://reactjs.org/docs/conditional-rendering.html).

5. Remove the Menu styles in `Header.scss` and place into the `Menu.scss`:

    ```scss
    /* Header.scss */

    @import 'assets/styles/common/variables';

    .Menu{
        display: flex;
        flex: 0 1 auto;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-end;
        align-items: center;

        button{
            margin-left: $space-s;
        }

        nav{
            ul{
                margin: 0;
                li{
                    float: left;
                    margin: 0 $space-s;
                    list-style: none;
                    a{
                        color: $text-color;
                        text-decoration: none;
                    }
                }
            }
        }
    }
    ```

6. Import the new `Header.css` file into your Header component
   and the new `Menu.css` in your Menu component:

    ```javascript
    /* Header.jsx */

    import './Header.css';
    ```

    ```javascript
    /* Menu.jsx */

    import './Menu.css';
    ```

7. To prevent that the `Header__title` moves on Menu collapsing,
   assign a default width to each Header component:

    ```diff
    /* Menu.scss */
        .Menu{
            display: flex;
            flex: 0 1 auto;
    +       flex-basis: 40%;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: flex-end;
            align-items: center;
    ```

    ```diff
    /* Header.scss */

        .Header__logo{
    +       flex-basis: 20%;
            img{
                max-width: 120px;
            }
        }

        .Header__title{
    +       flex-basis: 40%;
            font-size: 1rem;
    -       text-align: left;
    +       text-align: center;
        }

        ...
    ```

8. Add a `className="Menu__button"` to your button in `Menu.jsx` file
   and a conditional class `Menu__button--expanded` checking the
   _expandedMenu_ state. Remove the label `Menu`:

    ```javascript
    /* Menu.jsx */

    <button className={`Menu__button ${this.state.expandedMenu ? 'Menu__button--expanded' : ''}`}
        onClick={this.toggleMenu}
    />
    ```

9. Include some additional styles in `Menu.scss`:

    ```scss
    /* Menu.scss */

    .Menu__button{
        position: relative;
        width: 20px;
        height: 16px;
        margin-left: $space-s;
        border: 0;
        border-top: 3px solid $text-color;
        border-bottom: 3px solid $text-color;
        background: transparent;
        cursor: pointer;

        &:before,
        &:after {
            content: '';
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 3px;
            background: $text-color;
            transform: translate(-50%, -50%);
            transition: transform ease-in-out .15s;
        }

        &--expanded{
            border-color: transparent;

            &:before {
                transform: translate(-50%, -50%) rotate(45deg);
            }

            &:after {
                transform: translate(-50%, -50%) rotate(-45deg);
            }
        }
    }
    ```

10. Finally, include some styles in your `Menu.scss` file to animate
    your menu:

    ```scss
    /* Menu.scss */

    nav{
        animation: fadeIn 1s;

        ul{
            margin: 0;

            li{
                position: relative;
                float: left;
                margin: 0 $space-s;
                list-style: none;
                line-height: 36px;
                text-align: center;

                &:after{
                    content: '';
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    width: 0%;
                    height: 2px;
                    margin: auto;
                    background-color: $main-color;
                    transition: width 0.4s ease-in-out;
                }

                &:hover{
                    color: $main-color;

                    &:after{
                        width: 100%;
                    }

                    a{
                        color: $main-color;
                    }
                }

                a{
                    color: $text-color;
                    text-decoration: none;
                    transition: color 0.4s ease-in-out;
                }
            }
        }
    }

    ...

    @keyframes fadeIn {
        0% {opacity: 0;}
        100% {opacity: 1;}
    }

    ```

## Stateless Components _versus_ Pure Components

A **Stateless Component** is declared as a function that has no state
and returns the same markup given the same props:

```javascript
HelloWorld = () => {
  return <h1>HelloWorld</h1>;
}
```

A **Pure Component** is one of the most significant ways to optimize
React applications.  The usage of Pure Component gives a considerable
increase in performance because it reduces the number of render
operations in the application:

```javascript
class HelloWorld extends React.PureComponent {
  render() {
    return <h1>HelloWorld</h1>
  }
}
```

1. Create a new Footer component as a Pure Component:

    ```javascript
    /* Footer.jsx */

    import React from 'react';
    import './Footer.css';

    class Footer extends React.PureComponent {
        render() {
            return (
            <div className="Footer">
                <p className="Footer__info">
                    'II Openathon Custom Open Cloud'
                </p>
            </div>
            );
        }
    }

    export default Footer;
    ```

2. Add some styles to your footer component into a `Footer.scss` file

    ```css
    /* Footer.scss */

    @import 'assets/styles/common/variables';

    .Footer {
        padding: $space-s $space-m;
        border-top: 1px solid $border-color;
        font-size: $font-s;
        text-align: center;
    }
    ```

## Adding Default Props

You can define some default values for your component props and ensure
that these props will have a value if they were not provided by the
parent component.

To assign a value to a specific prop, use the special `defaultProps`
property.

Suppose that you want to define your `Footer__info` text as a prop
`footerInfo` that could change.

```javascript
/* Footer.jsx */
render() {
    return (
    <div className="Footer">
        <p className="Footer__info">
            {this.props.footerInfo}
        </p>
    </div>
    );
}
```

In `App.jsx` we are not passing currently a prop to our Footer
component:

```javascript
/* App.jsx */

render() {
    return(
        ...
        <Footer />
        ...
    )
}
```

To avoid an error in your application, you can define a default value
to this prop.

1. Add a default prop to your Footer component. _To improve the
   readability, you can define a `defaultProps` constant at the
   beginning of your file and assign its values before your component
   export_:

    ```javascript
    /* Footer.jsx */

    import React from 'react';
    import './Footer.css';

    const defaultProps = {
        footerInfo: 'II Openathon Custom Open Cloud'
    };

    class Footer extends React.PureComponent {
        render() {
            return (
            <div className="Footer">
                <p className="Footer__info">
                    {this.props.footerInfo}
                </p>
            </div>
            );
        }
    }

    Footer.defaultProps = defaultProps;
    export default Footer;
    ```

2. Run you application and check that it's working as expected.

> Learn more about [Default Prop Values][prop]

[prop]: https://reactjs.org/docs/typechecking-with-proptypes.html#default-prop-values

[< Prev](../lab-01) | [Next >](../lab-03)
