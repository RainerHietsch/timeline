import {Data} from "../data/Data";
import _ from "lodash";

export const trainTroops = (state) => {
    const infantry = state.military.infantry;
    if(infantry.goal > infantry.count){

        //Leader Bonus
        let leaderBonusPercent = getLeaderInfantryProductionSpeedBonus(state);

        const ticksToBuild = infantry.secondsToBuild * (1000/Data.updateInterval);

        let buildPerTick = 100/ticksToBuild;

        //Leader Bonus
        buildPerTick += buildPerTick/100*leaderBonusPercent;

        infantry.currentBuildProgress += buildPerTick;
        if(infantry.currentBuildProgress >= 100){
            infantry.count += 1;
            infantry.currentBuildProgress = 0;
        }
    }
}

export const getLeaderInfantryProductionSpeedBonus = (state) => {
    let leaderBonusPercent = 0;
    if(state.leader !== undefined){
        const leaderBonus = state.leader.bonuses.filter((bonus) => {return bonus.type === 'infantry_production_speed'});
        if(leaderBonus.length > 0) {
            leaderBonusPercent =  _.reduce(leaderBonus, function(sum, n) {
                return sum + n.value;
            }, 0);
        }
    }
    return leaderBonusPercent;
}