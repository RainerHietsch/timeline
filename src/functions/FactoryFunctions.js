import {Data} from "../data/Data";
import {addRes, canAfford, payCosts} from "../stores/Store";

export const produce = (state) => {

    const activeFactories = state.factories.filter((factory) => {
        return factory.active && factory.blueprint;
    })

    activeFactories.map((factory) => {

        // check if the factory is already producing something
        if(factory.producing){
            // advance a tick
            const ticksToComplete = factory.blueprint.secondsToProduce*1000/Data.updateInterval;
            const productionPerTick = 100/ticksToComplete;
            factory.currentProduction += productionPerTick;

            // check for finish
            if(factory.currentProduction >= 100){
                // reset the factory
                factory.producing = false;
                factory.currentProduction = 0;

                // add output to resources
                factory.blueprint.output.map((res) => {
                    addRes(state, res.id, res.amount);
                })

            }

        } else {
            // check if we can start production
            // TODO: Check if all the output resources are still addable to the storage
            if(!canAfford(factory.blueprint.input, state, !Data.freeFactories)) return;

            // deduct the resources
            payCosts(factory.blueprint.input, state, !Data.freeFactories);

            // set producing to true
            factory.producing = true;
        }
    });
}