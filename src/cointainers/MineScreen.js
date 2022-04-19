import {canAfford, getIndex, payCosts, useStore} from '../stores/Store';
import {Button, Divider} from "semantic-ui-react";
import Deposit from "../components/Deposit";
import _ from 'lodash';

function LeaderScreen() {
    const [state, actions] = useStore();

    const deposits = state.mine.deposits.map((deposit) => {
        return <Deposit key={deposit.id} deposit={deposit} />;
    })

    const newLevel = () => {
        return true;
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
