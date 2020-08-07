import React from 'react';

const MenuItem = props => (
    <li className={props.className}>
        <button onClick={props.onClick}>{props.text}</button>
    </li>
);

export default MenuItem;
