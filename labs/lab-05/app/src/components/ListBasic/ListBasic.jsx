import React from 'react';
import './ListBasic.css';

class ListBasic extends React.PureComponent {
    render() {
        return (
            <div className="List">
                <div className="ListBasic">
                    {this.props.title &&
                        <header className="ListBasic-header">
                            <h2>{this.props.title}</h2>
                        </header>
                    }
                    <section>
                    {this.props.data && this.props.data.map((item) => {
                        return (
                            <article key={`service-${item.id}`}
                                className="ListBasic-item">
                                <div className="ListBasic-item-image">
                                    {item.image_link &&
                                        <img alt={item.name} src={item.image_link} />
                                    }
                                </div>
                                <section className="ListBasic-item-content">
                                    <header><h3>{item.name}</h3></header>
                                    <div>{item.description}</div>
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
