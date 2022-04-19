import _ from 'lodash';
import {Data} from "../data/Data";
import * as HelperFunctions from "./HelperFunctions";

export const generateDeposit = (state) => {

    let randomString = require('random-string');
    const deposits = state.mine.deposits;

    const numberOfRes = _.random(1,3);
    const resArray = [];
    for(let i=0;i<numberOfRes;i++){
        resArray.push(generateResource());
    }

    deposits.push({
        id: randomString(20),
        active: false,
        resources: resArray
    })
}

const generateResource = () => {

    const resource_id = _.random(1,7);
    const amount = _.random(0,Data.res_max*HelperFunctions.getFactorForResource(resource_id))
    const percentage = amount*100/(Data.res_max*HelperFunctions.getFactorForResource(resource_id));

    return {resource_id, amount, percentage}
}