import React, { Component } from 'react';
import DropdownMenu from './DropdownMenu';
import MenuItem from './MenuItem';

const PanelMenu = props => (
        <div className={props.className}>
            <div className={"staff-menu " + "visible"}>Hello menu</div>
            <DropdownMenu>
                <MenuItem href="#" text="text edit" onClick={props.toggleEdit} />
                <MenuItem href="#" text="delete" onClick={props.deleteNote} />
            </DropdownMenu>
        </div>

);

export default PanelMenu;
