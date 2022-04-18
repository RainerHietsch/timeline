import { useStore } from '../stores/Store';
import Building from "../components/Building";
import {Buildings} from "../data/Buildings";

function BuildingTiles() {
    const [state, actions] = useStore();

    let resourceBuildings = Buildings.filter((building) => {
        return building.group === 'resources' && building.req.every(val => state.finishedTech.includes(val));
    });

    let storageBuildings = Buildings.filter((building) => {
        return building.group === 'storage' && building.req.every(val => state.finishedTech.includes(val));
    });

    let scienceBuildings = Buildings.filter((building) => {
        return building.group === 'science' && building.req.every(val => state.finishedTech.includes(val));
    });

    let populationBuildings = Buildings.filter((building) => {
        return building.group === 'population' && building.req.every(val => state.finishedTech.includes(val));
    });

    let cultureBuildings = Buildings.filter((building) => {
        return building.group === 'culture' && building.req.every(val => state.finishedTech.includes(val));
    });

    return (
        <div>
            <div className={'buildingCat'}>
                <div className={'buildingCatName'}>Basic Resources</div>
                <div className={'buildingCatBuildings'}>
                    {
                        resourceBuildings.map((building) => {
                            return <Building key={building.id} data={building}/>
                        })
                    }
                </div>
                <div className={'buildingCatName'}>Population</div>
                <div className={'buildingCatBuildings'}>
                    {
                        populationBuildings.map((building) => {
                            return <Building key={building.id} data={building}/>
                        })
                    }
                </div>
                <div className={'buildingCatName'}>Science</div>
                <div className={'buildingCatBuildings'}>
                    {
                        scienceBuildings.map((building) => {
                            return <Building key={building.id} data={building}/>
                        })
                    }
                </div>
                <div className={'buildingCatName'}>Storage</div>
                <div className={'buildingCatBuildings'}>
                    {
                        storageBuildings.map((building) => {
                            return <Building key={building.id} data={building}/>
                        })
                    }
                </div>
                <div className={'buildingCatName'}>Culture</div>
                <div className={'buildingCatBuildings'}>
                    {
                        cultureBuildings.map((building) => {
                            return <Building key={building.id} data={building}/>
                        })
                    }
                </div>

            </div>
        </div>
    );
}

export default BuildingTiles;
