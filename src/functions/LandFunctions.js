import _ from 'lodash';

const primalInhabitants = [
    {
        name: 'Wild Boar',
        power: 1,
        count: 0
    },
    {
        name: 'Sabertooth Tiger',
        power: 3,
        count: 0
    },
    {
        name: 'Woolly Mammoth',
        power: 6,
        count: 0,
    }
];

export const randomLandType = () => {
    return _.sample(['Steppe', 'Desert', 'Forest', 'Taiga', 'Jungle']);
}

export const randomLandName = () => {
    const p1 =  _.sample(['Howling', 'Crying', 'Vast', 'Dark', 'Hollow']);
    const p2 =  _.sample(['Scar', 'Lakes', 'Lands', 'Canyon', 'Mountain']);
    return `${p1} ${p2}`;
}

export const randomLandSize = () => {
    return _.round(_.random(0.1, 10.0),2);
}

export const randomLandInhabitants = () => {
    const enemies = [];

    if (_.random(1,2) === 1) return enemies;

    const numberOfEnemies = _.random(1,3);

    for(let i = 0; i < numberOfEnemies; i++){

        const enemy = _.sample(primalInhabitants);
        const exists = _.filter(enemies, ['name', enemy.name]);

        if(exists.length > 0){
            const index = enemies.findIndex((obj => obj.name === enemy.name));
            enemies[index].count += 1;
            enemies[index].power +=  enemies[index].power;
        } else {
            enemy.count = 1;
            enemies.push(enemy);
        }
    }

    return enemies
}

