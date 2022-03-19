import { useStore } from '../stores/Store';
import {Button, ButtonGroup, Label, Message} from "semantic-ui-react";
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";

function MilitaryScreen() {
    const [state, actions] = useStore();

    return (
        <div className={'militaryWrapper'}>

            <Message positive>
                <Message.Header>Troops</Message.Header>
                <div className={'troopWrapper'}>
                    {state.military.infantry.goal > state.military.infantry.count &&
                        <div className={'troopProgress'}>
                            <CircularProgressbar
                                value={state.military.infantry.currentBuildProgress}
                                strokeWidth={50}
                                styles={buildStyles({
                                    strokeLinecap: "butt",
                                    pathColor: 'black',
                                    rotation: 0.25,
                                    pathTransitionDuration: 0,
                                })}
                            />
                        </div>
                    }
                    <div className={'troopDesc'}>
                    Infantry: {
                    state.military.infantry.goal > state.military.infantry.count
                        ? `${state.military.infantry.count}/${state.military.infantry.goal}`
                        : state.military.infantry.count}
                    </div>
                    <Button size='mini' onClick={() => {actions.addMilitaryGoal('infantry')}}>+</Button>
                </div>
            </Message>
        </div>
    );
}

export default MilitaryScreen;
