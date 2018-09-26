
# Lab 01 - Starting a New React Project

## Table of Contents

- [Creating a new React App](#creating-a-new-react-app)
- [Folder Structure](#folder-structure)
- [Adding a CSS Preprocessor Structure](#adding-a-CSS-preprocessor)
- [Displaying ESLint Output in the Editor](#displaying-eslint-output-in-the-editor)

<br/>  

## Creating a new React App

It is possible to manually create a React project, but Facebook has created a node module **create-react-app** to generate a boilerplate version of a React application.

>**You’ll need to have Node >= 6 on your local development machine** (but it’s not required on the server). You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to easily switch Node versions between different projects.

To create a new app, you may choose one of the following methods:

### npx

```sh
npx create-react-app <name-of-app>
```

>[npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f)

### npm

```sh
npm init react-app <name-of-app>
```
`npm init <initializer>` is available in npm 6+*

>More information about [create-react-app](https://github.com/facebook/create-react-app/)

Inside the newly created project (_name-of-app_), you can run some built-in commands.

To **run the application** in development mode, execute ```npm start```. In your browser, open http://localhost:3000 to view your running react application.

The page will automatically reload if you make changes to the code. Also, you will see the build errors and lint warnings in the console.

<br/>  

## Folder structure

When it comes to structuring a React app, the ideal folder organization is the one that allows you to move around your code with the least amount of effort. The folder structure should encourage scalability, but also reusability and be simple enough for new team members to quickly get onboard.

After creation, your project should look like this:

```
app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

We are going to delete and rename the other files, to get the following folder structure:

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    assets/
      images/
        logo.svg
      styles/
        index.css
    components/
      App/
        App.css
        App.js
        App.test.js
    services/
      registerServiceWorker.js
    index.js
```

Don't forget to update the path for the imported files in ```App.js``` and ```index.js``` files considering the new folder structure:

```javascript
/* index.js */

import './assets/styles/index.css';
import App from './components/App/App';
import registerServiceWorker from './services/registerServiceWorker';
```

```javascript
/* App.js */

import logo from '../../assets/images/logo.svg';
import './App.css';
```

<br/>  

## Adding a CSS Preprocessor

We will integrate a CSS preprocessor. _In this lab, we will be using **Sass**, but you can also use Less, or another alternative_.

Install node-sass:

```sh
npm install node-sass --save-dev
```

Then in ```package.json```, add the following lines to scripts:

```diff
"scripts": {
    "build": "react-scripts build",
    "eject": "react-scripts eject",
+   "sass:watch": "node-sass -w src -o src --output-style compressed",
+   "sass:build": "node-sass src -o src --output-style compressed",
    "start": "react-scripts start",
    "test": "react-scripts test --env=jsdom"
  },
```

To use a different preprocessor, replace `sass:watch` and `sass:build` commands according to your preprocessor’s documentation.

_Before run new commands, remember to stop the ejecution of previous jobs: Ctrl + C_.

1. Create a new index.scss file in ```scr\assets\styles``` to include de generic styles for your application.

2. Run ```npm sass:watch``` in your terminal.

3. Add the following rules to your index.scss:

    ```scss
    /* index.scss */
    body {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
      }
    ```
      
  <br/>
4. Save the changes.

5. The watcher will find every Sass file in ```src``` subdirectories and creates a corresponding CSS file next to it. You can find a new ```index.css``` file in your styles folder. Check that your main ```src\index.js``` imports the _index.css_ file. If not, add the following line:

```javascript
/* index.js */

import './assets/styles/index.css';
```
      
  <br/>
Now, create a new file _App.scss_ in your ```src\components\App``` directory, copy and paste all the content from the _old App.css_ file to the new _App.scss_ and save the file. The watcher will overrides _App.css_. Since _App.js_ still imports _App.css_, the styles become a part of your application.

You can now make some changes in _App.scss_ and the _App.css_ file will be regenerated.

<br/>  

## How to run multiple concurrently

The usual way to run multiple commands concurrently is ```npm run <script01> && npm run <script02>```. That's fine but it's hard to keep on track of different outputs. Also if one process fails, others still keep running and you won't even notice the difference. Another option would be to just run all commands in separate terminals.

To make it easy, we will use the library: **concurrently**.

To install it, run:

```sh
npm install -g concurrently
```

Then in package.json, replace the following lines:

```json
"scripts": {
    "build": "concurrently \"npm run sass:build\" \"react-scripts build\"",
    "eject": "react-scripts eject",
    "sass:watch": "node-sass -w src -o src --output-style compressed --include-path src",
    "sass:build": "node-sass src -o src --output-style compressed --include-path src",
    "start": "concurrently --kill-others \"npm run sass:watch\" \"react-scripts start\"",
    "test": "react-scripts test --env=jsdom"
  },
```

Now, stop the previous job in your terminal and run ```npm start```. Make some changes in your `App.scss` save ther file. Your app will be automatically reloaded and all the changes are visibles in the browser. _Prove it by adding a ```color:red```property to the ```.App``` class and saving the changes. After check that is working properly, remove this property and save again._

>Note: During the next labs, if you get an error because a new css file can't be found, stop the execution of the current job and run again ```npm start```. Go then to the .scss file that the system doesn't find and save again to generate the css file.

<br/>  

## Displaying ESLint Output in the Editor

Some editors, including Sublime Text, Atom, and Visual Studio Code, provide plugins for ESLint whereby you should see the linter output right in your terminal as well as the browser console.

However, if you prefer the lint results to appear right in your editor, there are some extra steps you can follow:

1. You would need to install an ESLint plugin for your editor first.

    [Download](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) ESLint plugin for Visual Studio Code.

2. Then, add a file called `.eslintrc` to the project root:

    ```javascript
    {
      "extends": "react-app"
    }
    ```

    <br/> 
Now your editor should report the linting warnings.

>This feature is available with `react-scripts@0.2.0` and higher. It also only works with npm 3 or higher. More information about the [ESLint package in Create React App](https://github.com/facebook/create-react-app/blob/26f701fd60cece427d0e6c5a0ae98a5c79993640/packages/eslint-config-react-app/README.md)

>Learn more about [ESLint](https://eslint.org/docs/user-guide/getting-started)