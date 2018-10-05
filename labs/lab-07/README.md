# Lab 07 - Form Components in React

## Table of Contents

* [React Controlled Components](#react-controlled-components)

## React Controlled Components

Form elements work in a different way that other DOM elements in
React.  The traditional HTML form elements (`<input>`, `<textarea>`,
and `<select>`) maintain their own state and update it based on user
input.  However, the state of a React component is kept in the state
property and only updated with `setState()` method.

We can combine the two by making the React state be the _single source
of truth_.  Then the React component that renders a form also controls
what happens in that form on subsequent user input.  An input form
element whose value is controlled by React in this way is called a
_controlled component_.

### Creating a new Form Component

1. Create a Form component in `src/components` directory.  Define a
   `fields` state with two inputs: a text input for `Name` and a
   textarea for the comment.  Create two empty methods to handle input
   changes and form submit.  Import and export your component in the
   `src/components/index.js` file:

    ```javascript
    /* Form.jsx */

    import React from 'react';
    import './Form.css';

    const defaultProps = {
        className: ''
    }

    class Form extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                fields: [
                    {id:'1', value:'', metadata: { label: 'Name', type: 'text' }},
                    {id:'2', value:'', metadata: { label: 'Comment', type: 'textarea' }}
                ]
            };
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        handleChange(event) {}

        handleSubmit(event) {}

        render() {
            return (
                <div className={`Form ${this.props.className}`}>
                    {this.props.title &&
                        <header className="Form__title">
                            <h3>{this.props.title}</h3>
                        </header>
                    }
                    <form onSubmit={this.handleSubmit}>
                        {this.state.fields.map((field) => {
                            if (field.id === '1') {
                                return (
                                    <div key={`input-${field.id}`} className="Form__row">
                                        <label>{field.metadata.label}</label>
                                        <input type="text" id={field.id} value={field.value} onChange={this.handleChange} required />
                                    </div>
                                );
                            } else if (field.id === '2') {
                                return (
                                    <div key={`input-${field.id}`} className="Form__row">
                                        <label>{field.metadata.label}</label>
                                        <textarea id={field.id} value={field.value} onChange={this.handleChange} required />
                                    </div>
                                );
                            } else {
                                return null;
                            }
                        })}
                        <input type="submit" value="Save Entry"/>
                    </form>
                </div>
            );
        }
    }

    Form.defaultProps = defaultProps;

    export default Form;
    ```

2. Define some styles for your new component:

    ```scss
        .Form{
            .Form__row{
                label,
                input{
                    display: block;
                }

            }
        }
    ```

3. Copy the two new `_buttons.scss` and `_forms.scss` files from
   `src/assets/styles/common` in the `lab-07` repository and paste in
   the same directory in your project.

4. Import the new `.scss` files in your `index.scss`:

    ```scss
    @import 'assets/styles/common/normalize';
    @import 'assets/styles/common/variables';
    @import 'assets/styles/common/typography';
    @import 'assets/styles/common/buttons';
    @import 'assets/styles/common/forms';
    ```

5. Add your Form component to the `Guestbook` container:

    ```javascript
    /* Guestbook.jsx */

    import React from 'react';
    import { Form } from '../../components'
    import './Guestbook.css'

    class Guestbook extends React.Component {

        constructor(props){
            super(props);
            this.state = {
                entries: []
            }
            this.submitForm = this.submitForm.bind(this);
        }

        submitForm(newEntry) {}

        render() {
            return (
                <div className="Guestbook" location={this.props.location}>
                    <header className="Guestbook__header">
                    <h1>Guestbook</h1>
                </header>
                <section className="Guestbook__content">
                    <Form className="Guestbook__form"
                        title="Guestbook Form"
                    />
                </section>
                </div>
            );
        }
    }

    export default Guestbook;
    ```

6. Add some styles to your `Guestbook` component:

    ```scss
    /* Guestbook.scss */

    @import 'assets/styles/common/variables';

    .Guestbook{

        .Guestbook__header {
            text-align: left;
        }

        .Guestbook__content {
            display: flex;
            text-align: left;

            .Guestbook__form {
                flex-basis: 50%;
                max-width: 50%;
                border: 1px solid $border-color;
                padding: $space-m;
                background-color: rgba($light-gray-alt, 0.5);
            }
        }
    }
    ```

7. Save all the changes.  Stop the execution of previous scripts and
   run `npm start` to launch your project and see your new `Guestbook`
   page.

### Handling Input values and Form submit

1. Add a `handleChange()` function to your `Form` component to update
   the `fields` state with the new value for each one:

    ```javascript
    /* Form.jsx */

    handleChange(event) {
        const updatedFields = this.state.fields.map(field => {
            if(field.id === event.target.id)
                return Object.assign({}, field, {value: event.target.value})
            return field
        });
        this.setState({ fields: updatedFields });
    }
    ```

2. Define the `handleSubmit()` function to get the submitted data in
   the form.  If your component does not have a submit Form prop
   defined as a function from the ancestor component, an alert must
   appear to show the new data. Otherwise, the new data must be
   propagated to this function:

    ```javascript
    /* Form.jsx */

    handleSubmit(event) {
        event.preventDefault();
        if(this.props.submitForm && {}.toString.call(this.props.submitForm) === '[object Function]') {
            const entry = {};
            this.state.fields.map(field => entry[field.metadata.label] = field.value);
            this.props.submitForm(entry);
        } else {
            const formValues = this.state.fields.reduce((result, field) => {
                result += `${field.metadata.label.toLowerCase()}: ${field.value}\n`;
                return result;
            }, '');
            alert('A new form was submitted\n' + formValues);
        }
        const resetFields = this.state.fields.map(field => {
            return Object.assign({}, field, {value: ''})
        });
        this.setState({ fields: resetFields });
    }
    ```

3. In your `Guestbook.jsx`file add a new `submitForm()` method to push
   the new entry values. In the `render()`method add a new `submitForm`
   prop to the `Form` component:

    ```javascript
    /* Guestbook.jsx */

    submitForm(newEntry) {
        const entries = this.state.entries;
        entries.push(newEntry);
        this.setState({ entries });
    }

    ...
    render() {
        return (
        ...
        <Form className="Guestbook__form"
            title="Guestbook Form"
            submitForm={this.submitForm}
        />
        ...
        )
    }

    ```

4. Also, render the new existing entries in the `Guestbook` component:

    ```javascript
    /* Guestbook.jsx */

    render() {
        return (
            <div className="Guestbook" location={this.props.location}>
                ...
                <section className="Guestbook__content">
                    ...

                    {this.state.entries.length > 0 ?
                        <div className="Guestbook__entries">
                            <header>
                                <h3>Guestbook Entries</h3>
                            </header>
                            <section>
                                {this.state.entries.map((entry, i) => {
                                    return(
                                        <article key={`entry-${i}`}
                                            className="Guestbook__entry"
                                        >
                                            {Object.keys(entry).map(key => {
                                                return (
                                                <p key={`entry-${i}-${key}`}>{entry[key]}</p>
                                                );
                                            })}
                                        </article>
                                    );
                                })}
                            </section>
                        </div>
                        : <div className="Guestbook__entries Guestbook__entries--empty">
                            <p>No entries yet</p>
                        </div>
                    }
                </section>
            </div>
        );
    }
    ```

5. Finally, add some new styles to your `Guestbook.jsx`file:

    ```scss
    /* Guestbook.jsx */

    @import 'assets/styles/common/variables';

    .Guestbook{

        .Guestbook__header {
            text-align: left;
        }

        .Guestbook__content {
            display: flex;
            text-align: left;

            .Guestbook__form {
                flex-basis: 50%;
                max-width: 50%;
                border: 1px solid $border-color;
                padding: $space-m;
                background-color: rgba($light-gray-alt, 0.5);
            }

            .Guestbook__entries{
                flex-basis: 50%;
                max-width: 50%;
                max-height: 380px;
                overflow-y: auto;
                margin-left: $space-l;
                padding: $space-m;
                background-color: rgba($light-gray-alt, 0.5);

                &--empty{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .Guestbook__entry{
                    border-top: 1px solid $border-color;
                    padding: $space-s $space-m;
                    p {
                        font-size: 0.875rem;
                        margin: 0;
                    }
                }
            }

            h3{
                margin-top: 0;
            }
        }
    }
    ```

[< Prev](../lab-06) | [Next >](../lab-08)
