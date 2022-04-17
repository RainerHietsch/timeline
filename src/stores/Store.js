import {createHook, createStore} from 'react-sweet-state';
import {compressToUTF16, decompressFromUTF16} from 'lz-string';
import _ from 'lodash';
import {Tech} from "../data/Tech";
import {Buildings} from "../data/Buildings";
import {calculateCost} from "../data/CostMulti";
import {Data} from "../data/Data";
import * as LandFunctions from "../functions/LandFunctions";
import {
    randomLandInfluenceCost,
    randomLandInhabitants,
    randomLandName,
    randomLandSize,
    randomLandType
} from "../functions/LandFunctions";
import {battle} from "../functions/CombatFunctions";
import {getBuildingCount} from "../functions/HelperFunctions";
import {doesPersonDie} from "../data/Leaders";

var randomString = require('random-string');
const ls = require('local-storage');

// FUNCTIONS

const addRes = (state, res, amount) => {
    const index = state.resources.findIndex((obj => obj.id === res));
    state.resources[index].count = state.resources[index].count + amount;
}

export const getIndex = (needle, haystack) => {
    return haystack.findIndex((obj => obj.id === needle));
}

const getAvailableTechFunction = (state) => {
    state.availableTech = Tech.filter((techToCheck) => {
        return techToCheck.req.every(val => state.finishedTech.includes(val)) &&
            !state.finishedTech.includes(techToCheck.id)
    })
    return state;
}

export const canAfford = (costs, state) => {
    if (Data.freeCosts) return true;
    let canAfford = true;
    costs.every((singleResCost) => {
        const index = getIndex(singleResCost.id, state.resources);
        if (singleResCost.amount > state.resources[index].count){
            canAfford = false;
            return false;
        }
        return true;
    });
    return canAfford;
}

export const payCosts = (costs, state) => {
    costs.forEach((singleResCost) => {
        state.resources[getIndex(singleResCost.id, state.resources)].count -=  Data.freeCosts ? 0 : singleResCost.amount;
    });
    return state;
}

const updateStorage = (state) => {

    const storageBuildingBonus = state.buildings.filter(building => building.id === 'storage')[0].count * 50 * state.storageLevel;

    state.resources.forEach((res) => {
        switch (res.id){
            case "wood": state.resources[getIndex('wood', state.resources)].max = 50 + storageBuildingBonus; break;
            case "stone": state.resources[getIndex('stone', state.resources)].max = 50 + storageBuildingBonus; break;
            default: break;
        }
    })
}

const calculateGrowthValues = (state) =>
{
    const farms = getBuildingCount(state, 'farm');
    const growthAmountGenerated = 0.05 * farms;
    const grownNextLvlUpAt = 10*Math.pow(state.level,Data.growthPowerMultiplier);
    return {growthAmountGenerated, grownNextLvlUpAt};
}

const getBuilding = (state, name) => {
    return state.buildings[state.buildings.findIndex((obj => obj.id === name))];
}

const updateResourceProduction = (state, source) => {

    if(source.produces){
        source.produces.filter((sourceResourceProduction) =>  {
            return sourceResourceProduction.id !== 'growth';
        }).forEach((sourceResourceProduction) => {
            const resourceIndex = state.resources.findIndex((obj => obj.id === sourceResourceProduction.id));
            const rateIndex = state.resources[resourceIndex].production.rate.findIndex((obj => obj.name === source.name));
            const currentRateObject = state.resources[resourceIndex].production.rate[rateIndex];
            // calculate total
            const totalProduction =
                currentRateObject
                    ? currentRateObject.amount + sourceResourceProduction.rate
                    : sourceResourceProduction.rate;

            const rateObject = {
                name: source.name,
                absolute: sourceResourceProduction.absolute,
                amount: totalProduction
            };

            _.set(state, `resources[${resourceIndex}].production.rate[${rateIndex === -1 
                ? state.resources[resourceIndex].production.rate.length 
                : rateIndex}]`, rateObject);
        });
    }
    return state;
}
export const getLeaderBonusFor = (state, resId) => {
    if(state.leader === undefined) return 0;
    const leaderBonuses = state.leader.bonuses;
    return _.reduce(leaderBonuses, function(sum, n) {
        if(n.type === resId+'_production_percent'){
            return sum + n.value;
        }
        return sum;
    }, 0);
}

