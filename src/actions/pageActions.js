import { ADD_NOTE } from '../actions/types.js';

const randomString = () => Math.floor(Math.random() * 10e8);
const generateUUID = (prefix="staff_") => `${prefix}${randomString()}-${randomString()}`;


function createStaffNote() {
    console.info('adding note');
    const newEmptyNote = {
            uuid: generateUUID(),
            name: '',
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
        };
    return {
        type: ADD_NOTE,
        payload: newEmptyNote 
    };
}

export {
    createStaffNote
};
