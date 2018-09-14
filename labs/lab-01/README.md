
# Lab 01

## Table of Contents

- [Creating a new React Project](#creating-a-new-react-project)
- [Folder Structure](#folder-structure)
- [Adding a CSS Preprocessor Structure](#adding-a-CSS-preprocessor)
- [Adding React Router](#adding-react-router)
- [Displaying ESLint Output in the Editor](#displaying-eslint-output-in-the-editor)

## Creating a new React Project

It is possible to manually create a React app, but Facebook has created a node module **create-react-app** to generate a boilerplate version of a React application

    https://github.com/facebook/create-react-app/

**You’ll need to have Node >= 6 on your local development machine** (but it’s not required on the server). You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to easily switch Node versions between different projects.

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

## Adding a CSS Preprocessor

We will integrate a CSS preprocessor. In this lab, we will be using **Sass**, but you can also use Less, or another alternative.)

```sh
npm install node-sass --save-dev
```

Then in package.json, add the following lines to scripts:

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

Now you can create a new file `App.scss` and run `npm run sass:watch`. The watcher will find every Sass file in `src` subdirectories, and create a corresponding CSS file next to it, in our case overwriting `App.css`. Since `App.js` still imports `App.css`, the styles become a part of your application. You can now edit `App.scss`, and `App.css` will be regenerated.

## How to run multiple concurrently

The usual way to run multiple commands concurrently is ```npm run script01 && npm run script02```. That's fine but it's hard to keep on track of different outputs. Also if one process fails, others still keep running and you won't even notice the difference. Another option would be to just run all commands in separate terminals.

To make it easy, we will use: **concurrently**.

To install it, run:

```sh
npm install -g concurrently
```

Then in package.json, replace the following lines:

```json
"scripts": {
    "build": "concurrently --kill-others \"npm run sass:build\" \"react-scripts build\"",
    "eject": "react-scripts eject",
    "sass watch": "node-sass -w src -o src --output-style compressed",
    "sass build": "node-sass src -o src --output-style compressed",
    "start": "concurrently --kill-others \"npm run sass:build\" \"react-scripts start\"",
    "test": "react-scripts test --env=jsdom"
  },
```

## Adding React Router

Create React App doesn't prescribe a specific routing solution, but React Router is the most popular one.

To add it, run:

```sh
npm install react-router-dom --save
```

We will use it and explain it in more detail later in our project.

## Displaying ESLint Output in the Editor

Some editors, including Sublime Text, Atom, and Visual Studio Code, provide plugins for ESLint.

They are not required for linting. You should see the linter output right in your terminal as well as the browser console. However, if you prefer the lint results to appear right in your editor, there are some extra steps you can do.

You would need to install an ESLint plugin for your editor first. Then, add a file called `.eslintrc` to the project root:

```js
{
  "extends": "react-app"
}
```

Now your editor should report the linting warnings.

This feature is available with `react-scripts@0.2.0` and higher. It also only works with npm 3 or higher.
