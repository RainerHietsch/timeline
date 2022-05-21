import { useStore } from '../stores/Store';
import {useRef, useState} from "react";
import * as Lang from "../data/Lang";
import {Button, Divider, Header, Icon, Modal} from "semantic-ui-react";
import {Line} from "rc-progress";
import {getBlueprint} from "../functions/FactoryFunctions";
import Blueprint from "./Blueprint";

function Factory(props) {
    const [state, actions] = useStore();
    const [open, setOpen] = useState(false)

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

    const changeBlueprint = (factoryId) => {
        state.factoryToChangeBP = factoryId;
        setOpen(true);
    }

    const closeBlueprintModal = () => {
        setOpen(false);
    }

    const availableBlueprints = state.blueprints.map((blueprint) => {
        return <Blueprint bp={blueprint} close={closeBlueprintModal}/>
    })

    return (
        <div className={'factoryWrapper'}>
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
            >
                <div className={'blueprintsWrapper'}>{availableBlueprints}</div>
            </Modal>
            <div className={'blueprintName'}>
                <div>{blueprint.name}</div>
                <div onClick={() => changeBlueprint(props.factory.id)} style={{cursor: 'pointer'}}>(change)</div>
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
