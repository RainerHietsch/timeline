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
import ExplorationScreen from "./cointainers/ExplorationScreen";
import SettingsScreen from "./cointainers/SettingsScreen";
import ProjectsScreen from "./cointainers/ProjectsScreen";
import LeaderScreen from "./cointainers/LeaderScreen";

function App() {
    const [state, actions] = useStore();

    useEffect(() => {
        actions.getAvailableTech();
    });

    useEffect(() => {
        let intervalId = workerTimers.setInterval(() => {
            actions.produce();
            actions.grow();
            actions.trainTroops();
            actions.calculations();
        }, Data.updateInterval);
    }, []);

    return (
        <div style={{display: 'flex'}}>
            <div className={'verticalMenu'}>
                <VertMenu />
            </div>
            <div className={'contentWrapper'}>
                {state.screen === 'civic' && <CivicScreen />}
                {state.screen === 'leader' && <LeaderScreen />}
                {state.screen === 'research' && <ResearchScreen />}
                {state.screen === 'projects' && <ProjectsScreen />}
                {state.screen === 'military' && <MilitaryScreen />}
                {state.screen === 'exploration' && <ExplorationScreen />}
                {state.screen === 'settings' && <SettingsScreen />}
            </div>
            <div className={'contextMenu'}>
                <ContextMenu />
            </div>
        </div>

    );
};

export default App;
