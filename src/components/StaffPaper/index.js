import React, { Component } from 'react';
import StaffNote from 'components/StaffNote';
import confirmation from 'components/modals/confirmation';
import StaffPaperMenu from './StaffPaperMenu';

class StaffPaper extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.id = 'paper';
        this._bind();
    }

    _bind() {
        this.addNote = this.addNote.bind(this);
        this.removeNote = this.removeNote.bind(this);
        this.displayNotes = this.displayNotes.bind(this);
        this.getTargets = this.getTargets.bind(this);
    }

    componentDidMount() {

    }
            
    addNote() {
        console.log('adding note');
        this.setState(s => {
            const newNote = {
                name: "staff_" + (s.staffNotes.length + 1),
            };
            s.staffNotes.push(newNote);
            return s;
        });
    }

    removeNote() {
        if (confirmation()) {
            // remove
        };
    }

    displayNotes() {
        return this.props.notes.map(note => <StaffNote key={note.uuid} {...note} />);
    }

    getTargets() {
        return document.getElementsByClassName(this.targetClass);
    }

            // <StaffPaperMenu handleAddStaffNote={this.addNote} />
    render() {
        return (<div id={'paper'}>
            <button
                onClick={this.addNote}
                type="button"
                className="add-new btn btn-default btn-link"
                data-toggle="tooltip"
                data-placement="left"
                title=""
                data-original-title="Add New"
            >&#65291;</button>
            {this.displayNotes()}
        </div>);
    }
}

export default StaffPaper;
