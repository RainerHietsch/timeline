import { useStore } from '../stores/Store';
import {Button, Icon, Label, Message} from "semantic-ui-react";
import _ from 'lodash';
import Tippy from "@tippyjs/react";

var randomString = require('random-string');

function ExplorationScreen() {
    const [state, actions] = useStore();

    const noLands =
        <Message positive>
            <Message.Header>Known Lands</Message.Header>
            <p>
                There are no lands you know of, that you don't already control.
            </p>
            <Tippy
                theme='light'
                arrow={false}
                placement={'bottom'}
                offset={[0, 0]}
                allowHTML={true}
                content={'Costs 10 Manpower'}
            >
                <div style={{ width: 'fit-content'}}>
                    <Button onClick={actions.explore}>
                        <Icon name='binoculars'/>
                        Explore your surroundings!
                    </Button>
                </div>
            </Tippy>

        </Message>

    const landsToDisplay = state.lands.map((singleLand) => {

        const enemyPower = _.reduce(singleLand.enemies, function(result, value, key) {
            result += ((value.minAttack+value.maxAttack)/2 + value.maxHp/2 + value.armour)*value.count;
            return result;
        }, 0);

        const claimTooltip = <div>Claim land for <b>{singleLand.influenceCost}</b> Influence</div>

        return <div key={singleLand.id} className={'singleLandWrapper'}>
            <Button
                onClick={() => {actions.dismissLand(singleLand.id)}}
                icon
                floated='right'
                style={{marginRight: '0', backgroundColor: '#e07979'}}
            >
                <Icon name='trash'/>
            </Button>
            <Tippy
                theme='light'
                arrow={false}
                placement={'bottom'}
                offset={[0, 0]}
                allowHTML={true}
                content={claimTooltip}
                delay={500}
            >
                <div>
                    <Button
                        onClick={() => {actions.claimLand(singleLand)}}
                        icon
                        floated='right'
                        style={{marginRight: '0', backgroundColor: '#8bb663'}}
                    >
                        <Icon name='globe'/>
                    </Button>
                </div>
            </Tippy>

            <div style={{'width': '90%'}}>
                <div className={'singleLandName'}>{singleLand.name}</div>
                <div className={'singleLandDesc'}>{singleLand.type} ??? {singleLand.size}km??</div>

                <div className={'subHeadline'}>
                    <div>Cost</div>
                </div>
                <div><b>{singleLand.influenceCost}</b> Influence</div>

                <div className={'subHeadline'}>
                    <div>Enemies</div>
                    {enemyPower > 0 &&
                        <div>Strength: {enemyPower}</div>
                    }
                </div>
                {singleLand.enemies.length === 0 &&
                    <div>No one is inhabiting these lands.</div>
                }
                {singleLand?.enemies?.map((enemy) => {
                    return <div key={randomString(5)}>{enemy.count}x {enemy.name}</div>
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
