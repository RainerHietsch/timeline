import {getIndex, useStore} from '../stores/Store';
import {createLeader} from "../data/Leaders";
import {Button} from "semantic-ui-react";
import {LeadersLang} from "../data/Lang";
import _ from 'lodash';
import Tippy from "@tippyjs/react";

function LeaderScreen() {
    const [state, actions] = useStore();

    const chooseLeader = (id) => {
        state.leader = state.leaderCandidates[getIndex(id, state.leaderCandidates)];
        _.remove(state.leaderCandidates, (n) => {
            return n.id === id;
        });
    }

    const generateNewCandidates = (state) => {
        state.leaderCandidates = [];
        for(let i=0;i<3;i++){
            const candidate = createLeader();
            state.leaderCandidates.push(candidate);
        }
    }

    const leader = state.leader ? <div className={'leaderCandidate'}>
            <div className={'firstRow'}>
                <div className={'name'}>{state.leader.name}</div>
                <Tippy
                    delay={500}
                    theme='light'
                    arrow={false}
                    placement={'bottom'}
                    offset={[0, 0]}
                    allowHTML={true}
                    content={'The power of a leader is an indicator of how strong of a leader this person is'}
                >
                    <div className={'power'}>{_.reduce(state.leader.bonuses, function(sum, bonus) {
                        return sum + bonus.tier;
                    }, 0)}</div>
                </Tippy>
            </div>

            <div className={'bonuses'}>
                {state.leader.bonuses.map((bonus) => {
                    return <div className={'singleBonus'}>
                        <div>{LeadersLang[bonus.type]} +{bonus.value}%</div>
                    </div>
                })}
            </div>
        </div> : null;

    const candidates = state.leaderCandidates.map((candidate) => {
        return <div className={'leaderCandidate'}>
            <div className={'firstRow'}>
                <div className={'name'}>{candidate.name}</div>
                <Tippy
                    delay={500}
                    theme='light'
                    arrow={false}
                    placement={'bottom'}
                    offset={[0, 0]}
                    allowHTML={true}
                    content={'The power of a leader is an indicator of how strong of a leader this person is'}
                >
                <div className={'power'}>{_.reduce(candidate.bonuses, function(sum, bonus) {
                    return sum + bonus.tier;
                }, 0)}</div>
                </Tippy>
            </div>

            <div className={'bonuses'}>
            {candidate.bonuses.map((bonus) => {
                return <div className={'singleBonus'}>
                    <div>{LeadersLang[bonus.type]} +{bonus.value}%</div>
                </div>
            })}
            </div>

            <Button onClick={() => {chooseLeader(candidate.id)}}>Promote to Leader</Button>
        </div>
    });

    return (
        <div className={'leaderWrapper'}>
            <div className={'dividerHeader'}>Leader</div>
            <div className={'currentLeader'}>{leader}</div>
            <div className={'dividerHeader'}>Candidates</div>
            <div className={'candidates'}>{candidates}</div>
            <br />
            <Button onClick={() => generateNewCandidates(state)}>Generate New Candidates</Button>
        </div>
    );
}

export default LeaderScreen;
