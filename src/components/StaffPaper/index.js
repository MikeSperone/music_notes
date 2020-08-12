import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStaffNote } from 'actions/pageActions';

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
        this.handleAddNote = this.handleAddNote.bind(this);
        this.removeNote = this.removeNote.bind(this);
        this.displayNotes = this.displayNotes.bind(this);
        this.getTargets = this.getTargets.bind(this);
    }

    componentDidMount() {

    }
            
    handleAddNote() {
        console.log('adding note');
        this.props.createStaffNote();
        this.setState(s => {
            return s;
        });
    }

    removeNote() {
        if (confirmation()) {
            // remove
        };
    }

    displayNotes() {
        const noteIds = this.props.notes.allIds;
        const allNotes = this.props.notes.byIds;
        return noteIds.map(i => <StaffNote key={i} {...allNotes[i]} />);
    }

    getTargets() {
        return document.getElementsByClassName(this.targetClass);
    }

            // <StaffPaperMenu handleAddStaffNote={this.handleAddNote} />
    render() {
        return (<div id={'paper'}>
            <button
                onClick={this.handleAddNote}
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

const mapStateToProps = state => ({
    page: state.page,
    notes: state.notes
});

export default connect(mapStateToProps, { createStaffNote })(StaffPaper);
