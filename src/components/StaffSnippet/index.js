import React from 'react';
import MoveableStaff from './moveable';
import Vex from 'vexflow';

class StaffMusic extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.id = this.props.name;
        this.clef = this.props.clef;
        this.timeSignature = this.props.timeSignature;
        this.score = null;
        this.system = null;
        this.vf = null;
        this.staffRef = React.createRef();
        this.state = {
            voices: [
                {
                    notes: 'C#5/q, B4, A4, G#4',
                    options: {stem: 'up'}
                },
                {
                    notes: 'C#4/h, C#4',
                    options: {stem: 'down'}
                }
            ],
        }
        this.width = 500;
        this.height = 200;
        this._bind();
    }

    _bind() {
        this.setupScore = this.setupScore.bind(this);
        this.createVoice = this.createVoice.bind(this);
        this.createNotes = this.createNotes.bind(this);
        this.resize = this.resize.bind(this);
    }

    createVoice(notes, options) {
        return this.score.voice(notes, options);
    }

    createNotes(voice) {
        return this.score.notes(voice)
    }

    setupScore() {
        this.vf = new Vex.Flow.Factory({
              renderer: {elementId: this.id, width: this.width, height: this.height}
        });

        this.score = this.vf.EasyScore();
        this.system = this.vf.System();
    }

    resize(w, h) {
        //TODO: do something
        const svg = this.staffRef.current.querySelector('svg');
        svg.viewBox=`0 0 ${w} ${h}`;
    }
    redrawSystem() {
        this.vf.draw();
    }

    componentDidMount() {

        this.setupScore();
        const voices = this.state.voices.map(voice => {
            return this.createVoice(this.createNotes(voice.notes, voice.options));
        });
        this.system
            .addStave({ voices })
            .addClef(this.clef)
            .addTimeSignature(this.timeSignature);

        this.redrawSystem();
    }

    render() {
        return (
            <div>
                <div className="panel-body" id={this.id} ref={this.staffRef}></div>
                <MoveableStaff
                    selector={"#" + this.id}
                    onResize={this.resize}
                />
            </div>
        );
    }
}

export default StaffMusic;
