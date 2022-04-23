import { useStore } from '../stores/Store';
import TechTile from "../components/TechTile";

function ResearchScreen() {
    const [state, actions] = useStore();

    const availableTech = state.availableTech.map((tech) =>
    {
        return <TechTile techInfo={tech} key={tech.id}/>
    })

    return (
        <div className={'techWrapper'}>
            {availableTech}
        </div>
    );
}

export default ResearchScreen;
