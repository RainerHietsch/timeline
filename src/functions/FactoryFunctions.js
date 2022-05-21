import {Data} from "../data/Data";
import {addRes, canAfford, payCosts} from "../stores/Store";
import * as Store from "../stores/Store";
import _ from 'lodash';

const enoughResoureceSpace = (state, resourceId, amount) => {
    let enoughOutputSpace = true;
    const resource = Store.getResource(state, resourceId);
    if((resource.max - resource.count) < amount) enoughOutputSpace = false;
    return enoughOutputSpace;
}

export const getBlueprint = (state, id) => {
    return _.filter(state.blueprints, (bp) => {return bp.id === id})[0];
}

const checkOutputSpace = (state, factory) => {
    const blueprint = getBlueprint(state, factory.blueprint);
    let enoughOutputSpace = true;
    blueprint.output.map((output) => {
        if(!enoughResoureceSpace(state, output.id, output.amount)) enoughOutputSpace = false;
    });
    if(!enoughOutputSpace) {
        factory.outputBlocked = true;
        return false;
    } else {
        factory.outputBlocked = false;
        return true;
    }
}

export const produce = (state) => {

    const activeFactories = state.factories.filter((factory) => {
        return factory.active && factory.blueprint !== null;
    })

    activeFactories.map((factory) => {

        if (!factory.blueprint) return;
        const blueprint = getBlueprint(state, factory.blueprint);

        // check if the factory is already producing something
        if(factory.producing){

            // can we finish?
            if(!checkOutputSpace(state,factory)) return;

            // advance a tick
            const ticksToComplete = blueprint.secondsToProduce*1000/Data.updateInterval;
            const productionPerTick = 100/ticksToComplete;
            factory.currentProduction += productionPerTick;

            // check for finish
            if(factory.currentProduction >= 100){
                // add output to resources
                blueprint.output.map((res) => {
                    addRes(state, res.id, res.amount);
                })

                // reset the factory
                factory.producing = false;
                factory.currentProduction = 0;

            }

        } else {
            // check if we can start production
            if(!canAfford(blueprint.input, state, !Data.freeFactories)) {
                factory.inputBlocked = true;
                return;
            } else {
                factory.inputBlocked = false;
            }
            if(!checkOutputSpace(state,factory)) return;

            // deduct the resources
            payCosts(blueprint.input, state, !Data.freeFactories);

            // set producing to true
            factory.producing = true;
        }
    });
}