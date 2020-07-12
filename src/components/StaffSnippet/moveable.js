import React from 'react';
import Moveable from 'react-moveable';

const MoveableStaff = props => {
    const [target, setTarget] = React.useState();
    const [frame] = React.useState({
        translate: [0,0],
        width: 100,
        height: 100,
        rotate: 0,
    });

    React.useEffect(() => {
        setTarget(document.querySelector(props.selector));
    }, []);

    return (
            <Moveable
                target={target}

                // Draggable
                draggable={true}
                throttleDrag={0}
                throttleDragRotate={0}
                onDragStart={({ set  }) => {
                    set(frame.translate);
                }}
                onDrag={({ target, beforeTranslate  }) => {
                    frame.translate = beforeTranslate;
                    target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;

                }}

                // Resizable
                resizable={true}
                keepRatio={false}
                throttleResize={0}
                onResizeStart={({ setOrigin, dragStart  }) => {
                    setOrigin(["%", "%"]);
                    dragStart && dragStart.set(frame.translate);
                }}
                onResize={({ target, width, height, drag  }) => {
                    const beforeTranslate = drag.beforeTranslate;
                    frame.translate = beforeTranslate;
                    target.style.width = `${width}px`;
                    target.style.height = `${height}px`;
                    target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
                    props.onResize(width, height);
                }}

                rotatable={true}
                throttleRotate={0}
                rotationPosition={"top"}
                onRotateStart={({ set  }) => {
                    set(frame.rotate);
                }}
                onRotate={({ beforeRotate  }) => {
                    frame.rotate = beforeRotate;
                    target.style.transform = `rotate(${beforeRotate}deg)`;
                }}

                renderDirections={["nw","n","ne","w","e","sw","s","se"]}
                zoom={1}
                origin={true}
                padding={{"left":0,"top":0,"right":0,"bottom":0}}
            />

    );
}

export default MoveableStaff;
