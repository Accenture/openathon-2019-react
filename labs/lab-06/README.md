# Lab 06 - Using Nested Routes

## Table of Contents

* [Using Nested Routes to display the details of a selected item](#displaying-details-of-a-selected-item)

## Using Nested Routes to display the details of a selected item

At this point, your project offers a few _Routes_ based on the current
path your are on. Each Route takes in a path and a component. When
your app’s current location matches the path, the component will be
rendered. This is a solid start to discuss how to handle nested
routing in a React web application.

Suppose you pretend that visiting `/services` displays a list of
services. Clicking on any service keeps our list of services on the
page, but also displays details on the selected service. This should
be updated by the URL, that should have changed to a nested route:
`/services/:serviceId`.

To create nested routes, we need to have a better understanding of how
`Route` works. There are 3 **_ways to render_** something with a
Route. Each is useful in different circumstances:

* Component. A React component to render only when the location
  matches. It will be rendered with route props. When you use
  component the router uses `React.createElement` to create a new
  `React` element from the given component.

* Render. This allows for convenient inline rendering and wrapping
  without the undesired remounting. Instead of having a new `React`
  element, you can pass in a function to be called when the location
  matches.

* Children. It works exactly like render except that it gets called
  whether there is a match or not. The children render prop receives
  all the same route props as the component and render methods, except
  when a route fails to match the URL, then match is `null`.

All three render methods will be passed the same three **_route
props_**: _match_, location_ and _history_.

Let’s start creating a Services page.

1. Include a `Fetch` component into the Services container to retrieve
   the data from the `services` endpoint and render the list of images
   of each service using the `ListBasic` component created in the
   previous lab:

    ```javascript
    /* Services.jsx */

    import React from 'react';
    import { ListBasic, Loader, Notification } from '../../components';
    import { Fetch } from '../../services/api';

    const FETCH_OPTIONS = {
        method: 'GET',
        headers: {}
    };

    class Services extends React.Component {
        render() {
            return (
                <div className="Services" location={this.props.location}>
                    <header className="Services__header">
                        <h1>Services</h1>
                    </header>
                    <div className="Services__container">
                        <Fetch path="services" options={FETCH_OPTIONS}>
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
                                        <section className="Services__content">
                                            <div className="Services__list">
                                                <ListBasic data={data}
                                                    fields={['image']}
                                                />
                                            </div>
                                        </section>
                                    );
                                }
                                return <Loader />;
                            }}
                        </Fetch>
                    </div>
                </div>
            );
        }
    }

    export default Services;
    ```

2. Create a new `Services.scss`file and include the following
   styles. Don't forget to import the generated `.css` file into the
   `Services` component:

    ```scss
    /* Services.scss */
    .Services{

        .Services__header{
            text-align: left;
        }

        .Services__content{
            display: flex;

            .Services__list{
                flex-basis: 25%;
                max-width: 25%;

                .List .ListBasic {

                    .ListBasic--list{
                        .ListBasic__image{
                            flex-basis: 100%;
                            text-align: left;

                            img{
                                width: auto;
                                height: 50px;
                            }
                        }
                    }
                }
            }
        }

    }
    ```

3. Create a new `ListItemDetail` component into the `scr/components`
   folder based on the `ListBasic` component, including some new
   conditional fields (`image_alt`, `detail` and `external_link`):

    ```javascript
    /* ListItemDetail.jsx */

    import React from 'react';
    import PropTypes from 'prop-types';
    import './ListItemDetail.css';

    const defaultProps = {
        data: null,
        fields: ['name', 'description', 'detail', 'image', 'external_link'],
        layout: 'list'
    };

    class ListItemDetail extends React.PureComponent {
        render() {
            return (
                <div className="ListItemDetail">
                    <section className={`ListItemDetail--${this.props.layout}`}>
                        <article key={`service-${this.props.data.id}`}
                            className="ListItemDetail__item">
                            {this.props.fields.includes('image') &&
                                <div className="ListItemDetail__image">
                                    {this.props.data.image_link &&
                                        <img alt={this.props.data.name} src={this.props.data.image_link} />
                                    }
                                </div>
                            }
                            {this.props.fields.includes('image_alt') &&
                                <div className="ListItemDetail__image--alt">
                                    {this.props.data.image_link_alt &&
                                        <img alt={this.props.data.name} src={this.props.data.image_link_alt} />
                                    }
                                </div>
                            }
                            {this.props.data.name && this.props.fields.includes('name') &&
                                <header className="ListItemDetail__header">
                                    <h2>{this.props.data.name}</h2>
                                </header>
                            }
                            <section className="ListItemDetail__content">
                                {this.props.fields.includes('description') &&
                                    <div className="ListBasic__content__description">
                                        {this.props.data.description}
                                    </div>
                                }
                                {this.props.fields.includes('detail') &&
                                    <div className="ListBasic__content__detail">
                                        <p>{this.props.data.detail}</p>
                                    </div>
                                }
                                {this.props.fields.includes('external_link') &&
                                    <div className="ListBasic__content__link">
                                        <p><a href={this.props.data.link} target="_blank">
                                            Visit {this.props.data.name}
                                        </a></p>
                                    </div>
                                }
                            </section>
                        </article>
                    </section>
                </div>
            );
        }
    }

    ListItemDetail.defaultProps = defaultProps;

    ListItemDetail.propTypes = {
        data: PropTypes.objectOf(PropTypes.string).isRequired,
        fields: PropTypes.arrayOf(PropTypes.string),
        layout: PropTypes.oneOf(['list', 'grid'])
    }

    export default ListItemDetail;
    ```

4. Add some styles in the `ListItemDetail.scss` file:

    ```scss
    /* ListItemDetail.scss */

    .ListItemDetail{
        width: 100%;
        text-align: center;

        .ListItemDetail__image{
            &--alt{
                img{
                    max-width: 150px;
                }
            }
        }

        .ListItemDetail__content{
            max-width: 650px;
            margin: auto;
            text-align: left;
        }

    }
    ```

5. Import `Switch` and `Route` from `react-router-dom`and add the new
   `ListItemDetail` component into the `Services` container.  As
   previously mentioned, `match` prop will be used for building nested
   links and routes.  Also, you can use match.params to filter the
   data received for each item in the list:

    ```javascript
    /* Services.jsx */

    import { Switch, Route } from 'react-router-dom';
    import { ListBasic, ListItemDetail, Loader, Notification } from '../../components';
    import { Fetch } from '../../services/api';
    import './Services.css';

    const FETCH_OPTIONS = {
        method: 'GET',
        headers: {}
    };

    class Services extends React.Component {
        render() {
            const match = this.props.match;
            return (
                <div className="Services" location={this.props.location}>
                    <header className="Services__header">
                        <h1>Services</h1>
                    </header>
                    <div className="Services__container">
                        <Fetch path="services" options={FETCH_OPTIONS}>
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
                                        <section className="Services__content">
                                            <div className="Services__list">
                                                <ListBasic data={data}
                                                    fields={['image', 'internal_link']}
                                                    url={`${match.url}/`}
                                                />
                                            </div>
                                            <Switch>
                                                <Route exact path={`${match.url}`} render={() => {
                                                    return (
                                                        <div className="Services__detail Services__detail--empty">
                                                            <p>Select a Service from the list</p>
                                                        </div>
                                                    );
                                                }} />
                                                <Route path={`${match.url}/:id`} render={(props) => {
                                                    const itemData = data.filter(item => item.id.toString() === props.match.params.id)
                                                    return (
                                                        <div className="Services__detail">
                                                            {itemData.length ?
                                                                <ListItemDetail data={itemData[0]}
                                                                    fields={['image', 'detail', 'external_link']}
                                                                />
                                                                :
                                                                <div className="Services__detail Services__detail--empty">
                                                                    <p>The Service does not exist</p>
                                                                </div>
                                                            }
                                                        </div>
                                                    );
                                                }} />
                                            </Switch>
                                        </section>
                                    );
                                }
                                return <Loader />;
                            }}
                        </Fetch>
                    </div>
                </div>
            );
        }
    }

    export default Services;
    ```

6. Add some new styles to the `Services.scss`file:

    ```scss
    /* Services.scss */

    .Services{

        .Services__content{
            display: flex;

            ...

            .Services__detail{
                display: flex;
                justify-content: center;
                align-items: center;
                flex-basis: 75%;
                max-width: 75%;
                margin-left: $space-l;
                padding: $space-m;
                background-color: rgba($light-gray-alt, 0.5);

                &--empty{
                    p{
                        font-size: 24px;
                    }
                }
            }
        }

    }
    ```

7. Add a new `internal_link` field into the ListBasic component to
   render a `Link` to each `ListItemDetail` based on the matched URL:

    ```javascript
    /* ListBasic.jsx */

    import React from 'react';
    import PropTypes from 'prop-types';
    import { Link } from 'react-router-dom';
    import './ListBasic.css';

    const defaultProps = {
        title: null,
        data: null,
        fields: ['name', 'description', 'image', 'internal_link'],
        layout: 'list'
    };

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
                        <section className={`ListBasic--${this.props.layout}`}>
                            {this.props.data && this.props.data.map((item) => {
                                return (
                                    <article key={`service-${item.id}`}
                                        className="ListBasic__item">
                                        {this.props.fields.includes('internal_link') && this.props.url &&
                                            <Link className="ListBasic__link--internal"
                                                to={`${this.props.url}${item.id}`}>
                                                <i className="ListBasic__link__icon"></i>
                                            </Link>
                                        }
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
                    </div>
                </div>
            );
        }
    }

    ListBasic.defaultProps = defaultProps;

    ListBasic.propTypes = {
        title: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.object).isRequired,
        fields: PropTypes.arrayOf(PropTypes.string),
        layout: PropTypes.oneOf(['list', 'grid'])
    }

    export default ListBasic;
    ```

8. Add some styles in `ListBasic.scss` to the new link classes:

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
                    position: relative;
                    display: flex;
                    align-items: center;
                    padding: $space-m 0;
                    border-bottom: 1px solid $border-color;

                    .ListBasic__image{
                        flex-basis: 25%;
                        padding: 0 $space-m;

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
                    position: relative;

                    .ListBasic__image{
                        img{
                            width: 100%;
                            height: auto;
                        }
                    }
                }
            }

            .ListBasic__link{
                &--internal{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    padding: $space-s;
                    cursor:  pointer;
                    opacity: 0;
                    transition: all 0.4s ease-in-out;
                    z-index: 9;

                    &:hover{
                        background: rgba($white, 0.25);
                        opacity: 1;
                    }
                }
            }

            .ListBasic__link__icon{
                width: 24px;
                height: 24px;

                &:after{
                    content: '';
                    display: inline-block;
                    vertical-align: middle;
                    margin-top: 4px;
                    margin-left: -8px;
                    width: 15px;
                    height: 15px;
                    border-top: 2px solid $meta-gray;
                    border-right: 2px solid $meta-gray;
                    transform: rotate(45deg);
                }
            }

        }
    }
    ```

Repeat all the previous steps to create an Innovation page that
contains a list of Innovation services using the existing `ListBasic`
and `ListItemDetail` components:

```javascript
/* Innovation.jsx */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ListBasic, ListItemDetail, Loader, Notification } from '../../components';
import { Fetch } from '../../services/api';
import './Innovation.css';

