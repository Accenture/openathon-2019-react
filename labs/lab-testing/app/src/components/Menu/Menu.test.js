import React from 'react';
import Menu from './Menu';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Menu:toggleMenu', () => {
    const menu = shallow( < Menu / > ).instance();
    // Init state
    menu.state.expandedMenu = true;

    it(
        'When state is true, so links are hidden, a toggleMenu() call must change state to TRUE, that is, shows menu links',
        () => {
            menu.toggleMenu();
            expect(menu.state.expandedMenu).toEqual(false);
        });

    it(
        'When state is false, so links are hidden, a new call to toggleMenu() must change state to FALSE so hides menu links',
        () => {

            menu.toggleMenu();
            expect(menu.state.expandedMenu).toEqual(true);

        });

});
