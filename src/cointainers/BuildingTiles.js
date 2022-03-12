import { useStore } from '../stores/Store';
import Building from "../components/Building";
import {Buildings} from "../data/Buildings";

function BuildingTiles() {
    const [state, actions] = useStore();

    let resourceBuildings = Buildings.filter((building) => {
        return building.cat === 'basic resource' && building.req.every(val => state.finishedTech.includes(val));
    });

    let storageBuildings = Buildings.filter((building) => {
        return building.cat === 'storage' && building.req.every(val => state.finishedTech.includes(val));
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
                <div className={'buildingCatName'}>Storage</div>
                <div className={'buildingCatBuildings'}>
                    {
                        storageBuildings.map((building) => {
                            return <Building key={building.id} data={building}/>
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default BuildingTiles;
