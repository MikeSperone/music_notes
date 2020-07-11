import React from 'react';
import Vex from 'vexflow';

class Staff extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.id = this.props.name;
        this.clef = this.props.clef;
        this.timeSignature = this.props.timeSignature;
    }

    componentDidMount() {
        const vf = new Vex.Flow.Factory({
              renderer: {elementId: this.id, width: 500, height: 200}
            
        });

        const score = vf.EasyScore();
        const system = vf.System();

        system.addStave({
            voices: [
                score.voice(score.notes('C#5/q, B4, A4, G#4', {stem: 'up'})),
                score.voice(score.notes('C#4/h, C#4', {stem: 'down'}))
            ]
        }).addClef(this.clef).addTimeSignature(this.timeSignature);

        vf.draw();
    }

    render() {
        return (
            <div className="panel panel-default staff-note" style={{display: 'inline-block'}}>
                <div className="panel-heading"></div>
                <div className="panel-body" id={this.id}></div>
            </div>
        );
    }
}

export default Staff;
