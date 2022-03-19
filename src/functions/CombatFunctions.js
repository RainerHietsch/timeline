import _ from 'lodash';

export const battle = (enemies, state) => {

    let playerArmyClean = Object.entries(state.military).filter(([key, value]) => {
        return value.count !== 0 && typeof value === 'object';
    }).reduce((acc, [key, value]) => {
        return { ...acc, [key]: value }
    }, {});

    let whosTurn = 'player';
    let attacker = {};
    let defender = {};
    let damage = 0;

    while(!_.includes(calculateLeft(playerArmyClean, enemies),0)){

        if(whosTurn === 'player'){
            attacker = _.sample(playerArmyClean);
            defender = enemies[_.random(0, enemies.length-1)];
        } else {
            attacker = enemies[_.random(0, enemies.length-1)];
            defender = _.sample(playerArmyClean);
        }

        damage = _.random(attacker.minAttack, attacker.maxAttack);
        defender.hp -= damage;

        if(defender.hp <= 0){
            if(whosTurn === 'player') {
                defender.count -= 1;
            }
            else {
                state = killTroops('infantry', 1, state);
            }
            defender.hp = defender.maxHp;
        }

        if(whosTurn !== 'player'){
            _.remove(enemies, (n) => {
                return n.count === 0;
            });
        } else {
            _.remove(playerArmyClean, (n) => {
                return n.count === 0;
            });
        }

        whosTurn = whosTurn === 'player' ? 'enemy' : 'player';
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