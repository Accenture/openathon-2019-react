
# Lab 00 - JavaScript and React

## Table of Contents

- [What is JavaScript](#what-is-javascript)
- [Main Characteristics of React](#main-characteristics-of-react)
- [Resources](#resources)

<br/>  

## What is JavaScript 

**JavaScript** is one of the most important **programming languages** of all time, not simply because of its [popularity](https://www.tiobe.com/tiobe-index). 
Is a multi-paradigm language, supporting **imperative/procedural** programming along with **OOP** (Object-Oriented Programming) with **prototypal inheritance** and **functional programming**.
 
>It’s based on and conforms to **ECMAScript** [specification](https://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf), which latest version is **ECMAScript 2018**.

>It’s an **interpreted language** that needs a **JavaScript Engine** to be executed. There are different engines and each offers a different level of compatibility with the different ECMAScript specifications allowing them to support a certain subset of the JavaScript language:
* [V8](https://developers.google.com/v8/) in Chrome browser and Node.js server
* [SpiderMonkey](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey) in Firefox browser
* [Chakra](https://github.com/Microsoft/ChakraCore) in Edge browser…

It’s used not only in **FrontEnd** web applications but in Hybrid mobile apps ([Ionic](https://ionicframework.com/), [React Native](http://www.reactnative.com/)...) and **BackEnd** ([Node.js](https://nodejs.org/), [Express](https://www.express.com/), [Meteor](https://www.meteor.com/)…)


### The Two Pilars of JavaScript

1. **Prototypal Inheritance**

JavaScript’s object system is based on **prototypes**, **not classes**. A prototype is a working object instance inheriting directly from other objects.
It favors object composition over class inheritance creating **has-a** or **uses-a** or **can-do** relationships as opposed to the **is-a** relationship created with class inheritance.

[Click here for more info](https://medium.com/javascript-scene/master-the-javascript-interview-what-s-the-difference-between-class-prototypal-inheritance-e4cd0a7562e9)


2. **Functional Programming**

It’s the process of building software by composing **pure functions**, **avoiding shared state**, **mutable data**, and **side-effects**. 
It’s **declarative** rather than **imperative**, and application state flows through pure functions. This paradigm contrast with Object-Oriented Programming, where application state is usually shared and located with methods in objects.

[Click here for more info](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0)


## Main Characteristics of React

1. COMPONENT-BASED ARCHITECTURE
    Applications are built using nested, reusable **components**. Components encapsulate a behavior, a view and a state.

2. DECLARATIVE VS IMPERATIVE PROGRAMMING
    Components react to a change in the application state. Their behavior is defined, and when one of their properties changes, a reaction is triggered.

3. HIGH PERFORMANCE, THANKS TO THE VIRTUAL DOM
    When processing changes, React compares the **Virtual DOM** with the DOM to sync and reconcile changes. As a result, the DOM is efficiently and partially updated.

4. JSX
    React extends the syntax of JavaScript to produce “elements”. **JSX expressions** are similar to HTML, but in reality they become JS functions that evaluate to objects. The resulting elements are stored in memory and not in the DOM.

5. ONE-WAY DATA FLOW
    Nested components get a snapshot of their state by their parent component, use it according to their defined behavior, and when a state change occurs, it’s propagated upwards using callbacks.
    State is propagated downwards in the component hierarchy while changes are propagates upwards.

6. COMPONENT LIFE-CYCLE
    React defines the life cycle of components and provide a default implementation; these methods are executed at particular moments of the life cycle, and they can be overridden to run custom code.


## Resources

### You Don't Know JS (book series)

This is a series of books diving deep into the core mechanisms of the JavaScript language. The first edition of the series is now complete.

<a href="http://www.ebooks.com/1993212/you-don-t-know-js-up-going/simpson-kyle/"><img src="up %26 going/cover.jpg" width="75"></a>&nbsp;
<a href="http://www.ebooks.com/1647631/you-don-t-know-js-scope-closures/simpson-kyle/"><img src="scope %26 closures/cover.jpg" width="75"></a>&nbsp;
<a href="http://www.ebooks.com/1734321/you-don-t-know-js-this-object-prototypes/simpson-kyle/"><img src="this %26 object prototypes/cover.jpg" width="75"></a>&nbsp;
<a href="http://www.ebooks.com/1935541/you-don-t-know-js-types-grammar/simpson-kyle/"><img src="types %26 grammar/cover.jpg" width="75"></a>&nbsp;
<a href="http://www.ebooks.com/1977375/you-don-t-know-js-async-performance/simpson-kyle/"><img src="async %26 performance/cover.jpg" width="75"></a>&nbsp;
<a href="http://www.ebooks.com/2481820/you-don-t-know-js-es6-beyond/simpson-kyle/"><img src="es6 %26 beyond/cover.jpg" width="75"></a>

### React JS Notes for Professionals
[Get it here](https://goalkicker.com/ReactJSBook/)

### React In-depth: An exploration of UI development 
[Get it here](https://www.gitbook.com/download/pdf/book/developmentarc/react-indepth)

### React Enlightenment
[Get it here](https://www.gitbook.com/download/pdf/book/frontendmasters/react-enlightenment)

