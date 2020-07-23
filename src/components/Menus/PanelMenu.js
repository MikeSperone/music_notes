import React, { Component } from 'react';
import DropdownMenu from './DropdownMenu';
import MenuItem from './MenuItem';

const PanelMenu = props => (
        <ul className={props.className + " nav nav-tabs"} >
            <li className={"staff-menu " + "visible"} data-toggle="tab">Menu</li>
            <MenuItem href="" data-toggle="tab" text="Warp" onClick={props.toggleWarp}/>
            <DropdownMenu name="Edit" >
                <MenuItem href="#" text="text edit" data-toggle="tab" onClick={props.toggleEdit} />
                <MenuItem href="#" text="delete" onClick={props.deleteNote} />
            </DropdownMenu>
        </ul>

);

export default PanelMenu;
