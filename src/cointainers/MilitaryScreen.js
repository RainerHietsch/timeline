import { useStore } from '../stores/Store';
import {Button, ButtonGroup, Icon, Label, Message} from "semantic-ui-react";
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import * as HelperFunctions from "../functions/HelperFunctions";

function MilitaryScreen() {
    const [state, actions] = useStore();

    return (
        <div className={'militaryWrapper'}>

            <Message positive>
                <Message.Header>Troops</Message.Header>
                <div className={'troopWrapper'}>
                    <div className={'troopDesc'}>

                        <div className={'subHeadline'}>
                            <div>Infantry</div>
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
                            <div>Strength: {HelperFunctions.getMilitaryPower(state)}</div>
                        </div>
                        <div className={'statLine'}>
                            <div>Time to Build</div>
                            <div>{state.military.infantry.secondsToBuild}s</div>
                        </div>
                        <div className={'statLine'} >
                            <div>Count</div>
                            <div> {
                                state.military.infantry.goal > state.military.infantry.count
                                    ? `${state.military.infantry.count}/${state.military.infantry.goal}`
                                    : state.military.infantry.count}</div>
                        </div>
                        <div className={'statLine'}>
                            <div>Attack</div>
                            <div>{state.military.infantry.minAttack}-{state.military.infantry.maxAttack}</div>
                        </div>
                        <div className={'statLine'}>
                            <div>Hit Points</div>
                            <div>{state.military.infantry.maxHp}</div>
                        </div>
                        {state.military.infantry.armour > 0 &&
                        <div className={'statLine'}>
                            <div>Armor</div>
                            <div>{state.military.infantry.armour}</div>
                        </div>
                        }
                    </div>
                    <Button icon size='mini' onClick={() => {actions.addMilitaryGoal('infantry')}}>
                        <Icon name='plus' />
                    </Button>
                </div>
            </Message>
        </div>
    );
}

export default MilitaryScreen;
