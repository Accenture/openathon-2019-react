
# Lab Unit Testing

## Table of Contents

- [Creating my first React Component](#creating-my-first-react-component)
- [How to export your Component](#how-to-export-your-component)
- [Composing Components](#composing-components)
- [Components and Props](#components-and-props)
- [State Management and Event Handling in Components](#state-management-and-event-handling-in-components)
- [Stateless Components _versus_ Pure Components](#stateless-components-versus-puro-components)

## Why Testing?

>Because it’s important to find any issue that could potentially go wrong before our product/solution/website/mobile app goes live to the public.  

For example, for a website, by testing, issues like basic functionality, accessibility to users or the site’s ability to adapt to responsive devices (like smart phones, tablets, and desktop devices) can be addressed and fixed before our website is launched.

At a high level, we need to make the distinction between manual and automated tests:
* **Manual testing** is done in person, by clicking through the application or interacting with the software and APIs with the appropriate tooling. This is very expensive as it requires someone to set up an environment and execute the tests themselves, and it can be prone to human error as the tester might make typos or omit steps in the test script.

* **Automated tests**, on the other hand, are performed by a machine that executes a test script that has been written in advance. These tests can vary a lot in complexity, from checking a single method in a class to making sure that performing a sequence of complex actions in the UI leads to the same results. It's much more robust and reliable than automated tests – but the quality of your automated tests depends on how well your test scripts have been written.

### The different types of tests

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

## Unit Testing - Introduction 

Essentially, a Unit Test is:
* a *method* that instantiates a **small section** of our application
* and **verifies** its behaviour independently from other parts. 

Unit test **is not about finding bugs**, but it's useful for refactoring (restructuring code without changing its behaviour) to notice (the unit test will fail) if changes have broken what we already had working.

Also **it's not about demonstrating that different parts of a system work together** in the real-life environment, that is *Integration Test*.

>The purpose of a **Unit Test** is to **verify the behaviour** of a relatively small piece of software, independently from other parts.`

