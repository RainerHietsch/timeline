import {getLeaderBonusFor, useStore} from '../stores/Store';
import millify from "millify";
import {Progress} from "semantic-ui-react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import chroma from "chroma-js";
import humanizeDuration from "humanize-duration";
import 'react-circular-progressbar/dist/styles.css';
import {Data} from "../data/Data";
import Tippy from "@tippyjs/react";
import _ from 'lodash';
import * as HelperFunctions from "../functions/HelperFunctions";
import * as LandFunctions from "../functions/LandFunctions";
import * as randomString from "random-string";
import {Line} from "rc-progress";

function ContextMenu() {
    const [state, actions] = useStore();

    const scale = chroma.scale(['red','orange','green']);

    const resourceTable = state.resources.filter(res => state.knownResources.includes(res.id)).map((res) => {
        const percentage = res.count/res.max;

        const rateTooltip =
            <div className={'rateTooltipWrapper'}>

                <div className={'resTooltipName'}>{res.name}</div>

                <div className={'resTooltipAmount'}>{_.round(res.count)}/{_.round(res.max)}</div>

                {getLeaderBonusFor(state, res.id) > 0 &&
                    <div className={'rateTooltipLine'}>
                        <div>Leader</div>
                        <div>+{getLeaderBonusFor(state, res.id)}%</div>
                    </div>
                }

                {res.production.rate.map((rate) => {
                    return <div key={`${randomString()}TTLine`} className={'rateTooltipLine'}>
                        <div>{rate.name}</div>
                        <div>+{_.round(rate.amount,1)}{rate.absolute ? '/s' : '%'}</div>
                    </div>
                })}
                    <div className={'rateTooltipLine'} style={{borderTop: '1px solid black'}}>
                        <div>Total:</div>
                        <div>+{_.round(res.production.perSecond,2)}/s</div>
                    </div>

                    <div>
                        Time to full: {
                            res.max > res.count
                             ? humanizeDuration(_.round((res.max-res.count)/res.production.perSecond)*1000)
                             : "Full"
                    }
                    </div>
            </div>;

        return <div key={`${res.name}Line`} className={'resourceTile'}>
            <Tippy
                theme='light'
                arrow={false}
                placement={'bottom'}
                offset={[0, 0]}
                allowHTML={true}
                content={rateTooltip}
            >
            <div>
                <div className={'resImage'} style={{backgroundImage: `url(./img/${res.id}.png)`}} />
                <div className={'resProgressBar'} style={{
                    height: `${(percentage*70)}px`,
                    borderTopLeftRadius: `${(percentage - 0.96) * 100}px`,
                    backgroundColor: `${
                        percentage > 0.40 
                            ?'green' 
                            : percentage > 0.15 
                                ? 'orange' 
                                : 'red'}`
                }}/>
                <div className={'resAmount'}>{millify(_.round(res.count))}</div>
            </div>
            </Tippy>
        </div>
    });


    const growthPercent = state.growth * 100 / actions.getGrowthPercentNeeded();

    return (
        <div className={'contextMenuWrapper'}>
            <Progress percent={growthPercent} size='small' color='olive' />
            <div className={'resourceLine'}>
                <CircularProgressbar
                    value={state.landUsed/state.landsqkm*100}
                    className={'resourceProgress'}
                    strokeWidth={50}
                    styles={buildStyles({
                        strokeLinecap: "butt",
                        pathColor: scale(100-(state.landUsed/state.landsqkm)).hex()
                    })}
                />
                <div className={'resourceName'}>Land Size</div>
                <div className={'resourceAmount'}>{_.round(state.landUsed,2)}/{_.round(state.landsqkm,2)}km²</div>
            </div>
            <div className={'resourceLine'}>
                <div className={'resourceName'}>Border Security</div>
                <Tippy
                    theme='light'
                    arrow={false}
                    placement={'bottom'}
                    offset={[0, 0]}
                    allowHTML={true}
                    content={<div>
                        Needed: {_.round(LandFunctions.calculateMilitaryStrengthNeeded(state))}<br />
                        Present: {_.round(HelperFunctions.getMilitaryPower(state))}
                    </div>}
                >
                    <div className={'resourceAmount'}>{state.borderSecurity}%</div>
                </Tippy>

            </div>
            <div className={'resIconsWrapper'}>
                {resourceTable}
            </div>

        </div>
    );
}

export default ContextMenu;
