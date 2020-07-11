import React, { Component } from 'react';

import { slide as BurgerMenu } from 'react-burger-menu';
import MenuItem from './MenuItem';

import styles from './styles';


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