const FETCH_OPTIONS = {
    method: 'GET',
    headers: {}
};

class Innovation extends React.Component {
    render() {
        const match = this.props.match;
        return (
            <div className="Innovation" location={this.props.location}>
                <header className="Innovation__header">
                    <h1>Innovation</h1>
                </header>
                <section className="Innovation__container">
                <Fetch path="innovation" options={FETCH_OPTIONS}>
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
                                    <section className="Innovation__content">
                                        <div className="Innovation__list">
                                            <ListBasic data={data}
                                                fields={['image', 'internal_link']}
                                                layout="grid"
                                                url={`${match.url}/`}
                                            />
                                        </div>
                                        <Switch>
                                            <Route exact path={`${match.url}`} render={() => {
                                                return (
                                                    <div className="Innovation__detail Innovation__detail--empty">
                                                        <p>Select an Innovation from the list</p>
                                                    </div>
                                                );
                                            }} />
                                            <Route path={`${match.url}/:id`} render={(props) => {
                                                const itemData = data.filter(item => item.id.toString() === props.match.params.id)
                                                return (
                                                    <div className="Innovation__detail">
                                                        {itemData.length ?
                                                            <ListItemDetail data={itemData[0]}
                                                                fields={['image_alt', 'name', 'description', 'external_link']}
                                                            />
                                                            :
                                                            <div className="Innovation__detail Innovation__detail--empty">
                                                                <p>The Innovation does not exist</p>
                                                            </div>
                                                        }
                                                    </div>
                                                );
                                            }} />
                                        </Switch>
                                    </section>
                                );
                            }
                            return <Loader />;
                        }}
                    </Fetch>
                </section>
            </div>
        );
    }
}

export default Innovation;
```

```scss
/* Innovation.scss */

@import 'assets/styles/common/variables';

.Innovation{

    .Innovation__header {
        text-align: left;
    }

    .Innovation__content {
        display: flex;

        .Innovation__list {
            flex-basis: 25%;
            max-width: 25%;

            .List .ListBasic {

                .ListBasic--grid{
                    grid-template-columns: auto auto;
                }
            }
        }

        .Innovation__detail {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-basis: 75%;
            max-width: 75%;
            margin-left: $space-l;
            padding: $space-m;
            background-color: rgba($light-gray-alt, 0.5);

            &--empty{
                p{
                    font-size: 24px;
                }
            }
        }
    }
}
```

[< Prev](../lab-05) | [Next >](../lab-07)
