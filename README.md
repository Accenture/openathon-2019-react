# II Openathon Custom Open Cloud

You are welcomed to a new **Openathon** edition organised for the **Accenture Technology Custom Open Cloud community** where we will have again the opportunity to discover, in a practical way, the possibilities offered by the different architectures and leading frameworks in the market.

As you already knows, this time we will learn to develop a **FrontEnd web application using React** applying some of the recommended best practices such as routing, asynchronous REST API access, reusable components and state management.

React’s strongest capability is the creation of web interfaces based on reusable components, so we are going to create and reuse our own components while learning how to manage their life cycle, the management of props and the JSX syntax while exercising our knowledge of JavaScript (ES6).



# What we are going to do
We will learn how to develop a web application using React, playing with **props**, **JSX**, **Virtual DOM**, **components**, routing, REST API consumption, components reuse… and applying some of the recommended good practises like **Single responsibility principle**, **Isolation**, **functional programming**, **prototypal inheritance**…

1. The web application will consist on a Main and two detail pages:

<img src="https://github.com/Albarian/openathonFY19/raw/master/resources/images/web%20map.png" width="315">

2. With the next React components hierarchy:
<img src="https://github.com/Albarian/openathonFY19/raw/master/resources/images/components%20use.png" width="608">

3. Using a fake REST API emulating [Accenture site](https://www.accenture.com/us-en/company) data services:
<img src="https://github.com/Albarian/openathonFY19/raw/master/resources/images/components%20and%20API.png" width="456">

4. Having this simulated estructure (Main page)
<img src="https://github.com/Albarian/openathonFY19/raw/master/resources/images/main%20page%20mockup.png" width="756">



# Prerequisites

It will be useful to install 

1. Install **Visual Studio Code** for your current Operating System: 
    [Click here](https://code.visualstudio.com/) to download.

    **Visual Studio Code** is a source code editor with support for debugging, embedded Git control, syntax highlighting, intelligent code completion, snippets, and code refactoring.

2. Install **Node.js** for your current Operating System: 

    [Click here](https://nodejs.org/en/download/) to download.

    **Node.js** is an open source server environment, free, that runs on various platforms (Windows, Linux, Unix, Mac OS X, etc.)  using JavaScript runtime built on Chrome's V8 JavaScript engine.

    This installation also will install **npm**, the package manager for Node.js and the world’s largest software registry. 

3. Install **webpack**
    ```
    $ npm install webpack -g
    ```
    
    **webpack** is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging ... [More info](https://webpack.js.org/).

4. Install ***json-server***
    
    ```sh
    $ npm install json-server -g
    ```

    JSON Server is a Node Module that you can use to create demo rest json webservice in less than a minute. All you need is a JSON file for sample data. https://github.com/typicode/json-server


5. Download and install React Developer Tools

    React Developer Tools is a Chrome DevTools extension for the open-source React JavaScript library. It allows you to inspect the React component hierarchies in the Chrome Developer Tools.

    [Click here](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) to download and install.

    You will get a new tab called React in your Chrome DevTools. This shows you the root React components that were rendered on the page, as well as the subcomponents that they ended up rendering.

    By selecting one of the components in the tree, you can inspect and edit its current props and state in the panel on the right. In the breadcrumbs you can inspect the selected component, the component that created it, the component that created that one, and so on.

