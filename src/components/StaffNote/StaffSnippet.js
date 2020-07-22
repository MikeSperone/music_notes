import React from 'react';
import Vex from 'vexflow';
import renderFromXML from './renderFromXML';
import Music from 'lib/vexflowFormat';

class StaffMusic extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.xmlString = this.props.xmlString;
        this.VF = null;
        this.renderer = null;
        this.context = null;

        this.staffRef = React.createRef();
        this.state = {
            editing: false,
            xmlString: this.props.xmlString,
            staves: [
                {
                    timeSignature: this.props.timeSignature,
                    clef: this.props.clef,
                    voices: [
                        {
                            notes: [
                                { keys: ['C#/5'], duration: 'w'},
                            ],
                        },
                    ],
                }
            ]
        };
        this.width = 500;
        this.height = 200;
        this._bind();
    }

    _bind() {
        this.setupScore = this.setupScore.bind(this);
        this.createStaff = this.createStaff.bind(this);
        this.createVoice = this.createVoice.bind(this);
        this.createNotes = this.createNotes.bind(this);
        this.saveData = this.saveData.bind(this);
        this.setStavesState = this.setStavesState.bind(this);
        this.printStaves = this.printStaves.bind(this);
    }

    saveData(data) {
        // save data to the outside source
        this.setState(() => (data));
        window.data[this.props.uuid] = data;
    }

    setStavesState(staves) {
        // setState with new staves
        this.setState(s => s.staves = staves);
        alert('values set... now do something with it');
    }

    printStaves() {
        // write staves to the screen
        this.state.staves.forEach(staff => this.createStaff(staff));
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
        console.info('staff snippet');
        if (!window.data) window.data = {};
        const data = window.data[this.props.uuid];
        if (typeof data !== "undefined" && typeof data.staves !== "undefined") {
            this.setStavesState(data.staves);
        } else {
            this.saveData(this.state);
        }
        if (this.xmlString) {
            console.info('xml string');
            renderFromXML(this.xmlString, this.staffRef.current);
        } else {
            this.setupScore();
            this.printStaves();
        }
    }

    shouldComponentUpdate(props) {
        console.info('staff snippet should update?');
        if (props.xmlString !== this.xmlString) {
            console.info('yes');
            return true;
        }
        return false;
    }

    componentDidUpdate() {
        renderFromXML(this.props.xmlString, this.staffRef.current);
    }

    render() {
        console.info('staff snippet rendering');
        return (
            <div className="panel-body" ref={this.staffRef}></div>
        );
    }
}

export default StaffMusic;
