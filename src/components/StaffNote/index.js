import React from 'react';
import Vex from 'vexflow';

import StaffMusic from 'components/StaffSnippet';
import styles from './styles.scss';
// import {  } from 'react-burger-menu';

class Staff extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.id = this.props.name;
        this.clef = this.props.clef;
        this.timeSignature = this.props.timeSignature;
        this.score = null;
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
    }
    componentDidMount() {
    }

    handleHover() {
    }

    showMenu() {
        // toggleState('showMenu');
    }

    toggleState(key) {
        this.setState(s => {
            s[key] = !s[key];
            return s;
        });
    }
                    // <StaffMenu right />
    render() {
        return (
            <div className="panel panel-default staff-note" onClick={this.showMenu} style={{display: 'inline-block'}}>
                <div className={"panel-heading " + (this.state.showHeading ? "" : "in") + "visible"} onMouseMove={this.handleHover}>music 
                    <div className={"staff-menu " + (this.state.showMenu ? "" : "in") + "visible"}>Hello menu</div>
                </div>
                <StaffMusic className="panel-body" id={this.id} {...this.props} />
            </div>
        );
    }
}

// <label for="name">Name (4 to 8 characters):</label>
// <input type="text" id="name" name="name" required
//    minlength="4" maxlength="8" size="10">


export default Staff;
