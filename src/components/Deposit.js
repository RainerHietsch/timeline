import { useStore } from '../stores/Store';
import {Divider, Icon} from "semantic-ui-react";
import seedrandom from "seedrandom";
import _ from 'lodash';
import {Data} from "../data/Data";
import * as HelperFunctions from "../functions/HelperFunctions";
import Tippy from "@tippyjs/react";
import * as Lang from "../data/Lang";

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
        return <div>{Lang.MineResourcesLang[res.resource_id]}: {_.round(res.amount)}</div>;
    });

    const tooltip =
        <div>
            {props.deposit.known ?
                <div>
                    <div>Resources: </div>
                    {tooltipResourceLines}
                </div>
                :
                <div>Not scouted yet!</div>
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
        <div className={'depositWrapper'}>
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
                <div className={'hiddenDeposit'}></div>
            }
        </div>
        </Tippy>

    );
};

export default Deposit;
