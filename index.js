const BackpackItem = require("./BackpackItem");
const Generation = require("./Generation");

const maxWeight = 30;
const generationsQuantity = 3;
const population = 100;
const selectionPerGen = 50;
const mutationProbability = 0.4;

BackpackItem.availableItems = [
    new BackpackItem("Saco", 15, 15),
    new BackpackItem("Corda", 3, 7),
    new BackpackItem("Canivete", 2, 10),
    new BackpackItem("Tocha", 5, 5),
    new BackpackItem("Garrafa", 9, 8),
    new BackpackItem("Comida", 20, 17)
];

var gen = null;
var i = 0;
do {
    gen = gen && gen.newGeneration() || Generation.createGeneration(population, selectionPerGen, maxWeight, mutationProbability);
    let best = gen.bestIndividuals();
    console.log({
        gen,
        items: best.map(i => `Backpack: ${i.backpack.items.map(b => b.name)}; Score: ${i.backpack.currentReward}`)
    });
    i++;
} while (i <= generationsQuantity)
