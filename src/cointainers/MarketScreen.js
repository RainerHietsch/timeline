import {addRes, getIndex, useStore} from '../stores/Store';
import _ from 'lodash';
import Tippy from "@tippyjs/react";
import {useState} from "react";
import Slider from "rc-slider";
import {Button} from "semantic-ui-react";


function MarketScreen() {
    const [state, actions] = useStore();
    const [sellRes, setSellRes] = useState();
    const [buyRes, setBuyRes] = useState();
    const [toSell, setToSell] = useState(0);
    const [toBuy, setToBuy] = useState(0);

    const sellResources = state.resources.filter(res => state.knownResources.includes(res.id)).map((res) => {
        return res.count > 0
            ? <div onClick={() => {setSellRes(res)}}>{res.name}</div>
            : <div style={{color: 'grey'}}>{res.name}</div>
    });

    const buyResources = state.resources.filter(res => state.knownResources.includes(res.id)).map((res) => {
        return  <div onClick={() => {setBuyRes(res)}}>{res.name}</div>
    });

    const getRatio = () => {
        return buyRes?.tradeValue / sellRes?.tradeValue;
    }

    const getMaxTrade = () => {
        const storageLeft = buyRes?.max - buyRes?.count;
        const maxToSell = sellRes?.count / getRatio();

        return _.min([storageLeft, maxToSell]);
    }

    const setTradeValues = (e) => {
        setToSell( _.round(e * getRatio(),1));
        setToBuy( _.round(e,1));
    }

    const trade = () => {
        addRes(state, buyRes?.id, toBuy);
        state.resources[getIndex(sellRes?.id, state.resources)].count -= toSell;
    }

    return (
        <div className={'marketWrapper'}>
            <div className={'marketGoods left'}>{sellResources}</div>
            <div className={'marketCenterTrade'}>
                <div className={'chosenGoods'}>
                    <div className={'sellRes'}>{sellRes?.name}</div>
                    <div className={'buyRes'}>{buyRes?.name}</div>
                </div>
                <div className={'tradeAmounts'}>
                    <div className={'toSellRes'}>{toSell}</div>
                    <div className={'toBuyRes'}>{toBuy}</div>
                </div>
                <Slider
                    min={1}
                    max={getMaxTrade()}
                    step={1}
                    onChange={(e) => {setTradeValues(e)}}
                />
                <Button
                    onClick={() => {trade()}}
                >Trade!</Button>
            </div>
            <div className={'marketGoods right'}>{buyResources}</div>
        </div>
    );
}

export default MarketScreen;
