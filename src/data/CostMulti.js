export const calculateCost = (costArray, costMulti, currentBuildingCount) => {
    costArray.map((cost) => {
            cost.amount = Math.round(cost.amount*Math.pow(costMulti, currentBuildingCount));
    });

    return costArray;
}
