import { useStore } from '../stores/Store';
import Factory from "../components/Factory";

function ProductionScreen() {
    const [state, actions] = useStore()

    const factories = state.factories.map((factory) => {
        return <Factory factory={factory} />
    })

    return (
        <div className={'productionWrapper'}>
            {factories}
        </div>
    );
}

export default ProductionScreen;
