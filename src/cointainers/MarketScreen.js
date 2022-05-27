import {useStore} from '../stores/Store';
import _ from 'lodash';
import Tippy from "@tippyjs/react";


function MarketScreen() {
    const [state, actions] = useStore();

    return (
        <div className={'marketWrapper'}>
            <div className={'marketGoods left'}>AAA</div>
            <div className={'marketCenterTrade'}>BBB</div>
            <div className={'marketGoods right'}>CCC</div>
        </div>
    );
}

export default MarketScreen;
