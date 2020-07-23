import { OpenSheetMusicDisplay, Cursor, VoiceEntry, Note, StemDirectionType  } from "opensheetmusicdisplay";

export default class XMLRenderer {
    constructor(props) {
        this.staffElement = props.staffElement;

        this.osmdOptions = {
            // alignRests: true,
            autoResize: false,
            drawingParameters: "compacttight",
            // draw options
            drawCredits: false,
            drawTitle: false,
            drawSubtitle: false,
            drawComposer: false,
            drawLyricist: false,
            drawPartNames: false,
            drawPartAbbreviations: false,
            drawMeasureNumbers: false,
        };
        this.osmd = new OpenSheetMusicDisplay(this.staffElement, this.osmdOptions);
    }

    render(xmlString) {
        console.info("renderering XML");
        return new Promise((resolve, reject) => {
            this.osmd.setLogLevel('info');
            this.osmd.load(xmlString)
                .then(() => {
                        this.osmd.render();
                        resolve();
                    },
                    (err) => reject(err)
                );
        });
    }

};
