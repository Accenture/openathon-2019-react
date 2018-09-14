
# Lab 02

## Table of Contents

- [Creating my first React Component](#creating-my-first-react-component)
- [How to export your Component](#how-to-export-your-component)
- [Composing Components](#composing-components)
- [Components and Props](#components-and-props)
- [State Management and Event Handling in Components](#state-management-and-event-handling-in-components)
- [Stateless Components _versus_ Pure Components](#stateless-components-versus-puro-components)

## Creating my first React Component 

Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. Components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.

As a general rule, keep components inside the dedicated components directory. Create a new folder for each component and place all the component files inside. 

**Naming conventions**
Extensions: Use .jsx extension for React components.
Filename: Use PascalCase for filenames. E.g., ListDetail.jsx.

### Create a .jsx file

Create a new Header folder in components directory and place a new Header.jsx file inside.

>JSX is a syntax extension for JavaScript. It was written to be used with React. JSX is not valid JavaScript. Before a .jx file reaches a web browser, a JSX compiler will translate any JSX into regular JavaScript. More info about [JXS Syntax](https://reactjs.org/docs/introducing-jsx.html)

### Import the React library

Get the React library via ```import```

```js
import React from 'react';
```

### Create a Component Class

To create a new Header component you can use ES6 classes and extend the React.Component class:

```js
class Header extends React.Component {
  // Instructions go here
}
```
Include a **_render()_** method in your instructions. A render method is a property whose name is render, and whose value is a function that returns a JSX expression.

```js
class Header extends React.Component {
  render() {
    return (
      //JSX expression
    );
  }
}
```
Inside of the render method's body, write a return statement that returns the logo, the title and the menu of the App.

```js
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
### Adding styles to your Component

Add a new .scss file to your component folder and import the processed .css file in our component:

```js
import './Header.css';
```

## How to export your Component

At the end of your Header.jsx file add:

```js
export default Header;
```

## Composing Components
Components can refer to other components in their output. This lets us use the same component abstraction for any level of detail. A button, a form, a dialog, a screen: in React apps, all those are commonly expressed as components. 

Create an App component that renders Header components:

1. Move App folder from ```components``` directory to a new folder ```controllers``` and delete unnecessary .scss file.

2. Add ```import { Header } from '../../components'```

3. Add your Header component inside the render method.

```js
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

Remove all the following JSX statement from the Header render method and create a new Menu component that renders it:

```js
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

```js
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

Replace the removed code in Header.jsx file by the new Menu component:

```js
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

## Components and Props

Another way that components can interact is passing information from one component to another. This information is known as "props."

In the App.jsx render method, add a new "logo" attribute to the Header instance:

```js
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

This prop will be received by our Header component and can be acceses via ```this.props.propName```:

```js
render() {
        return (
            <div className="Header">
                <div className="Header-logo">
                <img alt="Accenture Logo"
                    src={this.props.logo}
                />
                ...
```

Conceptually, components are like JavaScript functions. They accept arbitrary inputs (“props”) and return React elements describing what should appear on the screen. At the same time, we can pass props from a component to a different component.

**Props are Read-Only**, so all React components must act like pure functions with respect to their props.

>More info about [Props](https://reactjs.org/docs/components-and-props.html)

## State Management and Event Handling in Components

React components will often need dynamic information _(information that can change)_ in order to render. Unlike props, a component's state is not passed in from the outside and each component decides its own state.

To make a component have state, give the component a initial state property. Declare a new State inside of a **_constructor(props)_** method in Menu component:

```js
constructor(props){
    super(props);
    this.state = {
        expandedMenu: true
    };
}
```
A component can read its own state ```this.state.stateName``` and also it can change its value by calling the function **_this.setState()_**. This function takes an object and merges it with the component's current state.

The most common way to change a current state is to call a custom function when a **event** is triggered, for example by clicking on a button.

Handling events with React elements is very similar to handling events on DOM elements, with two syntactic differences:
1. React events are named using camelCase, rather than lowercase.
2. With JSX you pass a function as the event handler, rather than a string.

Add a new button inside Menu render method and a click handler:

```js
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

Add a custom method that changes the expandedMenu state of Menu component and bind this in the component constructor:

```js
constructor(props){
    ...
    this.toggleMenu = this.toggleMenu.bind(this);
}

toggleMenu() {
    this.setState({ expandedMenu: !this.state.expandedMenu });
}
```

Add a condition that checks _expandedMenu_ state to render or not the navigation:

```js
{this.state.expandedMenu &&
  <nav>
    ...
  </nav>
}
```

Finally, update the Menu styles in Header.scss and Menu.scss:

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

## Stateless Components _versus_ Pure Components

A Stateless Component is declared as a function that has no state and returns the same markup given the same props:

```js
HelloWorld = () => {
  return <h1>HelloWorld</h1>;
}
```

A Pure Component is one of the most significant ways to optimize React applications. The usage of Pure Component gives a considerable increase in performance because it reduces the number of render operation in the application:

```js
class HelloWorld extends React.PureComponent {  
  render() {
    return <h1>HelloWorld</h1>
  }
}
```

Create a new Footer component as a Pure Component and add a default prop:  

```js
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

> If you want certain props to have default values if nothing is provided, you can do this by defining defaultProps.