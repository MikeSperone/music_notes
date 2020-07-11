import React, { Component } from 'react';
import Staff from './staff';
import Vex from 'vexflow';
import confirmation from 'components/modals/confirmation';
import StaffPaperMenu from 'components/Menus/StaffPaperMenu';

class StaffPaper extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.id = 'paper';
        this.state = {
            staffNotes: []
        };
        this._bind();
    }

    _bind() {
        this.addStaffNote = this.addStaffNote.bind(this);
        this.removeStaffNote = this.removeStaffNote.bind(this);
    }

    componentDidMount() {

    }

    addStaffNote() {
        console.log('adding note');
        this.setState(s => {
            const newNote = {
                name: "staff_" + (s.staffNotes.length + 1),
                clef: "treble",
                timeSignature: "4/4"
            };
            s.staffNotes.push(newNote);
            return s;
        });
    }

    removeStaffNote() {
        if (confirmation()) {
            // remove
        };
    }

    render() {
        return (<div id={'paper'}>
            <StaffPaperMenu
                handleAddStaffNote={this.addStaffNote}
            />
            {this.state.staffNotes.map(note => (
                <Staff
                    key={note.name}
                    name={note.name}
                    clef={note.clef}
                    timeSignature={note.timeSignature}
                />
            ))}
        </div>);
    }
}

export default StaffPaper;
