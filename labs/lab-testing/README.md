
# Lab Unit Testing

## Table of Contents

* [Why Testing?](#why-testing?)
* [The different types of tests](#the-different-types-of-test)
* [Unit Testing](#unit-testing)

## Why Testing?

>Because it’s important to find any issue that could potentially go wrong before our product/solution/website/mobile app goes live to the public.  

For example, for a website, by testing, issues like basic functionality, accessibility to users or the site’s ability to adapt to responsive devices (like smart phones, tablets, and desktop devices) can be addressed and fixed before our website is launched.

At a high level, we need to make the distinction between manual and automated tests:

* **Manual testing** is done in person, by clicking through the application or interacting with the software and APIs with the appropriate tooling. This is very expensive as it requires someone to set up an environment and execute the tests themselves, and it can be prone to human error as the tester might make typos or omit steps in the test script.

* **Automated tests**, on the other hand, are performed by a machine that executes a test script that has been written in advance. These tests can vary a lot in complexity, from checking a single method in a class to making sure that performing a sequence of complex actions in the UI leads to the same results. It's much more robust and reliable than automated tests – but the quality of your automated tests depends on how well your test scripts have been written.

## The different types of tests

There are many different types of testing that you can use to make sure that changes to your code are working as expected.
This subject is too complex but it's worth mention some of them:

* Unit Testing
* Integration Testing
* Functional Testing
* System Testing
* Stress Testing
* Performance Testing
* Usability Testing
* Acceptance Testing
* Regression Testing
* Beta Testing  
* and more...

In this Lab we are going to address **Unit Testing**.

> For more information, here is an interesting article about [JavaScript testing](https://medium.com/welldone-software/an-overview-of-javascript-testing-in-2018-f68950900bc3)

![Software Testing Club](https://c1.staticflickr.com/5/4137/4742972042_aa69882a59_z.jpg)
[Image source](https://www.flickr.com/photos/softwaretestingclub/4742972042/sizes/l)

## Unit Testing

Essentially, a Unit Test is:

* a **method** that instantiates a **small section of code** of our application
* and **verifies** its behaviour **independently** from other parts.

Unit test **is not about finding bugs**, but it's useful for *refactoring* (restructuring code without changing its behaviour) to notice (the unit test will fail) if changes have broken what we already had working.

>The purpose of a **Unit Test** is to **verify the behaviour** of a relatively small piece of software, independently from other parts.

A typical Unit Test contains 3 phases also known as **AAA**: **Arrange**, **Act** and **Assert**:

* *Arrange*: Initializes a small piece of an application it wants to test (also known as the System Under Test, or SUT).
* *Act*: Applies some stimulus to the system under test, usually by calling a method on it.
* *Assert*: Observes the resulting behaviour.
  * If the observed behaviour is consistent with the expectations, the unit test passes.
  * Otherwise, it fails, indicating that there is a problem somewhere in the system under test.

### Unit Test Principles

**F.I.R.S.T.**

* **Fast**. We may have thousands of tests in the entire project.

* **Isolated/Independent**. A test method should do AAA => Arrange, Act, Assert.

* **Repeatable**. NOT depend on any data, should setup or arrange it's own data, should yield the same results every time and at every location where they run, no dependency on date/time or random functions output.

* **Self-Validating**. No manual inspection required to check whether the test has passed or failed.

* **Thorough**. Should cover every use case scenario and NOT just aim for 100% coverage, corner/edge/boundary values, large data sets, security, large values, exceptions and errors, illegal arguments or bad inputs…

### Jest Testing Framework

In *JavaScript* world there are a lot of testing frameworks, runner frameworks,  that allow writing and executing tests (not only unit tests) like:

* [Karma](https://karma-runner.github.io/2.0/index.html)
* [Mocha](https://mochajs.org/)
* [Jasmine](https://jasmine.github.io/)
* [Protractor](https://www.protractortest.org/#/)
* [Jest](https://jestjs.io/)
* [Enzyme](https://github.com/airbnb/enzyme)

And a lot more...

When we use *create-react-app* a default testing framework is included: **Jest**.

<img src="https://d3vv6lp55qjaqc.cloudfront.net/items/2D2K45312x0M1q2C0a3P/jest-logo.svg" width="200">

**Jest** it's an Open Source project maintained by Facebook (like React) and it's especially well suited for React code testing, although not limited to that: it can test any JavaScript code.

**Jest** is defined as a **Zero configuration testing platform** that covers:

* Unit testing
* Code Coverage reports
* Mocking library

Jest strengths are:

* it’s fast
* it can perform snapshot testing
* it’s opinionated, and provides everything out of the box without requiring you to make choices

### Jest Installation

As mentioned above, Jest is automatically installed in *create-react-app*, so we don’t need to install Jest, but just in case we don't have it already:

```sh
npm install --save-dev jest
```

Notice how we instruct both to put Jest in the devDependencies part of the `package.json file`, so that it will only be installed in the development environment and not in production.

### Enzyme Installation

We also will use **Enzyme** that is a JavaScript Testing utility for React that makes it easier to assert, manipulate, and traverse your React Components' output.

```sh
npm i --save-dev enzyme enzyme-adapter-react-16
```

## Creating my first Unit Test

Create `Menu.test.js` file in the same folder as `Menu.jsx` (in our project, `source/components/Menu`). This file will be used to write the different tests that Jest is going to execute for us.

Add the next code where the main point is to import our Menu component `import Menu from './Menu';` and remember that **a unit test _tests_ an isolated portion of code, not the application**.

```js
import React from 'react';
import Menu from './Menu';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
```

We’ll write a proper test shortly, but for now, put in this dummy test, which will let us check everything’s working correctly and we have Jest configured:

```js
describe('Addition', () => {
    it('knows that 2 and 3 make 5', () => {
        expect(2 + 3).toBe(5);
    });
});
```

Open now a terminal/console and run the already existing tests:

```sh
npm run test
```

or

```sh
npm test
```

```sh
PASS  src/components/Menu/Menu.test.js  
    ✓ renders without crashing (2ms)
  Addition
    ✓ knows that 2 and 3 make 5 (1ms)
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.365s, estimated 1s
Ran all test suites.
```

You can see that all *.test.js* files have been executed by Jest (currently only one) with a summary of the results, execution time and warnings. Also notice the render of our test descriptions:

```sh
Addition
    ✓ knows that 2 and 3 make 5 (1ms)
```

> In case you receive an error message, check if you have another test file already in the project: Find a file named **App.test.js** in Visual Studio Code using `cmd ⌘ + p` (Mac) or `ctrl + p` (Windows) and delete it.

In our dummy test code, Jest lets us use `describe` and `it` to nest tests as we need to. How much nesting you use is up to the requirements but a best practise is to nest in a way that **all the descriptive strings passed to _describe_ and _it_ read almost as a sentence**. This way the test describes itself!

When it comes to making actual assertions, we wrap the thing we want to test within an **expect()** call, before then calling an assertion on it. In this case, we’ve used **toBe**. You can find a list of all the available assertions in the [Jest documentation](https://jestjs.io/docs/en/api).

**toBe** checks that the given value matches the value under test, using === to do so.

### Testing Business Logic

Now we’ve seen Jest work on a dummy test, let’s get it running on a real one.
We’re going to test that when the Menu button is pressed *expandedMenu* state is changed by *toggleMenu* method that swaps it from true to false, or vice-versa.

```js
describe('Menu:toggleMenu', () => {
    const menu = shallow( < Menu / > ).instance();
    // Init state
    menu.state.expandedMenu = true;

    it(
        'When state is true, so links are hidden, a toggleMenu() call must change state to TRUE, that is, shows menu links',
        () => {
            menu.toggleMenu();
            expect(menu.state.expandedMenu).toEqual(false);
        });

    it(
        'When state is false, so links are hidden, a new call to toggleMenu() must change state to FALSE so hides menu links',
        () => {

            menu.toggleMenu();
            expect(menu.state.expandedMenu).toEqual(true);

        });

});
```

And execute again the test.
Check results that should be like

```PASS  src/components/Menu/Menu.test.js
  Menu:toggleMenu
    ✓ When state is true, so links are hidden, a toggleMenu() call must change state to TRUE, that is, shows menu links (1ms)
    ✓ When state is false, so links are hidden, a new call to toggleMenu() must change state to FALSE so hides menu links (1ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.807s, estimated 1s
Ran all test suites.
```

Let's analyse now the code:

We create an instance of our Menu component and set it's initial state:

```js
describe('Menu:toggleMenu', () => {
    const menu = shallow( < Menu / > ).instance();
    // Init state
    menu.state.expandedMenu = true;
```

> The component itself sets expandedMenu to true but best practises demands to initialise props on your own as you need.

After Menu component initialization, we define two **it**, once to check that invoking toggleMenu changes expandedMenu from true to false:

```js
    it(
        'When state is true, so links are hidden, a toggleMenu() call must change state to TRUE, that is, shows menu links',
        () => {
            menu.toggleMenu();
            expect(menu.state.expandedMenu).toEqual(false);
        });
```

And another one to check the only other option, toggleMenu changing expandedMenu from false to true:

```js
    it(
        'When state is false, so links are hidden, a new call to toggleMenu() must change state to FALSE so hides menu links',
        () => {

            menu.toggleMenu();
            expect(menu.state.expandedMenu).toEqual(true);

        });
```

This case is simple, we test two possible options but think on more complex cases where you must cover all of them. This way you are defining your code behaviour, what you expect from it and demonstrating you are testing any possibility.
  
To sum up, those are very simple tests but it's the way to start with. Another test could be to check that not only the state is changed but also all menu links are rendered and in the way (styles for example) you expect to be rendered.

> Do you want to learn more? Start with [Jest - Getting Started](https://jestjs.io/docs/en/getting-started)

[< Prev](../lab-09) | [Home Page](../..)