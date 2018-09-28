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
                                            to={`${this.props.url}${item.id}`}
                                        ><i className="ListBasic__link__icon"></i></Link>
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
