import {canAfford, getIndex, payCosts, useStore} from '../stores/Store';
import {createLeader} from "../data/Leaders";
import {Button, Divider} from "semantic-ui-react";
import {LeadersLang} from "../data/Lang";
import _ from 'lodash';
import Tippy from "@tippyjs/react";
import * as HelperFunctions from "../functions/HelperFunctions";
import * as Leaders from "../data/Leaders";
import LeaderPerson from "../components/LeaderPerson";

function LeaderScreen() {
    const [state, actions] = useStore();

    const chooseLeader = (id) => {
        state.leader = state.leaderCandidates[getIndex(id, state.leaderCandidates)];
        _.remove(state.leaderCandidates, (n) => {
            return n.id === id;
        });
    }

    const generateNewCandidates = (state) => {

        const cost = [{id: 'influence', name: 'Influence', amount: HelperFunctions.regenLeaderInfluenceCost(state)}]
        if(!canAfford(cost, state)) return;

        state.leaderCandidates = [];
        for(let i=0;i<3;i++){
            const candidate = createLeader();
            state.leaderCandidates.push(candidate);
        }
        state.leaderMinInfluenceCost += 5;
        state.leaderInfluenceCostMulti = 10;

        payCosts(cost, state);
    }

    const leader = state.leader ? <LeaderPerson person={state.leader}/> : null;

    const candidates = state.leaderCandidates.map((candidate) => {
        return <LeaderPerson
            person={candidate}
            isCandidate
            chooseLeader={chooseLeader}
        />
    });

    return (
        <div className={'leaderWrapper'}>
            <div className={'dividerHeader'}>Leader</div>
            <div className={'currentLeader'}>{leader}</div>
            <div className={'dividerHeader'}>Candidates</div>
            <div className={'candidates'}>{candidates}</div>
            <br />

            <Tippy
                theme='light'
                arrow={false}
                placement={'bottom'}
                offset={[0, 0]}
                allowHTML={true}
                content={<div>
                    Costs {_.round(HelperFunctions.regenLeaderInfluenceCost(state))} (-{state.leaderInfluenceCostDecayPerSecond * state.leaderMinInfluenceCost}/s) influence
                    <Divider />
                    Minimum Cost: {state.leaderMinInfluenceCost} influence<br />
                    Multiplier: {_.round(state.leaderInfluenceCostMulti,2)} (-{state.leaderInfluenceCostDecayPerSecond}/s)<br />
                </div>}
            >
                <div style={{ width: 'fit-content'}}>
                    <Button onClick={() => generateNewCandidates(state)}>Generate New Candidates</Button>
                </div>
            </Tippy>
        </div>
    );
}

export default LeaderScreen;
