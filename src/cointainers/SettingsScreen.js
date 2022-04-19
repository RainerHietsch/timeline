import { useStore } from '../stores/Store';
import {Button} from "semantic-ui-react";

function SettingsScreen() {
    const [state, actions] = useStore()

    const showLS = () => {
        let _lsTotal = 0,
            _xLen, _x;
        for (_x in localStorage) {
            if (!localStorage.hasOwnProperty(_x)) {
                continue;
            }
            _xLen = ((localStorage[_x].length + _x.length) * 2);
            _lsTotal += _xLen;
            console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB")
        }
        console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
    }

    return (
        <div className={'settingsWrapper'}>
            <Button onClick={actions.save}>Save</Button>
            <Button onClick={actions.load}>Load</Button>
            <Button onClick={showLS}>Local Storage Usage</Button>
        </div>
    );
}

export default SettingsScreen;
