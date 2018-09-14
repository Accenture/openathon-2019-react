import React from 'react';
import './Menu.css';

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expandedMenu: true
        };
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
                            <li><a href="#home">Home</a></li>
                            <li><a href="#services">Services</a></li>
                            <li><a href="#innovation">Innovation</a></li>
                            <li><a href="#guestbook">Guestbook</a></li>
                        </ul>
                    </nav>
                }
                <button onClick={this.toggleMenu}>
                    Menu
                </button>
            </div>
        );
    }
}

export default Menu;
