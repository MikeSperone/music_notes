function doAThing() {
    console.log('I am doing a thing!');
    return {
        type: "DO_A_THING",
        payload: {
            thing: 'ok',
            done: true
        }
    };
}

export { doAThing };
