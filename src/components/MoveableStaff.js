import React from 'react';
import Moveable from 'react-moveable';

const MoveableStaff = props => {
    window.warpable = window.warpable || {};
    const snappable = props.snapToGrid;

    const [target, setTarget] = React.useState();
    const [frame] = React.useState({
        translate: [0,0],
        scale: [1,1],
        rotate: 0,
    });

    React.useEffect(() => {
        setTarget(document.querySelector(props.selector));
    }, []);

    const translate = () => {
        target.style.transform
            = `translate(${frame.translate[0]}px, ${frame.translate[1]}px)`
            + ` scale(${frame.scale[0]}, ${frame.scale[1]})`
            + `rotate(${frame.rotate}deg)`;
    }

    const drag = ({ target, beforeTranslate  }) => {
        frame.translate = beforeTranslate;
        translate();
    };

    const rotate = ({ beforeRotate }) => {
        frame.rotate = beforeRotate;
        translate();
    };

    const scale = ({ target, scale, drag }) => {
        frame.translate = drag.beforeTranslate;
        frame.scale = scale;
        translate();
    };
    const matrix = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ];

    const warp = ({
            target,
            clientX,
            clientY,
            delta,
            dist,
            multiply,
            transform,
        }) => {
            console.log("onWarp", target);
            // target.style.transform = transform;
            matrix = multiply(matrix, delta);
            target.style.transform = `matrix3d(${matrix.join(",")})`;
        };

    return (
            <Moveable
                target={target}

                // Draggable
                draggable={true}
                throttleDrag={0}
                throttleDragRotate={0}
                onDragStart={({ set }) => {
                    set(frame.translate);
                }}
                onDrag={drag}

                scalable={true}
                keepRatio={false}
                throttleScale={0}
                onScaleStart={({ set, dragStart, rotateStart }) => {
                    set(frame.scale);
                    dragStart && dragStart.set(frame.translate);
                    rotateStart && rotateStart.set(frame.rotate);
                }}
                onScale={scale}

                rotatable={true}
                throttleRotate={0}
                rotationPosition={"top"}
                onRotateStart={({ set }) => set(frame.rotate) }
                onRotate={ rotate }

                warpable={window.warpable[props.uuid]}
                
                onWarpStart={({ target, clientX, clientY  }) => {
                    console.log("onWarpStart", target);
                }}
                onWarp={warp}
                onWarpEnd={({ target, isDrag, clientX, clientY  }) => {
                    console.log("onWarpEnd", target, isDrag);
                }}

                renderDirections={["nw","n","ne","w","e","sw","s","se"]}
                zoom={1}
                origin={true}
                padding={{"left":0,"top":0,"right":0,"bottom":0}}
            />

    );
}

export default MoveableStaff;
