import { h, Component } from 'preact';
import Staff from './staff';
import Vex from 'vexflow';

class StaffPaper extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.id = 'paper';
    }

    componentDidMount() {
    }

    render() {
        return (<div id={'paper'}>
            <Staff
                name="one"
                clef="treble"
                timeSignature="4/4"
            />
            <Staff
                name="two"
                clef="bass"
                timeSignature="2/4"
            />
        </div>);
    }
}

export default StaffPaper;
