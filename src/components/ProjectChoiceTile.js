import {useStore} from '../stores/Store';
import {Button} from "semantic-ui-react";

function Project(props) {
    const [state, actions] = useStore();

    return (
        <div className={'project'}>
            {props.project.name}
            <Button onClick={() => {props.chooseProject(props.project.id)}}>Start Project</Button>
        </div>
    );
};

export default Project;