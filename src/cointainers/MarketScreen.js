import {useStore} from '../stores/Store';
import _ from 'lodash';
import Tippy from "@tippyjs/react";


function MarketScreen() {
    const [state, actions] = useStore();

    return (
        <div className={'marketWrapper'}>
            MARKET
        </div>
    );
}

export default MarketScreen;
