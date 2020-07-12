import React from 'react';
import Vex from 'vexflow';

class StaffMusic extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.VF = null;
        this.renderer = null;
        this.context = null;

        this.staffRef = React.createRef();
        this.state = {
            staves: [
                {
                    timeSignature: this.props.timeSignature,
                    clef: this.props.clef,
                    voices: [
                        {
                            notes: [
                                { clef: this.props.clef, keys: ['C#/5'], duration: 'q'},
                                { clef: this.props.clef, keys: ['B/4'], duration: 'q'},
                                { clef: this.props.clef, keys: ['A/4'], duration: 'q'},
                                { clef: this.props.clef, keys: ['G#/4'], duration: 'q'}
                            ],
                        },
                        {
                            notes: [
                                { clef: this.props.clef, keys: ['C#/4'], duration: 'h'},
                                { clef: this.props.clef, keys: ['C#/4'], duration: 'h'},
                            ],
                        }
                    ],
                }
            ]
        }
        this.width = 500;
        this.height = 200;
        this._bind();
    }

    _bind() {
        this.setupScore = this.setupScore.bind(this);
        this.createStaff = this.createStaff.bind(this);
        this.createVoice = this.createVoice.bind(this);
        this.createNotes = this.createNotes.bind(this);
    }

    createVoice(notes) {
        return new this.VF.Voice({num_beats: 4, beat_value: 4})
            .addTickables(notes);
    }

    createNotes(notes) {
        return notes.map(n => new this.VF.StaveNote(n));
    }

    setupScore() {
        // Basic setup boilerplate for using VexFlow with the SVG rendering context:
        this.VF = Vex.Flow;

        // Create an SVG renderer and attach it to the DIV element named "boo".
        this.renderer = new this.VF.Renderer(this.staffRef.current, this.VF.Renderer.Backends.SVG);

        // Configure the rendering context.
        this.renderer.resize(this.width, this.height);
        this.context = this.renderer.getContext();
    }

    createStaff(staff) {
        var s = new this.VF.Stave(10, 10, this.width);
        if (staff.clef) s = s.addClef(staff.clef);
        if (staff.timeSignature) s = s.addTimeSignature(staff.timeSignature);
        s.setContext(this.context).draw();
        const voices = staff.voices.map(v => {
            const notes = this.createNotes(v.notes);
            return this.createVoice(notes);
        })
        var formatter = new this.VF.Formatter()
                .joinVoices(voices)
                .format(voices, this.width);
        voices.forEach(v => v.draw(this.context, s));
    }

    componentDidMount() {
        this.setupScore();
        this.state.staves.forEach(staff => this.createStaff(staff));
    }

    render() {
        return (
            <div className="panel-body" ref={this.staffRef}></div>
        );
    }
}

export default StaffMusic;
