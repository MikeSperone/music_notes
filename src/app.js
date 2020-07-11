import React from 'react';

import AppMenu from 'components/Menus/AppMenu';
import StaffPaper from 'components/StaffPaper';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            n: 0,
        };
    }

    addStaffNote(){
        this.setState(s => ({n: s.n + 1}));
    }

    render() {
        return (
            <div>
                <StaffPaper />
            </div>
        );
    }
}

export default App;
