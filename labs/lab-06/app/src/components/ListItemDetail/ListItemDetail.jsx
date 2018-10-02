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
