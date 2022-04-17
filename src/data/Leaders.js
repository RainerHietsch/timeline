import _ from 'lodash';
var randomString = require('random-string');

const LeaderBonuses = [
    ['wood_production_percent', 100, [[1,5],[6,10],[11,15],[16,20],[21,25]]],
    ['stone_production_percent', 100, [[1,5],[6,10],[11,15],[16,20],[21,25]]],
    ['science_production_percent', 50, [[1,5],[6,10],[11,15],[16,20],[21,25]]],
    ['influence_production_percent', 50, [[1,5],[6,10],[11,15],[16,20],[21,25]]],
];

export const createLeader = () => {
    return {
        id: randomString({length: 5}),
        name: getLeaderName(),
        bonuses: getLeaderBonuses()
    }
}

const getLeaderBonuses = () => {
    const bonusCount = _.random(1,3);
    const bonuses = [];
    for(let i=0;i<bonusCount;i++){
        const bonus = LeaderBonuses[_.random(0,LeaderBonuses.length-1)];
        const type = bonus[0];
        const tier = _.random(1,5);
        const value = _.random(bonus[2][tier-1][0], bonus[2][tier-1][1]);

        bonuses.push({type, tier, value});
    }
    return bonuses;
}

const getLeaderName = () => {
    const firstNames = ['David', 'James', 'Rainer', 'Alan', 'Jim'];
    const lastNames = ['Wellington', 'Smith', 'Hietsch', 'Raga', 'Bo'];

    return `${_.sample(firstNames)} ${_.sample(lastNames)}`
}