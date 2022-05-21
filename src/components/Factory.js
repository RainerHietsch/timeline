import { useStore } from '../stores/Store';
import {useRef} from "react";
import * as Lang from "../data/Lang";
import {Divider, Header, Icon} from "semantic-ui-react";
import {Line} from "rc-progress";
import {getBlueprint} from "../functions/FactoryFunctions";

function Factory(props) {
    const [state, actions] = useStore();

    const blueprint = getBlueprint(state, props.factory.blueprint);

    const input = blueprint.input.map((input) => {
        return <div key={input.id} className={'inputRow'}>
            <div>{input.amount}</div>
            <div>x</div>
            <div>{Lang.MineResourcesLang[input.id]}</div>
        </div>
    })

    const output = blueprint.output.map((output) => {
        return <div key={output.id} className={'inputRow'}>
            <div>{output.amount}</div>
            <div>x</div>
            <div>{Lang.MineResourcesLang[output.id]}</div>
        </div>
    })

    return (
        <div className={'factoryWrapper'}>
            <div className={'blueprintName'}>
                <div>{blueprint.name}</div>
                <Line percent={props.factory.currentProduction} strokeWidth="4" strokeColor="#42d231" />
            </div>
            <div
                className={'inputWrapper'}
                style={{backgroundColor: props.factory.inputBlocked ? '#ff00001c' : 'none'}}
            >{input}</div>
            <Divider horizontal>
                <Header as='h4'>
                    <Icon name={props.factory.producing ? 'cog loading' : 'cog'} />
                </Header>
            </Divider>
            <div
                className={'inputWrapper'}
                style={{backgroundColor: props.factory.outputBlocked ? '#ff00001c' : 'none'}}
            >{output}</div>
        </div>
    );
};

export default Factory;
