const BackpackItem = require("./BackpackItem");
const { shuffleArray } = require("./utils");

module.exports = class Backpack {
    constructor(maxWeight = 0) {
        this.maxWeight = maxWeight;

        this.items = [];
    }
    get currentWeight() {
        return this.items.reduce((previous, current) => previous + current.weight, 0);
    }
    get currentReward() {
        return this.items.reduce((previous, current) => previous + current.reward, 0);
    }
    hasSpace(forWeight = 0) {
        return (this.currentWeight + forWeight) <= this.maxWeight;
    }
    haveItem(backbackItem) {
        return Boolean(this.items.find(i => i == backbackItem));
    }
    static randomBackpack(maxWeight = 0, availableItems = BackpackItem.availableItems) {
        if (!!availableItems) {
            let clonedAvailableItems = [...availableItems];
            if (maxWeight > 0 && clonedAvailableItems.length > 0) {
                var newBackpack = new Backpack(maxWeight);
                shuffleArray(clonedAvailableItems);
                while(newBackpack.hasSpace() && clonedAvailableItems.length > 0) {
                    let currentItem = clonedAvailableItems.pop();
                    if (newBackpack.hasSpace(currentItem.weight)) {
                        newBackpack.items.push(currentItem);
                    }
                }
                return newBackpack;
            }
        }
        return new Backpack(maxWeight);
    }

    static crossover(backpackA, backpackB) {
        let commonItems = backpackA.items.filter(itemA => backpackB.items.find(itemB => itemA == itemB));
        let uncommonItems = [
            ...(backpackA.items.filter(itemA => !commonItems.find(item => itemA == item))),
            ...(backpackB.items.filter(itemB => !commonItems.find(item => itemB == item)))
        ];
        let availableBackpackItems = [
            ...commonItems,
            ...uncommonItems.filter(_ => (Math.round(Math.random()) == 1))
        ];
        let crossedOverBackpack = Backpack.randomBackpack(backpackA.maxWeight, availableBackpackItems);
        return crossedOverBackpack;
    }

    static mutate(backpack, mutationProbability) {
        let mutatedItems = [];
        while(mutatedItems.length < backpack.items.length) {
            var item;
            if (Math.random() > mutationProbability) {
                item = backpack.items.pop()
            } else {
                item = BackpackItem.availableItems.find(i => !backpack.items.find(c => c == i));
            }
            mutatedItems.push(item);
        }
        let mutatedBackpack = Backpack.randomBackpack(backpack.maxWeight, mutatedItems);
        return mutatedBackpack;
    }
}
