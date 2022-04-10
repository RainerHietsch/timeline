import { useStore } from '../stores/Store';
import {Projects} from "../data/Projects";
import Project from "../components/Project";

function ProjectsScreen() {
    const [state, actions] = useStore();

    const getAvailableProjects = (state) => {
        return Projects.filter((projectToCheck) => {
            return projectToCheck.req.every(val => state.finishedTech.includes(val)) &&
                !state.finishedProjects.includes(projectToCheck.id)
        })
    }

    const projects = getAvailableProjects(state).map((project) => {
        return <Project key={project.id} project={project} />
    })

    return (
        <div className={'projectsWrapper'}>
            {projects}
        </div>
    );
}

export default ProjectsScreen;
