import {canAfford, getIndex, payCosts, useStore} from '../stores/Store';
import {Button, Divider} from "semantic-ui-react";
import Deposit from "../components/Deposit";
import _ from 'lodash';
import * as MineFunctions from "../functions/MineFunctions";

function LeaderScreen() {
    const [state, actions] = useStore();

    const deposits = state.mine.deposits.map((deposit) => {
        return <Deposit key={deposit.id} deposit={deposit} />;
    })

    const newLevel = () => {
        for(let i=0;i<7;i++){
            const known = i % 7 < 3;
            MineFunctions.generateDeposit(state, known);
        }
    }

    return (
        <div className={'mineWrapper'}>
            <div className={'mineWrapper'}>
                <div className={'sky'} />
                <div className={'surface grass'}/>
                <div className={'deposits'}>
                    {deposits}
                </div>
                <div className={'digDeeper'}>
                    <Button onClick={newLevel}>Dig deeper!</Button>
                </div>
            </div>
        </div>
    );
}

export default LeaderScreen;
