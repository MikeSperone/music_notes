import React from 'react';

import AppMenu from 'components/Menus/AppMenu';
import StaffPaper from 'components/StaffPaper';
import Moveable from 'react-moveable';

const App = props => {

    const [target, setTarget] = React.useState();
    const [frame] = React.useState({
        translate: [0,0],
    });
    React.useEffect(() => {
        setTarget(document.querySelector(".staff-note"));
    }, []);

    return (
        <div>
            <StaffPaper />
            <Moveable
                target={target}
                draggable={true}
                throttleDrag={0}
                throttleDragRotate={0}
                zoom={1}
                origin={true}
                padding={{"left":0,"top":0,"right":0,"bottom":0}}
                onDragStart={({ set  }) => {
                    set(frame.translate);
                }}
                onDrag={({ target, beforeTranslate  }) => {
                    frame.translate = beforeTranslate;
                    target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;

                }}
            />
        </div>
    );
}

export default App;
