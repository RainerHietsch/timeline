import { useStore } from '../stores/Store';
import Tippy from "@tippyjs/react";
import _ from 'lodash';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import {calculateCost, costMulti1} from "../data/CostMulti";
import {Data} from "../data/Data";
import {getBuildingCount} from "../functions/HelperFunctions";
import millify from "millify";
import * as HelperFunctions from "../functions/HelperFunctions";
import humanizeDuration from "humanize-duration";

function Building(props) {
    const [state, actions] = useStore();

    const count = getBuildingCount(state, props.data.id);

    const realCost = calculateCost(_.cloneDeep(props.data.cost), props.data.costMultiplier, count);

    const longestTime = HelperFunctions.getLongestTime(state, realCost);

    const tooltip =
        <div className={'buildingTooltipWrapper'}>
            <div className={'buildingTooltipDesc'}>{props.data.desc}</div>
            <div className={'buildingTooltipCost'}>
                {props.data.land &&
                <div key={'landCost'}>{props.data.land}km²</div>
                }
                {realCost.map((cost) => {

                    const res = HelperFunctions.getResource(cost.id, state);
                    const costPercent = _.round(cost.amount*100/res.count);

                    return <div
                        key={cost.name}
                        style={{color: costPercent > 100 ? 'red' : 'inherit'}}
                    >{millify(cost.amount)} {cost.name} ({costPercent}%)</div>

                })}
            </div>
            <div className={'buildingTooltipProduction'}>
                {props.data.produces.map((res) => {
                    return <div key={res.name}>{res.rate} {res.name} /s</div>
                })}
            </div>
            <div className={'buildingAvailableIn'}>
                {longestTime === -1
                    ? 'Never'
                    : longestTime === 0
                        ? ''
                        : humanizeDuration(longestTime*1000)}
            </div>
        </div>;


    return (
        <Tippy
            theme='light'
            arrow={false}
            placement={'bottom'}
            offset={[0, 0]}
            allowHTML={true}
            hideOnClick={false}
            content={tooltip}
        >
            <div className={'buildingWrapper'} onClick={() => {actions.buildBuilding(props.data.id)}}>
                <div className={'buildingName'}>{props.data.name} ({count})</div>
            </div>
        </Tippy>
    );
};

export default Building;
