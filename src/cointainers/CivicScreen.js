import { useStore } from '../stores/Store';
import CollectButton from "../components/CollectButton";
import BuildingTiles from "./BuildingTiles";

function CivicScreen() {
    const [state, actions] = useStore();
    return (
        <div>
            <CollectButton />
            <BuildingTiles />
        </div>
    );
}

export default CivicScreen;
