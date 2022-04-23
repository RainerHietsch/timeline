import { useStore } from '../stores/Store';
import {Button} from "semantic-ui-react";
import * as HelperFunctions from "../functions/HelperFunctions";

function SettingsScreen() {
    const [state, actions] = useStore()

    return (
        <div className={'settingsWrapper'}>
            <Button onClick={actions.save}>Save</Button>
            <Button onClick={actions.load}>Load</Button>
            <Button onClick={HelperFunctions.showLS}>Local Storage Usage</Button>
        </div>
    );
}

export default SettingsScreen;
