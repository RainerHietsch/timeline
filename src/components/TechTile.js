import { useStore } from '../stores/Store';
import {useRef} from "react";

function TechTile(props) {
    const [state, actions] = useStore();

    return (
        <div className={'techTileWrapper'}>
            <div className={'techName'}>{props.techInfo.name}</div>
            <div className={'techCat'}>Category: {props.techInfo.cat}</div>
            <div className={'techCost'}>
            {
                props.techInfo.cost.map((singleResCost) => {
                    return <div>{singleResCost.name}: {singleResCost.amount}</div>
                })
            }
            </div>
            <div className={'techDesc'}>{props.techInfo.desc}</div>
            <div className={'researchButton'} onClick={() => actions.researchTech(props.techInfo.name)}>Research</div>
        </div>
    );
};

export default TechTile;
