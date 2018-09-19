
# Lab 02 - Fundamental React Concepts

## Table of Contents

- [Creating your first React Component](#creating-my-first-react-component)
- [Composing Components](#composing-components)
- [Components and Props](#components-and-props)
- [State Management and Event Handling in Components](#state-management-and-event-handling-in-components)
- [Stateless Components _versus_ Pure Components](#stateless-components-versus-puro-components)
- [Adding Default Props](adding-default-props)

<br/>  

## Creating your first React Component 

**React Components** let you split the UI into independent and reusable pieces, thinking about each piece in isolation.

As a general rule, keep components inside the dedicated components directory. Create a new folder for each component and place all the component files inside. 

**Naming conventions**
* Extensions: Use .jsx extension for React components.  
* Filename: Use PascalCase for filenames. E.g., ListDetail.jsx.

<br/>  

### Create a .jsx file

1. Create a new Header folder in components directory and place a new Header.jsx file inside:

    ```
    app/
    src/
        components/
        Header/
            Header.jsx
    ```

>JSX is a syntax extension for JavaScript. It was written to be used with React. JSX is not valid JavaScript. Before a .jx file reaches a web browser, a JSX compiler will translate any JSX into regular JavaScript. More info about [JXS Syntax](https://reactjs.org/docs/introducing-jsx.html)

<br/>  

### Import the React library

1. Import the React library in the Header.jsx file

    ```javascript
    import React from 'react';
    ```

<br/>  

### Create a Component Class

To create a new Header component you can use ES6 classes and extend the React.Component class:

```javascript
class Header extends React.Component {
  // Instructions go here
}
```

1. Include a **_render()_** method in your instructions. A render method is a property of each component whose value is a function that returns a JSX expression.

    ```javascript
    class Header extends React.Component {
    render() {
        return (
        //JSX expression
        );
    }
    }
    ```

    <br/>  
2. Inside of the render method's body, write a **_return statement_** that returns the logo, the title and the menu of the App.

    ```javascript
    class Header extends React.Component {
    render() {
        return (
        <div className="Header">
            <div className="Header-logo">
                <img alt="Accenture Logo"
                src="https://www.accenture.com/t20180820T081710Z__w__/us-en/_acnmedia/Accenture/Dev/Redesign/Acc_Logo_Black_Purple_RGB.PNG"
                />
            </div>
            <h1 className="Header-title">Accenture - II OPENATHON Custom Open Cloud</h1>
            <div className="Header-menu">
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

<br/>  

### Adding styles to your Component

1. In your ```src\assets\styles```directory add a ```common``` folder. Copy the contents from the same directory in the lab-02 repository and paste in your project.

    ```
    app/
    src/
        assets/
        styles/
            common/
            _normalize.scss
            _typography.scss
            _variables.scss
    ```

    <br/>  
2. Import the new files in your index.scss file:

    ```css
    @import 'assets/styles/common/normalize';
    @import 'assets/styles/common/variables';
    @import 'assets/styles/common/typography';
    ```

    <br/>  
3. Add a new .scss file to your component folder and import the processed .css file in our component:

    ```
    app/
    src/
        components/
        Header/
            Header.jsx
            Header.scss
            + Header.css
    ```

    ```javascript
    import './Header.css';
    ```

    <br/>  
4. Finally add the proper styles to the .scss file:

    ```css
    .Header{
        display: flex;
        flex: 0 1 auto;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        padding: $space-s $space-m;
        border-bottom: 1px solid $border-color;

        &-logo{
            img{
                max-width: 150px;
            }
        }

        &-menu{
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

        &-title{
            font-size: 1rem;
            text-align: left;
        }
    }
    ```

Save the changes and check it in your browser. Run ```npm start``` if the proyect is not running currently.

<br/>  

### How to export your Component

1. At the end of your Header.jsx file add:

    ```javascript
    export default Header;
    ```

    <br/>  
2. Add a new index.js file into your components directory to export the named component:

    ```javascript
    import Header from './Header/Header';

    export {
        Header
    };
    ```

<br/> 

### How to render your Component

// TODO: ReactDOM guide.

## Composing Components

Components can refer to other components in their output. This lets us use the same component abstraction for any level of detail. A button, a form, a dialog, a screen: in React apps, all those are commonly expressed as components. 

Create an App component that renders the new Header component:

1. Move App folder from ```components``` directory to a new folder ```controllers``` and delete unnecessary .scss file.

2. Add ```import { Header } from '../../components'```

3. Add your Header component inside the render method.

    ```javascript
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

1. Remove all the following JSX statement from the Header render method.

    ```javascript
    <div className="Header-menu">
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
    
    <br/>  
2. Create a new Menu component (following the previous steps to create a new component) that renders the removed menu in Header:

    ```javascript
    import React from 'react';
    import './Menu.css';

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

    <br/>  
3. Add the Menu component to the index.js file in ```components```

    ```javascript
    import Header from './Header/Header';
    import Menu from './Menu/Menu';

    export {
        Header,
        Menu
    };
    ```

    <br/>  
4. Import the Menu component in Header.jsx file and replace the removed code by the new Menu:

    ```javascript
    import React from 'react';
    import { Menu } from '../../components'
    import './Header.css';

    class Header extends React.Component {
        render() {
            return (
                <div className="Header">
                    <div className="Header-logo">
                    <img alt="Accenture Logo"
                        src={this.props.logo}
                    />
                    </div>
                    <h1 className="Header-title">Accenture - II OPENATHON Custom Open Cloud</h1>
                    <Menu />
                </div>
            );
        }
    }

    export default Header;
    ```

<br/>  

## Components and Props

Another way that components can interact is passing information from one component to another. This information is known as "**_props_**"

1. In the App.jsx render method, add a new "logo" attribute to the Header instance:

    ```javascript
    render() {
        return (
        <div className="App">
            <Header logo="https://www.accenture.com/t20180820T081710Z__w__/us-en/_acnmedia/Accenture/Dev/Redesign/Acc_Logo_Black_Purple_RGB.PNG"/>
            <p className="Main">
            Main content
            </p>
            <p className="Main">
            Main content
            </p>
        </div>
        );
    }
    ```

    This prop will be received by our Header component and can be acceses via ```this.props.<propName>```:

    <br/>  
2. Add your prop value in the Header.jsx render method:

    ```javascript
    render() {
            return (
                <div className="Header">
                    <div className="Header-logo">
                    <img alt="Accenture Logo"
                        src={this.props.logo}
                    />
                    ...
    ```

Conceptually, components are like JavaScript functions. They accept arbitrary inputs (_props_) and return React elements describing what should appear on the screen. At the same time, we can pass props from a component to a different component.

**Props are Read-Only**, so all React components must act like pure functions with respect to their props.

>More info about [Props](https://reactjs.org/docs/components-and-props.html)

<br/>  

## State Management and Event Handling in Components

React components will often need dynamic information (_information that can change_) in order to render. Unlike props, a component's **_state_** is not passed in from the outside and each component decides its own state.

To make a component have state, give it an initial state property.

1. Declare a new State inside of a **_constructor(props)_** method in Menu component:

    ```javascript
    constructor(props){
        super(props);
        this.state = {
            expandedMenu: true
        };
    }
    ```

A component can read its own state ```this.state.<stateName>``` and also it can change its value by calling the function **_this.setState()_**. This function takes an object and merges it with the component's current state.

<br/>  

### Events

The most common way to change a current state is to call a custom function when a **event** is triggered, for example by clicking on a button.

Handling events with React elements is very similar to handling events on DOM elements, with two syntactic differences:

* React events are named using camelCase, rather than lowercase. _E.g.: onClick instead onclick._
* With JSX you pass a function as the event handler, rather than a string.

1. Add a new button inside Menu render method and an event handler when the user clicks on the button (_onClick_):

    ```javascript
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
    ```

    <br/>  
2. Add a custom method that changes the expandedMenu state of Menu component:

    ```javascript
    toggleMenu() {
        this.setState({ expandedMenu: !this.state.expandedMenu });
    }
    ```

    <br/>  
3. Bind ```this``` in the component constructor:

    ```javascript
    constructor(props){
        ...
        this.toggleMenu = this.toggleMenu.bind(this);
    }
    ```

    >In JavaScript, class methods are not bound by default. If you forget to bind this.toggleMenu and pass it to onClick, this will be ```undefined``` when the function is actually called. If calling bind annoys you, there are two ways you can get around this: using the experimental public class fields syntax or using an arrow function in the callback.

    <br/>  
4. Add a condition that checks _expandedMenu_ state to render or not the navigation:

    ```javascript
    {this.state.expandedMenu &&
    <nav>
        ...
    </nav>
    }
    ```

    <br/>  
5. Finally, remove the Menu styles in Header.scss and place into the Menu.scss:

    ```css
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

    <br/>  
6. To prevent that the ```Header-title``` moves on Menu collapsing, assign a default width to each Header component styles:

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
            &-logo{
    +           flex-basis: 20%;
                img{
                    max-width: 150px;
                }
            }

            &-title{
    +            flex-basis: 40%;
                 font-size: 1rem;
    -            text-align: left
    +            text-align: center;
            }
    ```

    <br/>  
7. Add a ```className="Menu-button"``` to your button in Menu.jsx file and include some styles:

    ```scss
    &-button{
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

<br/>  

## Stateless Components _versus_ Pure Components

A Stateless Component is declared as a function that has no state and returns the same markup given the same props:

```javascript
HelloWorld = () => {
  return <h1>HelloWorld</h1>;
}
```

A Pure Component is one of the most significant ways to optimize React applications. The usage of Pure Component gives a considerable increase in performance because it reduces the number of render operations in the application:

```javascript
class HelloWorld extends React.PureComponent {  
  render() {
    return <h1>HelloWorld</h1>
  }
}
```

1. Create a new Footer component as a Pure Component:  

    ```javascript
    import React from 'react';
    import './Footer.css';

    class Footer extends React.PureComponent {
        render() {
            return (
            <div className="Footer">
                <p className="Footer-info">
                    'Copyright 2001-2018 Accenture. All rights reserved. Accenture Confidential. For internal use only.'
                </p>
            </div>
            );
        }
    }

    export default Footer;
    ```

    <br/>  
2. Add some styles to your footer component into a Footer.scss file

    ```css
    @import 'assets/styles/common/variables';

    .Footer {
        padding: $space-s $space-m;
        border-top: 1px solid $border-color;
        font-size: $font-s;
        text-align: center;
    }
    ```

<br/>  

## Adding Default Props

You can define some default values for your component props and ensure that these props will have a value if they were not provided by the parent component.

To assign a value to a specific prop, use the special defaultProps property.

1. Add a default prop to your Footer component. _To add more readability, you can define a defaultProps constant at the beginning of your file and assign its values before your component export_: 

    ```javascript
    import React from 'react';
    import './Footer.css';

    const defaultProps = {
        footerInfo: 'Copyright 2001-2018 Accenture. All rights reserved. Accenture Confidential. For internal use only.'
    };

    class Footer extends React.PureComponent {
        render() {
            return (
            <div className="Footer">
                <p className="Footer-info">
                    {this.props.footerInfo}
                </p>
            </div>
            );
        }
    }

    Footer.defaultProps = defaultProps;
    export default Footer;
    ```

    <br/>  
2. Run you application and check that it's working as expected.

> Learn more about [Default Prop Values](https://reactjs.org/docs/typechecking-with-proptypes.html#default-prop-values).