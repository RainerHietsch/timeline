import { useStore } from '../stores/Store';
import {Button, ButtonGroup, Icon, Label, Message} from "semantic-ui-react";
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";

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
                            <div>Strength: {((state.military.infantry.minAttack+state.military.infantry.maxAttack)/2 + state.military.infantry.maxHp/2 + state.military.infantry.armour)*state.military.infantry.count}</div>
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
                            <div>Hit Points</div>
                            <div>{state.military.infantry.maxHp}</div>
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