const calculateTotalProductionForResource = (state, resObj) => {
    const ratePartitioned = _.partition(resObj.production.rate,{ absolute: true});

    const absoluteProduction =  _.reduce(ratePartitioned[0], function(sum, n) {
        return sum + n.amount;
    }, 0);

    let percentageBonus =  _.reduce(ratePartitioned[1], function(sum, n) {
        return sum + n.amount;
    }, 0);

    // check for Leader percentage bonus
    percentageBonus += getLeaderBonusFor(state, resObj.id)

    const percentageToAmount = percentageBonus / 100 * absoluteProduction;

    const totalProduction = absoluteProduction + percentageToAmount;

    resObj.production.perSecond = totalProduction * (1000/Data.updateInterval);

    return totalProduction;
}

const generateLand = () => {

    const id = randomString({length: 5});
    const type = randomLandType();
    const name = randomLandName()
    const size = randomLandSize();
    const enemies = randomLandInhabitants();
    const influenceCost = randomLandInfluenceCost(size);

    return {
        id,
        name,
        type,
        size,
        enemies,
        influenceCost
    };
}


const Store = createStore({
    // value of the store on initialisation
    initialState: {
        screen: 'civic',
        currentAge: 'Stone Age',
        finishedTech: ['nothing'],
        availableTech: [],
        finishedProjects: [],
        currentProjects: [],
        level: 1,
        growth: 0,
        storageLevel: 1,
        borderSecurity: 0,
        military: {
          infantry: {
              name: 'Infantry',
              count: 0,
              goal: 0,
              currentBuildProgress: 0,
              minAttack: 1,
              maxAttack: 4,
              hp:10,
              maxHp: 10,
              armour: 0
          },
          cavalry: {
              name: 'Cavalry',
              count: 0,
              goal: 0,
              currentBuildProgress: 0,
              minAttack: 3,
              maxAttack: 12,
              hp:30,
              maxHp: 10,
              armour: 0
          },
          artillery: {
              name: 'Artillery',
              count: 0,
              goal: 0,
              currentBuildProgress: 0,
              minAttack: 10,
              maxAttack: 20,
              hp:15,
              maxHp: 10,
              armour: 0
          },
          morale: 0,
          quality: 0
        },
        resources: [
            {
                id:'science',
                name: 'Science',
                count: 0,
                max: 50,
                production: {
                    buildings: [],
                    tech: ['fire'],
                    rate: [],
                    perSecond: 0
                },
            },
            {
                id:'influence',
                name: 'Influence',
                count: 0,
                max: 50,
                production: {
                    buildings: [],
                    tech: ['pigments'],
                    rate: [],
                    perSecond: 0
                }
            },
            {
                id:'manpower',
                name: 'Manpower',
                count: 0,
                max: 5,
                production: {
                    buildings: ['farm'],
                    tech: [],
                    rate: [],
                    perSecond: 0
                }
            },
          {
              id:'wood',
              name: 'Wood',
              count: 0,
              max: 50,
              production: {
                  buildings: ['loggingcamp'],
                  tech: ['improvedtools'],
                  rate: [],
                  perSecond: 0
              }
          },
          {
              id:'stone',
              name: 'Stone',
              count: 0,
              max: 50,
              production: {
                  buildings: ['stonequarry'],
                  tech: ['improvedtools'],
                  rate: [],
                  perSecond: 0
              }
          },
        ],
        // BUILDINGS
        buildings: [],
        // LANDS
        landsqkm: 0.44,
        landUsed: 0,
        maxKnownLands: 3,
        lands: [],

        // Leader
        leader: undefined,
        leaderCandidates: [],
        leaderMinInfluenceCost: 10,
        leaderInfluenceCostMulti: 1,
        leaderInfluenceCostDecayPerSecond: 0.1,
        leaderHealthVisible: true
    },
    // actions that trigger store mutation
    actions: {
        add:
            (res) =>
                ({ setState, getState }) => {
                    let state = getState();
                    state = addRes(state, res, 1);
                    setState({state});
                },

        save:
            () =>
                ({ setState, getState }) => {
                    ls.set('save', compressToUTF16(JSON.stringify(getState())));
                },
        addGrowth:
            (amount) =>
                ({ setState, getState }) => {
                    const state = getState();
                    state.growth += amount;
                },
        getGrowthPercentNeeded:
            () =>
                ({ setState, getState }) => {
                    const state = getState();
                    return calculateGrowthValues(state).grownNextLvlUpAt;
                },
        grow:
            () =>
                ({ setState, getState, dispatch }) => {
                    const state = getState();
                    const growthValues = calculateGrowthValues(state);

                    const currentGrowth = state.growth;
                    const neededGrowth = growthValues.grownNextLvlUpAt - currentGrowth;
                    const generatedGrowth = growthValues.growthAmountGenerated;

                    if(generatedGrowth >= neededGrowth){
                        state.growth = 0;
                        state.level += 1;
                        return;
                    }

                    state.growth += generatedGrowth;
                },
        load:
            () =>
                ({ setState, getState }) => {
                    setState(JSON.parse(decompressFromUTF16(ls.get('save'))));
                },
        produce:
            () =>
                ({ setState, getState }) => {
                    let state = getState();
                    for (const [key, value] of Object.entries(state.resources)) {
                        const rawAmount = calculateTotalProductionForResource(state, value);
                        const amount = _.clamp(rawAmount, 0, value.max - value.count);
                        if(!isNaN(amount)) addRes(state, value.id, amount);
                    }
                    setState({state});
            },
        changeScreen:
            (screen) =>
                ({ setState, getState }) => {
                    const state = getState().screen = screen;
                    setState({state});
                },
        getAvailableTech:
            () =>
                ({ setState, getState }) => {
                    let state = getState();
                    setState(getAvailableTechFunction(state));
                    setState(state);
                },
        addMilitaryGoal:
            (type) =>
                ({ setState, getState }) => {

                    let state = getState();

                    const cost = Data.military.infantry.cost;


                    // Check if it's affordable
                    if (!canAfford(cost, state)){
                        return;
                    }

                    state.military[type].goal += 1;

                    state = payCosts(cost, state);

                    // Deduct the cost
                    setState(state);
                },
        researchTech:
            (techName) =>
                ({ setState, getState , dispatch}) => {

                    // Get the new technology
                    let state = getState();
                    let newTech = Tech.filter((techToCheck) => {
                        return techToCheck.name === techName
                    })[0]

                    // Check if it's affordable
                    if (!canAfford(newTech.cost, state)) return;

                    // Deduct the cost
                    state = payCosts(newTech.cost, state);

                    // Actually reasearch the tech
                    state.finishedTech = state.finishedTech.concat(newTech.id);
                    state = getAvailableTechFunction(state)
                    state = updateResourceProduction(state, newTech);
                    setState({state});
                },
        buildBuilding:
            (buildingName) =>
                ({ setState, getState , dispatch}) => {

                    // Get the new building
                    let state = getState();
                    let newBuilding = Buildings.filter((buildingToCheck) => {
                        return buildingToCheck.id === buildingName
                    })[0];

                    // Check Land Size
                    if(newBuilding.land !== undefined){
                        const landAvailable = state.landsqkm - state.landUsed;
                        if (landAvailable < newBuilding.land) return;
                    }

                    // Get the current count
                    const currentBuildingCount = getBuildingCount(state, newBuilding.id);

                    // Calculate real cost
                    const realCost = calculateCost(_.cloneDeep(newBuilding.cost), newBuilding.costMultiplier, currentBuildingCount)

                    // Check if it's affordable
                    if (!canAfford(realCost, state)) return;

                    // Deduct the cost
                    state = payCosts(realCost, state);

                    // Occupy the land
                    if(newBuilding.land !== undefined) state.landUsed += newBuilding.land;

                    // Actually build the building
                    if(currentBuildingCount > 0){
                        const index = state.buildings.findIndex((obj => obj.id === newBuilding.id));
                        state.buildings[index].count += 1;
                    } else {
                        state.buildings.push({
                            id: newBuilding.id,
                            count: 1
                        })
                    }

                    state = updateResourceProduction(state, newBuilding);

                    if(newBuilding.increases?.length !== 0){
                        _.forEach(newBuilding.increases, (res) => {
                            state.resources[getIndex(res.id, state.resources)].max += res.amount;
                        });
                    }
                    if(newBuilding.cat === 'storage'){
                        updateStorage(state);
                    }

                    setState({state});
                },
        trainTroops:
            () =>
                ({ setState, getState }) => {
                    const state = getState();
                    const infantry = state.military.infantry;

                    if(infantry.goal > infantry.count){
                        infantry.currentBuildProgress += 2;
                        if(infantry.currentBuildProgress >= 100){
                            infantry.count += 1;
                            infantry.currentBuildProgress = 0;
                        }
                    }
                    setState(state);
                },
        explore:
            () =>
                ({ setState, getState }) => {
                    let state = getState();
                    if (state.lands.length >= state.maxKnownLands) return;

                    // Check if it's affordable
                    const cost = [{id: 'manpower', name: 'Manpower', amount: 10}]
                    if (!canAfford(cost, state)){
                        if(!Data.freeCosts) return;
                    }

                    // Deduct the cost
                    state = payCosts(cost, state);

                    const land = generateLand();
                    state.lands.push(land);
                    setState(state);
                },
        dismissLand:
            (id) =>
                ({ setState, getState }) => {
                    const state = getState();
                    _.remove(state.lands, (n) => {
                        return n.id === id;
                    });
                    setState(state);
                },
        calculations:
            () =>  ({ setState, getState }) => {
                let state = getState();

                // calculate borderSecurity
                state.borderSecurity = LandFunctions.calculateBorderSecurity(state);

                // calculate leader regen multiplier
                const leaderMultiDecay = state.leaderInfluenceCostDecayPerSecond / (1000/Data.updateInterval);
                const tempLeaderMulti = state.leaderInfluenceCostMulti - leaderMultiDecay;
                state.leaderInfluenceCostMulti = tempLeaderMulti <= 1 ? 1 : tempLeaderMulti;

                // check if leader & candidates die
                if(state.leader !== undefined){
                    if(doesPersonDie(state.leader)){
                        console.log(`${state.leader.name} died at the age of ${_.round(state.leader.age)} with ${_.round(state.leader.health)}% health left.`);
                        state.leader = undefined;
                    }
                }
                if(state.leaderCandidates.length > 0){
                    state.leaderCandidates.map((candiate) => {
                        if(doesPersonDie(candiate)){
                            console.log(`${candiate.name} died at the age of ${_.round(candiate.age,2)} with ${_.round(candiate.health)}% health left.`);
                            state.leaderCandidates = state.leaderCandidates.filter((sub) => {
                                return sub.id !== candiate.id;
                            })
                        }
                    })
                }

                // age leader & candidates
                const ageGainPerTick = Data.ageGainPerHour / (3600 * (1000/Data.updateInterval));
                if(state.leader !== undefined){
                    state.leader.age += ageGainPerTick;
                    state.leader.health =  _.clamp(state.leader.health - (ageGainPerTick),0,100);
                }
                if(state.leaderCandidates.length > 0){
                    state.leaderCandidates.map((candiate) => {
                        candiate.age += ageGainPerTick;
                        candiate.health =  _.clamp(candiate.health - (ageGainPerTick),0,100);
                    })
                }

            },
        claimLand:
            (landObj) =>
                ({ setState, getState }) => {
                    let state = getState();

                    // Check if it's affordable
                    const cost = [{id: 'influence', name: 'Influence', amount: landObj.influenceCost}]
                    if (!canAfford(cost, state)){
                        if(!Data.freeCosts) return;
                    }

                    if(landObj.enemies.length !== 0){
                        const [won, newState] = battle(landObj.enemies, state);
                        if(!won) {
                            setState(newState);
                            return;
                        }
                    }

                    // Deduct the cost
                    state = payCosts(cost, state);

                    // Claim & Delete Land
                    state.landsqkm += landObj.size;
                    _.remove(state.lands, (n) => {
                        return n.id === landObj.id;
                    });
                    setState(state);
                },
    },
    // optional, mostly used for easy debugging
    name: 'counter',
});

export const useStore = createHook(Store);