const Backpack = require("./Backpack");
module.exports = class Individual {
    constructor(backpack) {
        this.backpack = backpack;
    }
    static crossover(individualA, individualB) {
        let newBackpack = Backpack.crossover(individualA.backpack, individualB.backpack);
        let newIndividual = new Individual(newBackpack);
        newBackpack = Backpack.crossover(individualA.backpack, individualB.backpack);
        return newIndividual;
    }
    static random(maxWeight) {
        let newBackpack = Backpack.randomBackpack(maxWeight);
        return new Individual(newBackpack);
    }
}