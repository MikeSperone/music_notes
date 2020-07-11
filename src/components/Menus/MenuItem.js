import React from 'react';

const MenuItem = props => (
    <li className={props.className}>
        <a onClick={props.onClick} href={props.href}>{props.text}</a>
    </li>
);

export default MenuItem;
