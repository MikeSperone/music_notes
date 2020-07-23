import React from 'react';
import Vex from 'vexflow';
import Music from 'lib/vexflowFormat';

export default class VFRenderer {
    constructor(props) {
        console.info('VFRenderer');
        this.width = props.width;
        this.height = props.height;
        this.staves = props.staves;
        this.staffElement = props.staffElement;
        this.VF = null;
        this.context = null;
        this.renderer = null;
        this.setupScore();
    }

    _bind() {
        this.setupScore = this.setupScore.bind(this);
        this.createStaff = this.createStaff.bind(this);
        this.createVoice = this.createVoice.bind(this);
        this.createNotes = this.createNotes.bind(this);
        this.saveData = this.saveData.bind(this);
        this.setStateToData = this.setStateToData.bind(this);
        this.printStaves = this.printStaves.bind(this);
    }

    printStaves() {
        // write staves to the screen
        this.staves.forEach(staff => this.createStaff(staff));
    }

    createVoice(notes) {
        return new this.VF.Voice({num_beats: 4, beat_value: 4})
            .addTickables(notes);
    }

    createNotes(notes) {
        return notes.map(n => new this.VF.StaveNote(n));
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

    setupScore() {
        // Basic setup boilerplate for using VexFlow with the SVG rendering context:
        this.VF = Vex.Flow;

        // Create an SVG renderer and attach it to the DIV element named "boo".
        this.renderer = new this.VF.Renderer(this.staffElement, this.VF.Renderer.Backends.SVG);

        // Configure the rendering context.
        this.renderer.resize(this.width, this.height);
        this.context = this.renderer.getContext();
    }

    render(staves) {
        if (!!staves) this.staves = staves;
        this.printStaves();
    }
}

