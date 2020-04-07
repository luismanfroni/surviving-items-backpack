const Individual = require("./Individual");
module.exports = class Population {
    constructor(individuals = [Individual()]) {
        this.individuals = individuals;
    }
    static random(populationSize = 0, maxWeight = 0) {
        return new Population(
            new Array(populationSize).fill(0)
                .map(_ => Individual.random(maxWeight))
        );
    }
    bestIndividuals(maxIndividuals) {
        return this.individuals.sort(
            (a, b) => b.backpack.currentReward - a.backpack.currentReward
        ).slice(0, maxIndividuals);
    }
}