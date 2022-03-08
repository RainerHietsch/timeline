import { useStore } from '../stores/Store';
import {Button} from "semantic-ui-react";

function CollectButton() {
    const [state, actions] = useStore();

    return (
        <div>
            <Button onClick={() =>actions.add('food')}>Collect Berries</Button>
            <Button onClick={() =>actions.add('wood')}>Chop Wood</Button>
            <Button onClick={() =>actions.add('stone')}>Gather Stone</Button>
        </div>
    );
}

export default CollectButton;
