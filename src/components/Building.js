import { useStore } from '../stores/Store';
import Tippy from "@tippyjs/react";
import _ from 'lodash';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import {calculateCost, costMulti1} from "../data/CostMulti";

function Building(props) {
    const [state, actions] = useStore();

    const count = state.buildings.filter(building => building.id === props.data.id)[0].count

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
                    return <div key={res.name}>{res.rate} {res.name} /s</div>
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
