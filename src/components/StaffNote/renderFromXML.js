import Vex from 'vexflow';

window.Vex = Vex;
require('vexflow-musicxml/vexflow.musicxml.js');

export default function renderFromXML(xmlString, staffElement) {
    const VexDocument = new Vex.Flow.Document(xmlString);
    if (VexDocument) {
        const VexFormatter = VexDocument.getFormatter();
        VexFormatter.draw(staffElement);
    }
};
