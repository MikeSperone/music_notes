import React from 'react';
import Vex from 'vexflow';
import MoveableStaff from 'components/MoveableStaff';
import PanelMenu from 'components/Menus/PanelMenu';
import TextEditNotes from 'components/EditNotes/TextEditNotes';

import StaffMusic from 'components/StaffSnippet';
// import styles from './styles.scss';
// import {  } from 'react-burger-menu';

class Staff extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.id = this.props.name;
        this.clef = this.props.clef;
        this.timeSignature = this.props.timeSignature;
        this.score = null;
        this.uuid = this.generateUUID();
        this.state = {
            showMenu: false,
            editing: false,
            warping: false,
        }
        this._bind();
    }

    _bind() {
        this.handleHover = this.handleHover.bind(this);
        this.showMenu = this.showMenu.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
        this.toggleEditing = this.toggleEditing.bind(this);
    }

    componentDidMount() {
        if (!window.data) window.data = {};
        this.data = window.data[this.uuid];
    }

    generateUUID() {
        return this.props.name +
            "-" +
            Math.floor(Math.random() * 10e8) +
            "-" +
            Math.floor(Math.random() * 10e8);
    }

    handleHover() {
        this.showMenu();
    }

    showMenu() {
        this.setState(() => ({showMenu: true}));
    }

    hideMenu() {
        this.setState(() => ({showMenu: false}));
    }

    toggleState(key) {
        this.setState(s => {
            s[key] = !s[key];
            return s;
        });
    }

    toggleEditing() {
        this.toggleState('editing');
    }
                    // <StaffMenu right />
    render() {
        return (
            <div>
                <div
                    id={this.uuid}
                    className="panel panel-default staff-note"
                    onMouseEnter={this.showMenu}
                    onMouseLeave={this.hideMenu}
                    style={{display: 'inline-block', background: 'rgba(0,0,0,0)'}}
                >
                    <PanelMenu className={"panel-heading " + (this.state.showMenu ? "" : "in") + "visible"} toggleEdit={this.toggleEditing}/>
                    <StaffMusic className="panel-body" editing={this.state.editing} uuid={this.uuid} {...this.props} />
                </div>
                { this.state.editing && <TextEditNotes setValues={this.setValues} noteId={this.uuid} currentValues={this.data.staves}/> }
                <MoveableStaff selector={".staff-note#" + this.uuid} />
            </div>
        );
    }
}

// <label for="name">Name (4 to 8 characters):</label>
// <input type="text" id="name" name="name" required
//    minlength="4" maxlength="8" size="10">


export default Staff;
