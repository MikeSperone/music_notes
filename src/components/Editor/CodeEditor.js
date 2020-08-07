import React from 'react';
import {Controlled as ReactCodeMirror} from 'react-codemirror2';
import CodeMirror from 'codemirror';
import musicXMLtags from './musicXMLtags';
require('codemirror/addon/lint/lint');
require('codemirror/addon/hint/show-hint');
require('codemirror/addon/hint/xml-hint');
require('codemirror/mode/xml/xml');
require('codemirror/keymap/vim');

export default class CodeEditor extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.handleChange = this.props.onChange;
        this._bind();
        this.options = {
            mode: 'xml',
            theme: 'material',
            lineNumbers: true,
            gutters: ["error", "CodeMirror-lint-markers"],
            // selfContain: true,
            keyMap: 'vim',
            extraKeys: {
                "'<'": this.completeAfter,
                "'/'": this.completeIfAfterLt,
                "' '": this.completeIfInTag,
                "'='": this.completeIfInTag,
                "Ctrl-Space": "autocomplete"
            },
            hintOptions: {schemaInfo: musicXMLtags}

        };
        this.state = {
            value: '<score></score>'
        };
    }

    _bind() {
        this.completeAfter = this.completeAfter.bind(this);
        this.completeIfAfterLt = this.completeIfAfterLt.bind(this);
        this.completeIfInTag = this.completeIfInTag.bind(this);
    }
    completeAfter(cm, pred) {
        var cur = cm.getCursor();
        if (!pred || pred()) setTimeout(function() {
            if (!cm.state.completionActive)
                cm.showHint({completeSingle: false});
        }, 100);
        return CodeMirror.Pass;
    }

    completeIfAfterLt(cm) {
        return this.completeAfter(cm, function() {
            var cur = cm.getCursor();
            return cm.getRange(CodeMirror.Pos(cur.line, cur.ch - 1), cur) == "<";
        });
    }

    completeIfInTag(cm) {
        return this.completeAfter(cm, function() {
            var tok = cm.getTokenAt(cm.getCursor());
            if (tok.type == "string" && (!/['"]/.test(tok.string.charAt(tok.string.length - 1)) || tok.string.length == 1)) return false;
            var inner = CodeMirror.innerMode(cm.getMode(), tok.state).state;
            return inner.tagName;
        });
    }

    componentDidMount() {
        if (this.props.storedValue) {
            this.setState(() => ({value: this.props.storedValue}));
        }
    }

    render() {
        return <ReactCodeMirror
            value={this.state.value}
            options={this.options}
            onBeforeChange={(editor, data, value) => {
                this.setState({value});
            }}
            onChange={this.handleChange}
        />;
    }
}
