import { useStore } from '../stores/Store';
import millify from "millify";
import {Progress} from "semantic-ui-react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import chroma from "chroma-js";
import 'react-circular-progressbar/dist/styles.css';
import {Data} from "../data/Data";

function ContextMenu() {
    const [state, actions] = useStore();

    const scale = chroma.scale(['red','orange','green']);

    const resourceTable = state.resources.filter(res => res.count > 0).map((res) => {
        const percentage = res.count/res.max;
        return <div className={'resourceLine'}>
            <CircularProgressbar
                value={percentage*100}
                className={'resourceProgress'}
                strokeWidth={50}
                styles={buildStyles({
                    strokeLinecap: "butt",
                    pathColor: scale(percentage).hex()
                })}
            />
            <div className={'resourceName'}>{res.name}</div>
            <div className={'resourceAmount'}>{millify(res.count, {precision: 2, lowercase: true})}/{res.max}</div>
            <div className={'resourceRate'}>{res.production.rate * (1000/Data.updateInterval)}/s</div>
        </div>
    });


    const growthPercent = state.growth * 100 / actions.getGrowthPercentNeeded();

    return (
        <div className={'contextMenuWrapper'}>
            <Progress percent={growthPercent} size='small' color='olive' />
            {resourceTable}
        </div>
    );
}

export default ContextMenu;
