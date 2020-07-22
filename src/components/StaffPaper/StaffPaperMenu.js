import React, { Component } from 'react';

import { slide as BurgerMenu } from 'react-burger-menu';
import MenuItem from 'components/Menus/MenuItem';

import styles from 'components/Menus/styles';


const StaffPaperMenu = (props) => (
    <BurgerMenu
        right styles={styles}
    >
        <MenuItem
            href="#"
            text="Add Staff"
            onClick={props.handleAddStaffNote}
        />
    </BurgerMenu>
);

export default StaffPaperMenu;
