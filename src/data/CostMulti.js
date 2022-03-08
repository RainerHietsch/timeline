export const costMulti1 = (amount) => {
    return 0.5*Math.pow(amount, 1.1);
}

export const costMulti2 = (amount) => {
    return 0.5*Math.pow(amount, 1.5);
}

export const costMulti3 = (amount) => {
    return 0.5*Math.pow(amount, 2);
}

export const calculateCost = (costArray, costMulti, currentBuildingCount) => {
    costArray.map((cost) => {
        switch(costMulti){
            case 1:  cost.amount = Math.round(costMulti1(currentBuildingCount+1)*cost.amount); break;
            case 2:  cost.amount = Math.round(costMulti2(currentBuildingCount+1)*cost.amount); break;
            case 3:  cost.amount = Math.round(costMulti3(currentBuildingCount+1)*cost.amount); break;
            default: break;
        }
    });

    return costArray;
}
