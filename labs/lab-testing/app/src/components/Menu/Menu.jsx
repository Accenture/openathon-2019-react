import React from 'react';
import { Link } from 'react-router-dom'
import './Menu.css';

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expandedMenu: true
        };
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        this.setState({ expandedMenu: !this.state.expandedMenu });
    }

    render() {
        return (
            <div className="Menu">
                {this.state.expandedMenu &&
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/services">Services</Link></li>
                            <li><Link to="/innovation">Innovation</Link></li>
                            <li><Link to="/guestbook">Guestbook</Link></li>
                        </ul>
                    </nav>
                }
                <button className={`Menu__button ${this.state.expandedMenu ? 'Menu__button--expanded' : ''}`}
                    onClick={this.toggleMenu}
                />
            </div>
        );
    }
}

export default Menu;
