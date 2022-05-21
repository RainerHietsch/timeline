import {canAfford, getIndex, payCosts, useStore} from '../stores/Store';
import {Line} from "rc-progress";
import {Button} from "semantic-ui-react";
import Slider from "rc-slider";
import '../slider.css';
import {useState} from "react";
import _ from 'lodash';

function Project(props) {
    const [state, actions] = useStore();

    const [percentToBuild, setPercentToBuild] = useState(0);
    const [percentBuilt, setPercentBuilt] = useState(state.currentProjects[getIndex(props.project.id, state.currentProjects)]?.percent);

    const buildPercent = () => {

        // Check if affordable
        const stepCost = _.cloneDeep(props.project.cost);
        _.forEach(stepCost, (costLine) =>
        {
            costLine.amount = costLine.amount*percentToBuild/100;
        })
        if(!canAfford(stepCost, state)) return;

        // Deduct the cost
        payCosts(stepCost, state)

        // Update the state
        const currentProjectState = state.currentProjects.filter((projectToCheck) => {
            return projectToCheck.id === props.project.id;
        })

        if (currentProjectState.length === 0){
            const newProject = {
                id: props.project.id,
                percent: percentToBuild,
            };
            state.currentProjects.push(newProject);
            setPercentBuilt(percentToBuild);
        } else {
            state.currentProjects[getIndex(props.project.id, state.currentProjects)].percent += percentToBuild;
            setPercentBuilt(state.currentProjects[getIndex(props.project.id, state.currentProjects)].percent);
        }

        // Check for 100%
        if(state.currentProjects[getIndex(props.project.id, state.currentProjects)].percent >= 100){
            state.finishedProjects.push(props.project.id);
            _.remove(state.currentProjects, (project) => {
               return project.id === props.project.id;
            });
            state.activeMonument = null;
        }
    }

    return (
        <div className={'project'}>
            <div className={'name'}>{props.project.name}</div>
            <div className={'image'} />
            <div>
                <Line percent={percentBuilt} strokeWidth="4" strokeColor="#42d231" />
                <div className={'tempCost'}>
                    <div className={'addPercentage'}>+{percentToBuild}%</div>
                    <div className={'cost'}>
                        {props.project.cost.map((cost) => {

                            const stored = state.resources[getIndex(cost.id, state.resources)].count;
                            const buildCost = cost.amount*percentToBuild/100
                            const percentOfStored = cost.amount*percentToBuild/stored;

                            return <div className={percentOfStored > 100 ? 'cannotAfford' : 'canAfford'} key={cost.name}>{buildCost} {cost.name} ({_.round(percentOfStored,0)}%)</div>
                        })}
                    </div>
                </div>
                <Slider
                    min={0}
                    max={100-percentBuilt}
                    step={1}
                    onChange={(e) => {setPercentToBuild(e)}}
                />
                <Button onClick={buildPercent}>Build</Button>
            </div>
        </div>
    );
};

export default Project;