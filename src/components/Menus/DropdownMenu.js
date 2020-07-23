import React, { Component } from 'react';

// Doesn't work yet
// .dropdown-menu is display:none, but needs to be set to display: block
class DropdownMenu extends Component {
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
                <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                    {this.props.name || "Dropdown"} <span className="caret"></span>
                </a>
                <ul className="dropdown-menu ">{this.props.children}</ul>
            </li>
        );
    }
}

export default DropdownMenu;
