import { useStore } from '../stores/Store';

function LeaderScreen() {
    const [state, actions] = useStore();

    return (
        <div className={'leaderWrapper'}>
            Leader
        </div>
    );
}

export default LeaderScreen;
