import './App.css';

import { useStore } from './stores/Store';
import * as workerTimers from 'worker-timers';
import CivicScreen from "./cointainers/CivicScreen";
import ResearchScreen from "./cointainers/ResearchScreen";
import VertMenu from "./cointainers/Menu";
import ContextMenu from "./cointainers/ContextMenu";
import {useEffect} from "react";
import {Button} from "semantic-ui-react";
import {Data} from "./data/Data";
import MilitaryScreen from "./cointainers/MilitaryScreen";

function App() {
    const [state, actions] = useStore();

    useEffect(() => {
        actions.getAvailableTech();
    });

    useEffect(() => {
        let intervalId = workerTimers.setInterval(() => {
            actions.produce();
            actions.grow();
        }, Data.updateInterval);
    }, []);

    return (
        <div>
            <div className={'verticalMenu'}>
                <VertMenu />
            </div>
            <div className={'contentWrapper'}>
                {state.screen === 'civic' && <CivicScreen />}
                {state.screen === 'research' && <ResearchScreen />}
                {state.screen === 'military' && <MilitaryScreen />}
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
