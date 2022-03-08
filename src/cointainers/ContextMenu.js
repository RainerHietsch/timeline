import { useStore } from '../stores/Store';
import millify from "millify";

function ContextMenu() {
    const [state, actions] = useStore();

    const resourceTable = state.resources.filter(res => res.count > 0).map((res) => {
        return <div className={'resourceLine'}>
            <div className={'resourceName'}>{res.name}</div>
            <div className={'resourceAmount'}>{millify(res.count, {precision: 2, lowercase: true})}/{res.max}</div>
            <div className={'resourceRate'}>{res.production.rate}/s</div>
        </div>
    });

    return (
        <div className={'contextMenuWrapper'}>
            {resourceTable}
        </div>
    );
}

export default ContextMenu;
