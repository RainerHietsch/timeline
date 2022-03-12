import { createStore, createHook } from 'react-sweet-state';
import { compressToUTF16, decompressFromUTF16 } from 'lz-string';
import _ from 'lodash';
import {Tech} from "../data/Tech";
import {Buildings} from "../data/Buildings";
import {calculateCost, costMulti1} from "../data/CostMulti";
import {Data} from "../data/Data";

const ls = require('local-storage');

// FUNCTIONS

const addRes = (state, res, amount) => {
    const index = state.resources.findIndex((obj => obj.id === res));
    state.resources[index].count = state.resources[index].count + amount;
}

const getIndex = (needle, haystack) => {
    return haystack.findIndex((obj => obj.id === needle));
}

const getAvailableTechFunction = (state) => {
    state.availableTech = Tech.filter((techToCheck) => {
        return techToCheck.req.every(val => state.finishedTech.includes(val)) &&
            !state.finishedTech.includes(techToCheck.id)
    })
    return state;
}

const canAfford = (costs, state) => {
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

const payCosts = (costs, state) => {
    costs.forEach((singleResCost) => {
        state.resources[getIndex(singleResCost.id, state.resources)].count -=  Data.freeCosts ? 0 : singleResCost.amount;
    });
    return state;
}

const updateStorage = (state) => {

    const storageBuildingBonus = state.buildings.filter(building => building.id === 'storage')[0].count * 50;

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
    const farms = getBuilding(state, 'farm').count;
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

const calculateTotalProductionForResource = (resObj) => {
    const ratePartitioned = _.partition(resObj.production.rate,{ absolute: true});

    const absoluteProduction =  _.reduce(ratePartitioned[0], function(sum, n) {
        return sum + n.amount;
    }, 0);

    const percentageBonus =  _.reduce(ratePartitioned[1], function(sum, n) {
        return sum + n.amount;
    }, 0);

    const percentageToAmount = percentageBonus/100*absoluteProduction;

    const totalProduction = absoluteProduction+percentageToAmount;

    resObj.production.perSecond = totalProduction * (1000/Data.updateInterval);

    return totalProduction;
}


const Store = createStore({
    // value of the store on initialisation
    initialState: {
        screen: 'civic',
        currentAge: 'Stone Age',
        finishedTech: ['nothing'],
        availableTech: [],
        level: 1,
        growth: 0,
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
        buildings: [
            {id: "stonequarry", count: 0},
            {id: "loggingcamp",count: 0},
            {id: "farm",count: 0},
            {id: "storage",count: 0}
        ],
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
                        const rawAmount = calculateTotalProductionForResource(value);
                        const amount = (value.count + rawAmount) > value.max ? (value.max - value.count) : rawAmount;
                        if(!isNaN(amount)) addRes(state, value.id, amount);
                    }
                    setState({state});
            },
        changeScreen:
            (screen) =>
                ({ setState, getState }) => {
                    let state = getState();
                    state.screen = screen
                    setState({state});
                },
        getAvailableTech:
            () =>
                ({ setState, getState }) => {
                    let state = getState();
                    setState(getAvailableTechFunction(state));
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
                    if (!canAfford(newTech.cost, state) && !Data.freeCosts){
                        if(!Data.freeCosts) return;
                    }

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

                    // Get the current count
                    const index = state.buildings.findIndex((obj => obj.id === newBuilding.id));
                    const currentBuildingCount = state.buildings[index].count;

                    // Calculate real cost
                    const realCost = calculateCost(_.cloneDeep(newBuilding.cost), newBuilding.costMultiplier, currentBuildingCount)

                    // Check if it's affordable
                    if (!canAfford(realCost, state)){
                        if(!Data.freeCosts) return;
                    }

                    // Deduct the cost
                    state = payCosts(realCost, state);

                    // Actually build the building
                    state.buildings[index].count += 1;
                    state = updateResourceProduction(state, newBuilding);
                    updateStorage(state);

                    setState({state});
                },
    },
    // optional, mostly used for easy debugging
    name: 'counter',
});

export const useStore = createHook(Store);