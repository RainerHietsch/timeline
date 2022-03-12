import { useStore } from '../stores/Store';

function MilitaryScreen() {
    const [state, actions] = useStore();

    return (
        <div className={'militaryWrapper'}>
            <div>Military</div>
        </div>
    );
}

export default MilitaryScreen;
