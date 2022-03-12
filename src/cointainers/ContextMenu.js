import { useStore } from '../stores/Store';
import millify from "millify";
import {Progress} from "semantic-ui-react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import chroma from "chroma-js";
import 'react-circular-progressbar/dist/styles.css';
import {Data} from "../data/Data";
import Tippy from "@tippyjs/react";

function ContextMenu() {
    const [state, actions] = useStore();

    const scale = chroma.scale(['red','orange','green']);

    const resourceTable = state.resources.filter(res => res.count > 0).map((res) => {
        const percentage = res.count/res.max;

        const rateTooltip =
            <div className={'rateTooltipWrapper'}>
                {res.production.rate.map((rate) => {
                    return rate.absolute
                        ? <div className={'rateTooltipLine'}>
                            <div>{rate.name}</div>
                            <div>+{rate.amount * (1000/Data.updateInterval)}</div>
                        </div>
                        : <div className={'rateTooltipLine'}>
                            <div>{rate.name}</div>
                            <div>+{rate.amount}%</div>
                        </div>
                })}
            </div>;

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
            <div className={'resourceAmount'}>{millify(Math.round(res.count), {precision: 2, lowercase: true})}/{res.max}</div>
            <Tippy
                theme='light'
                arrow={false}
                placement={'bottom'}
                offset={[0, 0]}
                allowHTML={true}
                content={rateTooltip}
            >
                <div className={'resourceRate'}>{Math.round(res.production.perSecond)}/s</div>
            </Tippy>

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
