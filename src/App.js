import './App.css';

import { useStore } from './stores/Store';
import CivicScreen from "./cointainers/CivicScreen";
import ResearchScreen from "./cointainers/ResearchScreen";
import VertMenu from "./cointainers/Menu";
import ContextMenu from "./cointainers/ContextMenu";
import {useEffect} from "react";
import {Button} from "semantic-ui-react";

function App() {
    const [state, actions] = useStore();

    const CONST_UPDATE_INTERVAL = 1000;

    useEffect(() => {
        actions.getAvailableTech();
    });

    useEffect(() => {
        setInterval(() => {
            actions.produce()
        }, CONST_UPDATE_INTERVAL);
    }, []);

    return (
        <div>
            <div className={'verticalMenu'}>
                <VertMenu />
            </div>
            <div className={'contentWrapper'}>
                {state.screen === 'civic' && <CivicScreen />}
                {state.screen === 'research' && <ResearchScreen />}
                <Button onClick={actions.save}>Save</Button>
                <Button onClick={actions.load}>Load</Button>
            </div>
            <div className={'contextMenu'}>
                <ContextMenu />
            </div>
        </div>

    );
};

export default App;
