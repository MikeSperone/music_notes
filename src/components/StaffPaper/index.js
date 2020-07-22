import React, { Component } from 'react';
import StaffNote from 'components/StaffNote';
import confirmation from 'components/modals/confirmation';
import StaffPaperMenu from './StaffPaperMenu';

class StaffPaper extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.id = 'paper';
        this.state = {
            targets: this.getTargets(),
            staffNotes: [{name: "staff_0", clef: "treble", timeSignature: "4/4"}],
        };
        this._bind();
    }

    _bind() {
        this.addNote = this.addNote.bind(this);
        this.removeNote = this.removeNote.bind(this);
        this.createNote = this.createNote.bind(this);
        this.getTargets = this.getTargets.bind(this);
    }

    componentDidMount() {

    }
            
    addNote() {
        console.log('adding note');
        this.setState(s => {
            const newNote = {
                name: "staff_" + (s.staffNotes.length + 1),
                clef: "treble",
                timeSignature: "4/4"
            };
            s.staffNotes.push(newNote);
            s.targets = this.getTargets();
            return s;
        });
    }

    removeNote() {
        if (confirmation()) {
            // remove
        };
    }

    createNote(note) {
        return <StaffNote
            key={note.name}
            name={note.name}
            clef={note.clef}
            timeSignature={note.timeSignature}
        />
    }

    getTargets() {
        return document.getElementsByClassName(this.targetClass);
    }

    render() {
        return (<div id={'paper'}>
            <StaffPaperMenu
                handleAddStaffNote={this.addNote}
            />
            {this.state.staffNotes.map(this.createNote)}
        </div>);
    }
}

export default StaffPaper;
