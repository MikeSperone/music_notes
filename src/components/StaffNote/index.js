import React from 'react';
import Vex from 'vexflow';
import MoveableStaff from 'components/MoveableStaff';
import PanelMenu from 'components/Menus/PanelMenu';
// import TextEditNotes from 'components/Editor/TextEditNotes';
import CodeEditor from 'components/Editor/CodeEditor';
import debounce from 'lodash/debounce';

import StaffMusic from './StaffSnippet';

class Staff extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.id = this.props.name;
        this.clef = this.props.clef;
        this.timeSignature = this.props.timeSignature;
        this.score = null;
        this.uuid = this.generateUUID();
        this.state = {
            showMenu: false,
            editing:  false,
            warpable: false,
            languageMode: 'musicXML',
            code: {
                abc: '',
                lilypond: '',
                musicXML: '',
                vexFlow: ''
            }
        }
        this._bind();
    }

    _bind() {
        this.handleHover = this.handleHover.bind(this);
        this.showMenu = this.showMenu.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
        this.toggleEditing = this.toggleEditing.bind(this);
        this.toggleWarp = this.toggleWarp.bind(this);
        this.handleCodeEditorChange = this.handleCodeEditorChange.bind(this);
    }

    componentDidMount() {
        if (!window.data) window.data = {};
        this.data = window.data[this.uuid];
    }

    generateUUID() {
        return this.props.name +
            "-" +
            Math.floor(Math.random() * 10e8) +
            "-" +
            Math.floor(Math.random() * 10e8);
    }


    handleHover() {
        this.showMenu();
    }

    showMenu() {
    }

    hideMenu() {
    }

    toggleState(key) {
        this.setState(s => {
            s[key] = !s[key];
            return s;
        });
    }

    handleCodeEditorChange = debounce((editor, data, value) => {
        console.info('handling code editor change');
        console.info('p.value: ', value);
        this.setState(
            s => {
                s.code[s.languageMode] = value;
                return s;
            },
            () => console.info('state set')
        );
    }, 1000);

    toggleWarp() {
        // window.warpable[this.uuid] = !window.warpable[this.uuid];
        this.toggleState('warpable');
    }

    toggleEditing() {
        this.toggleState('editing');
    }

    render() {
        return (
            <div>
                <div
                    id={this.uuid}
                    className="panel panel-default staff-note"
                    onMouseEnter={this.showMenu}
                    onMouseLeave={this.hideMenu}
                    style={{display: 'inline-block', background: 'rgba(0,0,0,0)'}}
                >
                    <PanelMenu
                        className={"panel-heading " + (this.state.showMenu ? "" : "in") + "visible"}
                        toggleEdit={this.toggleEditing}
                        toggleWarp={this.toggleWarp}
                    />
                    <StaffMusic
                        className="panel-body"
                        uuid={this.uuid}
                        xmlString={this.state.code.musicXML}
                        {...this.props}
                    />
                </div>
                { this.state.editing && (
                    <CodeEditor
                        onChange={this.handleCodeEditorChange}
                        setValues={this.setValues}
                        languageMode={this.state.languageMode}
                        noteId={this.uuid}
                        storedValue={this.state.code[this.state.languageMode]}
                    />
                )}
                <MoveableStaff
                    uuid={this.uuid}
                    warpable={this.state.warpable}
                />

            </div>
        );
    }
}
// <label for="name">Name (4 to 8 characters):</label>
// <input type="text" id="name" name="name" required
//    minlength="4" maxlength="8" size="10">


export default Staff;
