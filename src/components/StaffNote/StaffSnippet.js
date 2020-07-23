import React from 'react';
import XMLRenderer from './renderers/renderFromXML';
import VFRenderer from './renderers/renderWithVexFlow';

class StaffMusic extends React.Component {
    constructor(props) {
        super(props);
        console.info('StaffMusic');
        this.props = props;
        this.xmlString = this.props.xmlString;
        this.renderer = '';

        this.staffRef = React.createRef();
        this.state = {
            editing: false,
            xmlString: this.props.xmlString,
            staves: [{
                timeSignature: this.props.timeSignature,
                clef: this.props.clef,
                voices: [{
                    notes: [{ keys: ['C#/5'], duration: 'w'}],
                }],
            }]
        };
        this.width = 500;
        this.height = 200;
        this._bind();
    }

    _bind() {
        this.saveData = this.saveData.bind(this);
        this.setStateToData = this.setStateToData.bind(this);
        this.renderStaff = this.renderStaff.bind(this);
    }

    saveData(data) {
        // save data to the outside source
        window.data[this.props.uuid] = data;
    }

    setStateToData(data) {
        // setState with new staves
        this.setState(s => ({data}));
        alert('values set... now do something with it');
    }

    renderStaff() {
        console.info('rendering staff');
        //TODO: this.staffRef.current.clear();
        switch (this.renderer) {
            case 'xml':
                console.info('rendering xml');
                this.xmlRender.render(this.xmlString)
                    .catch(err => console.log("ERROR: ", err));
                break;
            case 'lilypond':
                console.info('rendering lilypond');
                break;
            default:
                console.info('rendering default');
                this.VFRenderer.render();
        }
    }

    componentDidMount() {
        console.info('staff snippet');
        this.xmlRender = new XMLRenderer({
            staffElement: this.staffRef.current
        });
        this.VFRenderer = new VFRenderer({
            width: this.width,
            height: this.height,
            staffElement: this.staffRef.current,
            staves: this.state.staves,
        });

        if (!window.data) window.data = {};

        const data = window.data[this.props.uuid];
        if (typeof data !== "undefined") {
            this.setStateToData(data);
        } else {
            this.saveData(this.state);
        }

        this.renderStaff();
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.info('staff snippet should update?');
    //     return (nextProps.xmlString !== this.xmlString);
    // }

    componentDidUpdate(prevProps) {
        console.info('staff snippet updated');
        if (this.props.xmlString === prevProps.xmlString) {
            return;
        }
        this.xmlString = this.props.xmlString;
        console.info('xmlString: ', this.props.xmlString);
        if (!!this.props.xmlString) this.renderer = 'xml';
        this.setState(
            () => ({ xmlString: this.props.xmlString }),
            () => {
                console.info('ok... doing stuff now');
                this.saveData(this.state);
                this.renderStaff();
            });
    }

    render() {
        console.info('staff snippet rendering');
        return (
            <div className="panel-body" ref={this.staffRef}></div>
        );
    }
}

export default StaffMusic;
