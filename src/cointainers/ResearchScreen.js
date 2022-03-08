import { useStore } from '../stores/Store';
import TechTile from "../components/TechTile";

function ResearchScreen() {
    const [state, actions] = useStore();

    const availableTech = state.availableTech.map((tech) =>
    {
        return <TechTile techInfo={tech}/>
    })

    return (
        <div>
            {availableTech}
        </div>
    );
}

export default ResearchScreen;
