import { useStore } from '../stores/Store';
import Tippy from "@tippyjs/react";
import _ from "lodash";
import * as Leaders from "../data/Leaders";
import {LeadersLang} from "../data/Lang";
import {Button, Divider, Icon} from "semantic-ui-react";
import * as randomString from "random-string";
import * as Lang from "../data/Lang";

function Blueprint(props) {
    const [state, actions] = useStore();

    const input = props.bp.input.map((input) => {
        return <div key={input.id} className={'inputRowBp'}>
            <div>{input.amount}</div>
            <div>x</div>
            <div>{Lang.MineResourcesLang[input.id]}</div>
        </div>
    })

    const output = props.bp.output.map((output) => {
        return <div key={output.id} className={'inputRowBp'}>
            <div>{output.amount}</div>
            <div>x</div>
            <div>{Lang.MineResourcesLang[output.id]}</div>
        </div>
    })

    const selectBp = () => {
        _.filter(state.factories, (factory) => {
            return factory.id === state.factoryToChangeBP
        })[0].blueprint = props.bp.id;
        props.close();
    }

    return (
        <div className={'blueprintWrapper'}>
            <div className={'bpRow'}>
                <div className={'bpName'}>{props.bp.name}</div>
                <div className={'ioWrapper'}>
                    <div className={'bpInput'}>{input}</div>
                    <div className={'bpOutput'}>{output}</div>
                    <Divider vertical><Icon name='chevron right' /></Divider>
                </div>
                <div className={'seconds'}><Icon name='clock' />{props.bp.secondsToProduce}s</div>
                <div className={'bpSelect'}><Button onClick={() => {selectBp()}}>Select</Button></div>
            </div>
        </div>
    );
};

export default Blueprint;
