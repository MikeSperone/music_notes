class Staff {
    constructor({
        timeSignature,
        clef,
        voices
    }) {
        this.timeSignature = timeSignature || '4/4';
        this.clef = clef || 'treble';
        this.voices = voices || [];
    }
    addNoteToVoice(n, note) {
        if (!note.clef) note.clef = this.clef;
        this.voices[n].createNotes(note);
    }
    addVoice(voice) {
        if (!voice.clef) voice.clef = this.clef;
        this.voices.push(voice);
    }
    removeVoice(n) {
        alert('remove voice');
    }
}

class Voice {
    constructor({ notes, clef }) {
        this.clef = clef;
        this.notes = notes || [];
    }
    addNote(note) {
        this.notes.push(note);
    }
    removeNote(n) {
        alert('remove note');
    }

    addKeyToNote(n, key) {
        this.notes[n].addKey(key);
    }
};

class Note {
    constructor({
        clef,
        keys,
        duration
    }) {
        this.clef = clef || '';
        this.keys = keys || [];
        this.duration = duration || '';

    }
    addKey(key) {
        keys.push(key);
    }
    removeKey(n) {
        alert('remove key');
    }
};

class Key {
    constructor({
        name,
        accidental,
        octave
    }){

        this._bind();
        this.pcNames = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
        this.accidentals = ['#', 'b', ''];
        this.name = this.setName(name);
        this.accidental = this.setAccidental(accidental);
        this.octave = this.setOctave(octave);
    }

    _bind() {
        this.setName = this.setName.bind(this);
        this.setAccidental = this.setAccidental.bind(this);
        this.setOctave = this.setOctave.bind(this);
    }

    setName(n) {
        if (!this.pcNames.includes(n)) n = 'c';
        this.name = n;
    }
    setAccidental(a) {
        if (!this.accidentals.includes(a)) a = '';
        this.accidental = a;
    }
    setOctave(o) {
        if (o === NaN || o == undefined) o = 4;
        if (o < 0) o = 0;
        if (o > 8) o = 8;
        this.octave = o;
    }

    toString() {
        return this.name +
            this.accidental +
            '/' +
            this.octave;
    }
};

export {
    Staff,
    Voice,
    Note,
    Key
}
