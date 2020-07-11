import React, { Component } from 'react';

import { slide as BurgerMenu } from 'react-burger-menu';
import MenuItem from './MenuItem';

import appMenuStyles from './styles';


// Doesn't work yet
// .dropdown-menu is display:none, but needs to be set to display: block
class MenuDropdown extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            open: false
        };
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleOpen() {
        this.setState(s => ({open: !s.open}));
    }

    render() {
        return (
            <li className="dropdown">
                <a className="dropdown-toggle" onClick={this.handleOpen} href="#">
                    Dropdown <span className="caret"></span>
                </a>
            {
                this.state.open ?
                    ( <ul className="dropdown-menu">
                        {this.props.children}
                    </ul> ) : null
            }
            </li>
        );
    }
}

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
