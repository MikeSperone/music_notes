import React from 'react';
import Moveable from 'react-moveable';

class MoveableStaff extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            target: null,
            frame: {
                rotate: 0,
                scale: [1,1],
                translate: [0,0],
                matrix: [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1,
                ]
            },
            snappable: false,
        }

        this._bind();
    }

    _bind() {
        this.setTarget = this.setTarget.bind(this);
        this.translate = this.translate.bind(this);
        this.drag = this.drag.bind(this);
        this.rotate = this.rotate.bind(this);
        this.warp = this.warp.bind(this);
        this.scale = this.scale.bind(this);
    }

    translate() {
        this.state.target.style.transform
            = `translate(${this.state.frame.translate[0]}px, ${this.state.frame.translate[1]}px)`
            + ` scale(${this.state.frame.scale[0]}, ${this.state.frame.scale[1]})`
            + ` rotate(${this.state.frame.rotate}deg)`
            + ` matrix3d(${this.state.frame.matrix.join(",")})`;
    }

    drag({ target, beforeTranslate  }) {
        this.setState(s => {
                s.frame.translate = beforeTranslate;
                return s;
            }, 
            this.translate
        );
    }

    rotate({ beforeRotate }) {
        this.setState(s => {
                s.frame.rotate = beforeRotate;
                return s;
            }, 
            this.translate
        );
    }

    scale({ target, scale, drag }) {
        this.setState(s => {
                s.frame.translate = drag.beforeTranslate;
                s.frame.scale = scale;
                return s;
            }, 
            this.translate
        );
    }

    warp({ matrix }) {
        this.setState(s => {
                s.frame.matrix = matrix;
                return s;
            },
            this.translate
        );
    };

    setTarget() {
        const target = document.querySelector('#' + this.props.uuid);
        this.setState(s => {
            s.target = target;
            return s;
        });
    }

    componentDidMount() {
        this.setTarget();
    }

    render() {
        return (
            <Moveable
                target={this.state.target}

                // Draggable
                draggable={true}
                throttleDrag={0}
                throttleDragRotate={0}
                onDragStart={({ set }) => {
                    set(this.state.frame.translate);
                }}
                onDrag={this.drag}

                scalable={!this.props.warpable}
                keepRatio={false}
                throttleScale={0}
                onScaleStart={({ set, dragStart, rotateStart }) => {
                    set(this.state.frame.scale);
                    dragStart && dragStart.set(this.state.frame.translate);
                    rotateStart && rotateStart.set(this.state.frame.rotate);
                }}
                onScale={this.scale}

                rotatable={true}
                throttleRotate={0}
                rotationPosition={"top"}
                onRotateStart={({ set }) => set(this.state.frame.rotate) }
                onRotate={ this.rotate }

                warpable={this.props.warpable}
                
                onWarpStart={({ set  }) => {
                    set(this.state.frame.matrix);
                }}
                onWarp={this.warp}
                onWarpEnd={({ target, isDrag, clientX, clientY  }) => {
                    console.log("onWarpEnd", this.state.target, isDrag);
                }}

                renderDirections={["nw","n","ne","w","e","sw","s","se"]}
                zoom={1}
                origin={true}
                padding={{"left":0,"top":0,"right":0,"bottom":0}}
            />

        );
    }
}

export default MoveableStaff;
