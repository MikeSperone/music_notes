const tags = {
    "!top": ["score-partwise", "score-timewise"],
    "!attrs": {
        id: null,
        class: ["A", "B", "C"]
    },
    "score-timewise": {

    },
    "score-partwise": {
        attrs: {
            verson: null,
            freeform: null

        },
        children: ["part-list", "part"]

    },
    "part-list": {

        children: ["score-part"]
    },
    "score-part": {
        attrs: {
            id: null
        },
        children: ["part-name"]
    },
    "part-name": {
        
    },
    part: {
        attrs: {
            id: null,
        },
        children: ["measure"]
    },
    measure: {
        attrs: {number: null},
        children: ["attributes", "note"]
    },
    attributes: {
        children: ["divisions", "key", "time", "clef"]
    },
    note: {
        children: ["pitch", "duration", "type"]
    },
    tie: {
        attrs: {
            type: null
        }
    }
};

export default tags;
