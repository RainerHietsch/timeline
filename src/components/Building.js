import { useStore } from '../stores/Store';
import Tippy from "@tippyjs/react";
import _ from 'lodash';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import {calculateCost, costMulti1} from "../data/CostMulti";
import {Data} from "../data/Data";
import {getBuildingCount} from "../functions/HelperFunctions";

function Building(props) {
    const [state, actions] = useStore();

    const count = getBuildingCount(state, props.data.id);

    const realCost = calculateCost(_.cloneDeep(props.data.cost), props.data.costMultiplier, count);

    const tooltip =
        <div className={'buildingTooltipWrapper'}>
            <div className={'buildingTooltipDesc'}>{props.data.desc}</div>
            <div className={'buildingTooltipCost'}>
                {realCost.map((cost) => {
                    return <div key={cost.name}>{cost.amount} {cost.name}</div>
                })}
            </div>
            <div className={'buildingTooltipProduction'}>
                {props.data.produces.map((res) => {
                    return <div key={res.name}>{res.rate * (1000/Data.updateInterval)} {res.name} /s</div>
                })}
            </div>
        </div>;


    return (
        <Tippy
            theme='light'
            arrow={false}
            placement={'bottom'}
            offset={[0, 0]}
            allowHTML={true}
            content={tooltip}
        >
            <div className={'buildingWrapper'} onClick={() => {actions.buildBuilding(props.data.id)}}>
                <div className={'buildingName'}>{props.data.name} ({count})</div>
            </div>
        </Tippy>
    );
};

export default Building;
