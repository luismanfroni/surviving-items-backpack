const Population = require("./Population");
const Individual = require("./Individual");
const Backpack = require("./Backpack");
const { shuffleArray } = require("./utils");
module.exports = class Generation {
    constructor(population, gen, maxPopulation, generationSelection, maxWeight, mutationProbability) {
        this.gen = gen;
        this.population = population;
        this.maxPopulation = maxPopulation;
        this.generationSelection = generationSelection;
        this.maxWeight = maxWeight;
        this.mutationProbability = mutationProbability;
    }

    static createGeneration(maxPopulation = 10, selectionPerGen = 5, maxWeight = 30, mutationProb = 0.2) {
        return new Generation(
            Population.random(maxPopulation, maxWeight),
            1, //First gen
            maxPopulation,
            selectionPerGen,
            maxWeight,
            mutationProb
        );
    }

    newGeneration() {
        let bestIndividuals = this.population.bestIndividuals(this.generationSelection);
        shuffleArray(bestIndividuals);
        let newPopulation = [];
        var individualA, individualB;
        while(bestIndividuals.length >= 2) {
            individualA = bestIndividuals.pop();
            individualB = bestIndividuals.shift();
            new Array(Math.floor(this.generationSelection / 2)).fill(0).forEach(_ => {
                let individualC = Individual.crossover(individualA, individualB);
                newPopulation.push(individualC);
    
                if (Math.random() <= this.mutationProbability) {
                    let individualD = new Individual(
                        Backpack.mutate(individualC.backpack, this.mutationProbability)
                    );
                    newPopulation.push(individualD);
                }
            });
        }
        return new Generation(
            new Population(newPopulation), 
            this.gen + 1, 
            this.maxWeight, 
            this.generationSelection, 
            this.maxWeight, 
            this.mutationProbability);
    }

    bestIndividuals() {
        return this.population.bestIndividuals(this.generationSelection);
    }
}