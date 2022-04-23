import { useStore } from '../stores/Store';
import Tippy from "@tippyjs/react";
import _ from "lodash";
import * as Leaders from "../data/Leaders";
import {LeadersLang} from "../data/Lang";
import {Button} from "semantic-ui-react";
import * as randomString from "random-string";

function LeaderPerson(props) {
    const [state, actions] = useStore();

    return (
        <div className={'leaderCandidate'}>
            <div className={'firstRow'}>
                <div className={'name'}>{props.person.name}</div>
                <Tippy
                    delay={500}
                    theme='light'
                    arrow={false}
                    placement={'bottom'}
                    offset={[0, 0]}
                    allowHTML={true}
                    content={'The power of a leader is an indicator of how strong of a leader this person is'}
                >
                    <div className={'power'}>{_.reduce(props.person.bonuses, function(sum, bonus) {
                        return sum + bonus.tier;
                    }, 0)}</div>
                </Tippy>
            </div>
            <div>Age: {_.round(props.person.age)}</div>
            {state.leaderHealthVisible &&
            <Tippy
                theme='light'
                arrow={false}
                placement={'bottom'}
                offset={[0, 0]}
                allowHTML={true}
                content={`Chance to die within one hour: ${Leaders.probabilityToDiePerHour(props.person)}%`}
            >
                <div>Health: {_.round(props.person.health)}%</div>
            </Tippy>
            }
            <div className={'bonuses'}>
                {props.person.bonuses.map((bonus) => {
                    return <div className={'singleBonus'} key={randomString(5)}>
                        <div>{LeadersLang[bonus.type]} +{bonus.value}%</div>
                    </div>
                })}
            </div>

            {props.isCandidate &&
                <Button onClick={() => {props.chooseLeader(props.person.id)}}>Promote to Leader</Button>
            }

        </div>
    );
};

export default LeaderPerson;
