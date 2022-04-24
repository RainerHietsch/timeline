import {Data} from "../data/Data";
import {addRes, canAfford, payCosts} from "../stores/Store";
import * as Store from "../stores/Store";

const enoughResoureceSpace = (state, resourceId, amount) => {
    let enoughOutputSpace = true;
    const resource = Store.getResource(state, resourceId);
    if((resource.max - resource.count) < amount) enoughOutputSpace = false;
    return enoughOutputSpace;
}

const checkOutputSpace = (state, factory) => {
    let enoughOutputSpace = true;
    factory.blueprint.output.map((output) => {
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
        return factory.active && factory.blueprint;
    })

    activeFactories.map((factory) => {

        // check if the factory is already producing something
        if(factory.producing){

            // can we finish?
            if(!checkOutputSpace(state,factory)) return;

            // advance a tick
            const ticksToComplete = factory.blueprint.secondsToProduce*1000/Data.updateInterval;
            const productionPerTick = 100/ticksToComplete;
            factory.currentProduction += productionPerTick;

            // check for finish
            if(factory.currentProduction >= 100){
                // add output to resources
                factory.blueprint.output.map((res) => {
                    addRes(state, res.id, res.amount);
                })

                // reset the factory
                factory.producing = false;
                factory.currentProduction = 0;

            }

        } else {
            // check if we can start production
            if(!canAfford(factory.blueprint.input, state, !Data.freeFactories)) {
                factory.inputBlocked = true;
                return;
            } else {
                factory.inputBlocked = false;
            }
            if(!checkOutputSpace(state,factory)) return;

            // deduct the resources
            payCosts(factory.blueprint.input, state, !Data.freeFactories);

            // set producing to true
            factory.producing = true;
        }
    });
}