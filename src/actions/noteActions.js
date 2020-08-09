const noteAction = {
    doAthing: function() {
        return {
            type: "DO_A_THING",
            payload: {
                thing: 'ok',
                done: true
            }
        }
    }
};

export default noteActions;

