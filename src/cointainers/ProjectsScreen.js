import { useStore } from '../stores/Store';
import {Projects} from "../data/Projects";
import Project from "../components/Project";
import ProjectChoiceTile from "../components/ProjectChoiceTile";
import {advanceAge} from "../functions/HelperFunctions";
import _ from 'lodash';

function ProjectsScreen() {
    const [state, actions] = useStore();

    const getAvailableProjects = (state) => {
        return Projects.filter((projectToCheck) => {
            return projectToCheck.req.every(val => state.finishedTech.includes(val)) &&
                projectToCheck.group === state.currentAge;
        })
    }

    const chooseProject = (id) => {
        state.activeMonument = id;
    }

    const projects = getAvailableProjects(state).map((project) => {
        return <ProjectChoiceTile
            key={project.id}
            project={project}
            chooseProject={chooseProject}
        />
    })

    return (
        <div className={'projectsWrapper'}>
            {state.activeMonument === null &&
            <div>{projects}</div>
            }
            {state.activeMonument !== null &&
            <Project
                key={state.activeMonument}
                project={_.filter(Projects, (project) => {
                    return project.id === state.activeMonument
                })[0]}
            />
            }
        </div>
    );
}

export default ProjectsScreen;
