import { useStore } from '../stores/Store';
import {Button} from "semantic-ui-react";

function SettingsScreen() {
    const [state, actions] = useStore();

    return (
        <div className={'settingsWrapper'}>
            <Button onClick={actions.save}>Save</Button>
            <Button onClick={actions.load}>Load</Button>
        </div>
    );
}

export default SettingsScreen;
