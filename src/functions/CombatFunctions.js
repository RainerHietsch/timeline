import _ from 'lodash';

export const battle = (enemies, state) => {

    let playerArmyClean = Object.entries(state.military).filter(([key, value]) => {
        return value.count !== 0 && typeof value === 'object';
    }).reduce((acc, [key, value]) => {
        return { ...acc, [key]: value }
    }, {});

    let playerTurn = true;
    while(!_.includes(calculateLeft(playerArmyClean, enemies),0)){

        let attacker = playerTurn ? _.sample(playerArmyClean) : _.sample(enemies);
        let defender = playerTurn ? _.sample(enemies) : _.sample(playerArmyClean);

        let damage = _.random(attacker.minAttack, attacker.maxAttack);
        defender.hp -= damage;

        if(defender.hp <= 0){
            playerTurn
                ? defender.count -= 1
                : state = killTroops('infantry', 1, state);
            defender.hp = defender.maxHp;
            console.log(`1 x ${defender.name} was killed in combat!`)
        }

        _.remove(playerTurn ? playerArmyClean : enemies , (n) => {
            return n.count === 0;
        });

        playerTurn = !playerTurn;
    }

    return [calculateLeft(playerArmyClean, enemies)[1] === 0, state];
}

const calculateLeft = (playerArmy, enemies) => {
    let playerLeft = 0;
    if (playerArmy.infantry !== undefined) playerLeft += playerArmy.infantry.count;
    if (playerArmy.cavalry !== undefined) playerLeft += playerArmy.cavalry.count;
    if (playerArmy.artillery !== undefined) playerLeft += playerArmy.artillery.count;

    let enemiesLeft = _.reduce(enemies, (sum, n) => {
        return sum += n.count;
    }, 0)

    return [playerLeft, enemiesLeft];
}

const killTroops = (type, amount, state) => {
    state.military[type].count -= amount;
    state.military[type].goal -= amount;
    return state;
}