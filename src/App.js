import './App.css';

import { useStore } from './stores/Store';
import {Button} from "semantic-ui-react";

function App() {
    const [state, actions] = useStore();
    return (
        <div>
            <h1>My counter</h1>
            {state.count}
            <Button onClick={actions.increment}>+</Button>
            <Button onClick={actions.save}>Save</Button>
            <Button onClick={actions.load}>Load</Button>
        </div>
    );
}

export default App;
