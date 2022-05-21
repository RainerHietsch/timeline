import {getIndex, useStore} from '../stores/Store';
import {Divider, Icon} from "semantic-ui-react";
import seedrandom from "seedrandom";
import _ from 'lodash';
import {Data} from "../data/Data";
import * as HelperFunctions from "../functions/HelperFunctions";
import Tippy from "@tippyjs/react";
import * as Lang from "../data/Lang";
import * as Store from "../stores/Store";

function Deposit(props) {
    const [state, actions] = useStore();

    let rng = seedrandom('depositplacementseed');

    const resources = _.orderBy(props.deposit.resources,['percentage'],['desc']).map((res) => {

        return <div key={Math.floor(rng() * 1000000)} className={'depositResource resId'+res.resource_id+' bolder'+(Math.floor(rng() * 3)+1)} style={{
            height: res.percentage+'%',
            width: res.percentage+'%',
            marginLeft: (Math.floor(rng() * (100-res.percentage)))+'px'
        }}/>;
    })

    const tooltipResourceLines = _.orderBy(props.deposit.resources,['percentage'],['desc']).map((res) => {
        return <div key={res.key}>{Lang.MineResourcesLang[res.resource_id]}: {_.round(res.amount)}/s</div>;
    });

    const canRevealDeposit = () => {
        const index = getIndex(props.deposit.id, state.mine.deposits);
        if([0,1,2].includes(index%7)) return true;
        return state.mine.deposits[index-1].known === true
    }

    const revealDeposit = () => {
        if(!canRevealDeposit()) return;
        const index = getIndex(props.deposit.id, state.mine.deposits);
        state.mine.deposits[index].known = true;
    }

    const activateDeposit = () => {
        // if already active, do nothing
        if(props.deposit.active) return;

        // TODO: check affordability & pay

        // switch to active
        state.mine.deposits.filter((deposit) => {
            return deposit.id === props.deposit.id;
        })[0].active = true;

        // add resource production
        _.forEach(props.deposit.resources, (res) => {
            const stateRes = state.resources[getIndex(res.resource_id, state.resources)];

            const existingMineProduction = _.filter(stateRes.production.rate, (rate) => { return rate.name === 'Mine'});
            if(existingMineProduction.length === 0){
                stateRes.production.rate.push({
                    name: 'Mine',
                    amount: res.amount,
                    absolute: true,
                })
            } else {
                existingMineProduction[0].amount += res.amount;
            }

        })
    }

    const tooltip =
        <div>
            {props.deposit.known ?
                <div>
                    <div>Resources: </div>
                    {tooltipResourceLines}
                </div>
                :
                canRevealDeposit() ?
                    <div>Reveal!</div> :
                    <div>Can't reveal!</div>
            }
        </div>

    return (
        <Tippy
            theme='light'
            arrow={false}
            placement={'bottom'}
            offset={[0, 0]}
            allowHTML={true}
            content={tooltip}
        >
        <div
            className={'depositWrapper'}
            onMouseDown={() => {props.deposit.known ? activateDeposit() : revealDeposit()}}
            style={{backgroundBlendMode: props.deposit.known ? 'overlay' : 'exclusion'}}
        >
            {props.deposit.known ?
                    <div>
                        {resources}
                        {props.deposit.active &&
                        <Icon.Group size='big'>
                            <Icon inverted color='grey' name='gem' className={'activeDepositIcon'}/>
                            <Icon inverted color='grey' loading name='cog' corner='bottom right'/>
                        </Icon.Group>
                        }
                    </div>
                :
                <div className={'hiddenDeposit'}/>
            }
        </div>
        </Tippy>

    );
};

export default Deposit;
