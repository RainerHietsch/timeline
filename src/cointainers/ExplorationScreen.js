import { useStore } from '../stores/Store';
import {Button, Icon, Label, Message} from "semantic-ui-react";
import _ from 'lodash';

function ExplorationScreen() {
    const [state, actions] = useStore();

    const noLands =
        <Message positive>
            <Message.Header>Known Lands</Message.Header>
            <p>
                There are no lands you know of, that you don't already control.
            </p>
            <Button onClick={actions.explore}>
                <Icon name='binoculars'/>
                Explore your surroundings!
            </Button>
        </Message>

    const landsToDisplay = state.lands.map((singleLand) => {

        const enemyPower = _.reduce(singleLand.enemies, function(result, value, key) {
            result += value.power;
            return result;
        }, 0);

        return <div className={'singleLandWrapper'}>
            <Button
                onClick={() => {actions.dismissLand(singleLand.id)}}
                icon
                floated='right'
                style={{marginRight: '0', backgroundColor: '#e07979'}}
            >
                <Icon name='trash'/>
            </Button>
            <Button
                onClick={actions.explore}
                icon
                floated='right'
                style={{marginRight: '0', backgroundColor: '#8bb663'}}
            >
                <Icon name='globe'/>
            </Button>

            <div style={{'width': '90%'}}>
                <div className={'singleLandName'}>{singleLand.name}</div>
                <div className={'singleLandDesc'}>{singleLand.type} ･ {singleLand.size}km²</div>

                <div className={'landEnemies'}>
                    <div>Enemies</div>
                    {enemyPower > 0 &&
                        <div>Strength: {enemyPower}</div>
                    }
                </div>
                {singleLand.enemies.length === 0 &&
                    <div>No one is inhabiting these lands.</div>
                }
                {singleLand?.enemies?.map((enemy) => {
                    return <div>{enemy.count}x {enemy.name}</div>
                })}
            </div>

        </div>
    });


    return (
        <div className={'landsScreenWrapper'}>
            {state.lands.length === 0 &&
            noLands
            }
            {state.lands.length > 0 &&
            <div>
                <Button onClick={actions.explore}>
                    <Icon name='binoculars'/>
                    Explore
                </Button>
                <div className={'landsWrapper'}>
                    {landsToDisplay}
                </div>
            </div>
            }
        </div>
    );
}

export default ExplorationScreen;
