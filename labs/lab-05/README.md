# Lab 05 - Completing your App Home Page

## Table of Contents

- [Rendering multiple props by a Component](#rendering-multiple-props-by-a-component)
- [Rendering multiple Components](#rendering-multiple-components)

## Rendering multiple props into a Component

1. Create a new Info component in the `scr/components` directory to
   _print_ all the general information from the _general_ endpoint,
   using the JavaScript `Object.keys()` and `map()` functions to loop
   all values from the `data` object.  Exclude the logo to not render
   it:

    ```javascript
    /*Info.jsx*/

    import React from 'react';
    import './Info.css';

    class Info extends React.PureComponent {
        render() {
            return (
                <article className="Info">
                    <section className="Info__content">
                    {Object.keys(this.props.data).map((field) => {
                        let infoContent;
                        if (field === 'link') {
                            infoContent = (
                                <p key={`general-${field}`}
                                    className={`Info__${field}`}>
                                    <a href="{this.props.data[field]}">Visit our website</a>
                                </p>
                            );
                        } else if (field !== 'logo') {
                            infoContent = (
                                <p key={`general-${field}`}
                                    className={`Info__${field}`}>
                                    {this.props.data[field]}
                                </p>
                            );
                        }
                        return infoContent;
                    })}
                    </section>
                </article>
            );
        }
    }

    export default Info;
    ```

    > Know more about the [Javascript Object.keys()
    > method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
    > and the [Javascript _map()_
    > function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

2. Create a new `Info.scss` file and add some styles to align the text
   to the left:

    ```scss
    /*Info.scss*/

    .Info {
        text-align: left;
    }
    ```

3. Import and export your new component in `src/components/index.js`:

    ```javascript
    import Footer from './Footer/Footer';
    import Header from './Header/Header';
    import Info from './Info/Info';
    import Loader from './Loader/Loader';
    import Menu from './Menu/Menu';
    import Notification from './Notification/Notification'

    export {
        Footer,
        Header,
        Info,
        Loader,
        Menu,
        Notification
    };
    ```

4. In Home page, use the `Fetch` component to get the data from the
   `general` endpoint in your JSON Server:

    ```javascript
    /* Home.jsx */

    import { Info, Loader, Notification } from '../../components';
    import { Fetch } from '../../services/api';

    ...

    const FETCH_OPTIONS = {
        method: 'GET',
        headers: {}
    };

    ...

    render(){
        ...
        <div className="Home__info">
            <Fetch path={'general'} options={FETCH_OPTIONS}>
                {({ data, loading, error }) => {
                    if (error) {
                        return (
                            <Notification type="error"
                                message= {error.message}
                            />
                        );
                    }
                    if (loading) {
                        return <Loader />;
                    }
                    if (data) {
                        return (
                            <Info data={data} />
                        );
                    }
                    return <Loader />;
                }}
            </Fetch>
        </div>
        ...
    ```

5. Add a title _'About Accenture'_ to your `Info` component and assign
   a title attribute to the component in your Home:

    ```javascript
    /*Info.jsx*/

    ...
    <article className="Info">
        <header className="Info__header">
            <h1>{this.props.title}</h1>
        </header>
        <section className="Info__content">
        ...
    ```

    ```javascript
    /*Home.jsx*/

    ...
    <Info title="About Accenture"
        data={data}
    />
    ...
    ```

6. Add some DefaultProps and PropTypes to check data type into your
   Info component:

    ```javascript
    /* Info.jsx */

    import PropTypes from 'prop-types';

    ...

    const defaultProps = {
        title: 'About Accenture',
        data: null
    };

    ...

    Info.defaultProps = defaultProps;

    Info.propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.objectOf(PropTypes.string).isRequired
    }

    ...
    ```

7. Stop the current job in the terminal and run again `npm start`.

## Rendering Multiple Components

You can build a collections of data, loop through this array using the
JavaScript `map()` function and return an element for each item in the
array.  Usually you would render lists inside a component, which
accepts an array of data and outputs an unordered list of elements.

1. Create a ListBasic Component in `src/components` directory that
   conditionally renders a title and accepts an array of data. Use
   the the JavaScript `map()` function to iterate through the returned
   data and render each item in the list that should contain a name,
   a description and an image source:

    ```javascript
    /* ListBasic.jsx */

    import React from 'react';
    import './ListBasic.css';

    class ListBasic extends React.PureComponent {
        render() {
            return (
                <div className="List">
                    <div className="ListBasic">
                        {this.props.title &&
                            <header className="ListBasic__header">
                                <h2>{this.props.title}</h2>
                            </header>
                        }
                        <section className="ListBasic--list">
                            {this.props.data && this.props.data.map((item) => {
                                return (
                                    <article className="ListBasic__item">
                                        <div className="ListBasic__image">
                                            <img alt={item.name} src={item.image_link} />
                                        </div>
                                        <section className="ListBasic__content">
                                            <header className="ListBasic__content__title">
                                                <h3>{item.name}</h3>
                                            </header>
                                            <div className="ListBasic__content__description">
                                                {item.description}
                                            </div>
                                        </section>
                                    </article>
                                );
                            })}
                        </section>
                    </div>
                </div>
            );
        }
    }

    export default ListBasic;
    ```

    Do not forget to import your new component in
    `src/components/index.js`.

2. In Home page, import your new ListBasic component and use the
   `Fetch` component to get the data from the `services` endpoint in
   your JSON Server:

    ```javascript
    /* Home.jsx */
    import { Info, ListBasic, Loader, Notification } from '../../components';

    ...

    const FETCH_OPTIONS = {
        method: 'GET',
        headers: {}
    };

    ...

    class Home extends React.Component {
    render() {
        return (
            <div className="Home" location={this.props.location}>
                <div className="Home__info">
                    ...
                </div>
                <div className="Home__list">
                    <div className="Home__services">
                        <Fetch path={'services'} options={FETCH_OPTIONS}>
                            {({ data, loading, error }) => {
                                if (error) {
                                    return (
                                        <Notification type="error"
                                            message= {error.message}
                                        />
                                    );
                                }
                                if (loading) {
                                    return <Loader />;
                                }
                                if (data) {
                                    return (
                                        <ListBasic title="Services"
                                            data={data}
                                        />
                                    );
                                }
                                return <Loader />;
                            }}
                        </Fetch>
                    </div>
                </div>

            </div>
            );
        }
    }

    export default Home;
    ```

3. Add some DefaultProps and PropTypes to check data type into your
   ListBasic component.  Add two new props to handle the field types
   (_name, description and image_) that the components will render of
   each item and the layout (_list or grid_) to be used for show the
   list of items:

    ```javascript
    /* ListBasic.jsx */

    import PropTypes from 'prop-types';

    ...

    const defaultProps = {
        title: null,
        data: null,
        fields: ['name', 'description', 'image'],
        layout: 'list'
    };

    ...

    ListBasic.defaultProps = defaultProps;

    ListBasic.propTypes = {
        title: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.object).isRequired,
        fields: PropTypes.arrayOf(PropTypes.string),
        layout: PropTypes.oneOf(['list', 'grid'])
    }
    ```

4. Pass the new _fields prop_ to the component in `Home.jsx`.  Create
   another section to print a grid of images of each item returned
   from the `innovation` endpoint:

    ```javascript
    /* Home.jsx */

    ...
    <div className="Home__list">
        <div className="Home__services">
            <Fetch path={'services'} options={FETCH_OPTIONS}>
                {({ data, loading, error }) => {
                    if (error) {
                        return (
                            <Notification type="error"
                                message= {error.message}
                            />
                        );
                    }
                    if (loading) {
                        return <Loader />;
                    }
                    if (data) {
                        return (
                            <ListBasic title="Services"
                                data={data}
                                fields={['name', 'description', 'image', 'internal_link']}
                            />
                        );
                    }
                    return <Loader />;
                }}
            </Fetch>
        </div>
        <div className="Home__innovation">
            <Fetch path={'innovation'} options={FETCH_OPTIONS}>
                {({ data, loading, error }) => {
                    if (error) {
                        return (
                            <Notification type="error"
                                message= {error.message}
                            />
                        );
                    }
                    if (loading) {
                        return <Loader />;
                    }
                    if (data) {
                        return (
                            <ListBasic title="Innovation"
                                data={data}
                                fields={['image']}
                                layout="grid"
                            />
                        );
                    }
                    return <Loader />;
                }}
            </Fetch>
        </div>
    </div>
    ...
    ```

5. Add a conditional rendering for each field in the `ListBasic`
   component and a `className` depending on the layout.  Assign a new
   key prop to each list item.  A `key` is a special attribute you
   need to include when creating lists to help React identify which
   item has changed, added, removed, etc.  The best way to pick a key
   is to use a unique string to identify a list item.  You can use the
   IDs from your data:

    ```javascript
    /* ListBasic.jsx */

    ...
    <section className={`ListBasic--${this.props.layout}`}>
        {this.props.data && this.props.data.map((item) => {
            return (
                <article key={`service-${item.id}`}
                    className="ListBasic__item">
                    {this.props.fields.includes('image') &&
                        <div className="ListBasic__image">
                            {item.image_link &&
                                <img alt={item.name} src={item.image_link} />
                            }
                        </div>
                    }
                    <section className="ListBasic__content">
                        {this.props.fields.includes('name') &&
                            <header className="ListBasic__content__title">
                                <h3>{item.name}</h3>
                            </header>
                        }
                        {this.props.fields.includes('description') &&
                            <div className="ListBasic__content__description">
                                {item.description}
                            </div>
                        }
                    </section>
                </article>
            );
        })}
    </section>
    ...
    ```

    Using indexes as keys is not recommend if the order of items may
    change because can negatively impact performance and may cause
    issues with component state.

    > Learn more about [Lists and Keys in
    > React](https://reactjs.org/docs/lists-and-keys.html)
    >
    > Know more about the [includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
    > method.

6. Add some styles to `ListBasic.scss` using Flex and Grid CSS
   modules:

    ```scss
    /* ListBasic.scss */
    @import 'assets/styles/common/variables';

    .List{
        .ListBasic{

            .ListBasic__header{
                text-align: left;
            }

            .ListBasic--list{
                border-top: 1px solid $border-color;

                .ListBasic__item{
                    display: flex;
                    align-items: center;
                    padding: $space-m 0;
                    border-bottom: 1px solid $border-color;

                    .ListBasic__image{
                        flex-basis: 25%;

                        img{
                            width: 100%;
                            height: auto;
                        }
                    }

                    .ListBasic__content{
                        flex-basis: 75%;
                        padding-left: $space-l;
                        font-size: 0.875rem;
                        text-align: left;

                        .ListBasic__content__title{
                            h3{
                                margin: 0 0 $space-s;
                            }
                        }
                    }
                }
            }

            .ListBasic--grid{
                display: grid;
                grid-template-columns: auto auto auto;
                grid-gap: $space-m;

                .ListBasic__item{

                    .ListBasic__image{
                        img{
                            width: 100%;
                            height: auto;
                        }
                    }
                }
            }
        }
    }
    ```

7. Finally, add other styles to customize your Home page in
   `Home.scss` and import generates .css file into `Home.jsx`:

    ```scss
    /* Home.scss */

    @import 'assets/styles/common/variables';

    .Home {
        .Home__list {
            display: flex;
        }

        .Home__services,
        .Home__innovation {
            flex-basis: 50%;
            max-width: 50%;
        }

        .Home__services {
            padding-right: $space-m;
        }

        .Home__innovation {
            padding-left: $space-m;
        }
    }
    ```

    ```javascript
    /* Home.jsx */

    import './Home.css';
    ```

8. Stop the current job in the terminal and check the results in your
   browser by running again `npm start`.

> Learn more about [CSS Flex
> Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)
> and [CSS Grid
> Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout).

[< Prev](../lab-04) | [Next >](../lab-06)
