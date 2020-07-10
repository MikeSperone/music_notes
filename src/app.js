import {h, Component} from 'preact';

import Menu from 'components/Menu';
import StaffPaper from 'components/StaffPaper';

function App (props) {
    return <div>
            <Menu />
            <StaffPaper />
        </div>;
}

export default App;
