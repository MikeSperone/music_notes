import React from 'react';

import AppMenu from 'components/Menus/AppMenu';
import StaffPaper from 'components/StaffPaper';
import Selecto from "react-selecto";

import styles from './styles.scss';

const App = props => (
    <React.Fragment>
        <StaffPaper />
        <Selecto
            container={document.body}
            dragContainer={window}
            selectableTargets={[".staff-note"]}
            selectByClick={true}
            selectFromInside={false}
            // After the select, whether to select the next target with the selected target (deselected if the target is selected again).
            continueSelect={false}
            // Determines which key to continue selecting the next target via keydown and keyup.
            toggleContinueSelect={"shift"}
            // The container for keydown and keyup events
            keyContainer={window}
            // The rate at which the target overlaps the drag area to be selected. (default: 100)
            hitRate={100}
            onSelect={e => {
                e.added.forEach(el => {
                    el.classList.add("selected");
                });
                e.removed.forEach(el => {
                    el.classList.remove("selected");
                });
            }}
        />
    </React.Fragment>
);


export default App;
