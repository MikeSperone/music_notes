import React from 'react';

const NoteForm = props => {
    return (
        <div className="form-group row">
            <ClefForm clef={props.clef} />
            <label htmlFor="keys" className="col-sm-1 control-label">Keys</label>
            <div className="col-sm-3">
                <input type="text" className="form-control" id="keys" placeholder={props.keys || "[C#/5]"} />
            </div>
            <DurationForm duration={props.duration} />
        </div>

    );
}

const VoiceForm = props => {
    return props.notes.map((note, i) => <NoteForm key={"note-" + i} {...note} />);
}

const ClefForm = props => (
    <React.Fragment>
        <label htmlFor="select" className="col-sm-1 control-label">Clef</label>
        <div className="col-sm-3">
            <select className="form-control" id="select">
                <option>"treble"</option>
                <option>"bass"</option>
            </select>
        </div>
    </React.Fragment>
);

const DurationForm = props => (
    <React.Fragment>
        <label htmlFor="select" className="col-sm-2 control-label">Duration</label>
        <div className="col-sm-2">
            <select className="form-control" id="select">
                <option>"q"</option>
                <option>"h"</option>
            </select>
        </div>
    </React.Fragment>
);

const Form = props => {
    return (
        <React.Fragment>
            <legend>Legend</legend>
            <div className="form-group">
                <label htmlFor="timeSignature" className="col-lg-2 control-label">TimeSignature</label>
                <div className="col-lg-10">
                    <input type="text" className="form-control" id="timeSignature" placeholder={props.timeSignature || "4/4"} />
                </div>
                <ClefForm clef={props.clef} />
            </div>
            <div className="form-group">
                <legend>Voices</legend>
                {props.voices.map((voice, i) => <VoiceForm key={"voice-" + i} {...voice} />)}
            </div>
        </React.Fragment>
    );
};

class TextEditNotes extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.currentStaves = this.props.currentValues;
        this.modalRef = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.modalRef.current.style.display = "block";
    }

    handleSubmit(form) {
        var firstVal, lastVal, emailVal, error = '';

        console.log('form submitted');
        console.log(form);

            //OR
        //firstVal= document.getElementById('first').value;  
        //lastVal= document.getElementById('last').value;
        //emailVal= document.getElementById('email').value;

        return true;
    }

    render() {
        return (
            <div className="modal" ref={this.modalRef}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form className="form-horizontal" >
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 className="modal-title">Modal title</h4>
                            </div>
                            <div className="modal-body">
                                <fieldset>
                                    {this.currentStaves.map((stave, i) => <Form key={"staff-" + i} {...stave} />)}
                                    <div className="form-group">
                                      <div className="col-lg-10 col-lg-offset-2">
                                        <button type="reset" className="btn btn-default">Cancel</button>
                                        <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
                                      </div>
                                    </div>
                                </fieldset>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default TextEditNotes;
