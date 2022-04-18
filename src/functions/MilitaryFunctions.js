import {Data} from "../data/Data";

export const trainTroops = (state) => {
    const infantry = state.military.infantry;

    if(infantry.goal > infantry.count){
        const ticksToBuild = infantry.secondsToBuild * (1000/Data.updateInterval);
        const buildPerTick = 100/ticksToBuild;
        infantry.currentBuildProgress += buildPerTick;
        if(infantry.currentBuildProgress >= 100){
            infantry.count += 1;
            infantry.currentBuildProgress = 0;
        }
    }
}