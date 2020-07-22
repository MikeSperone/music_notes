import React from 'react';
import Vex from 'vexflow-musicxml';


class XmlEditor extends React.Components {
    constructor(props) {
        this.props = props;
    }

    componentDidMount() {
        this.VexDocument = new Vex.Flow.Document(data);
        var content = $(".content")[0];
        if (VexDocument) {
            VexFormatter = VexDocument.getFormatter();
            VexFormatter.draw(content);
        }
    }

    renderer() {
        return <div>
        </div>;
    }
}
