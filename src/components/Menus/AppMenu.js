import React, { Component } from 'react';

import { slide as BurgerMenu } from 'react-burger-menu';
import DropdownMenu from './DropdownMenu';
import MenuItem from './MenuItem';

import appMenuStyles from './styles';

const AppMenu = props => (
    <BurgerMenu
        right styles={appMenuStyles}
    >
        <MenuItem
            className="active"
            href="#"
            text="Home"
        />
        <MenuItem href="#" text="Profile" />
        <MenuItem href="#" text="Add" onClick={props.handleAdd}/>
        <li className="divider"></li>
    </BurgerMenu>
);

export default AppMenu;
