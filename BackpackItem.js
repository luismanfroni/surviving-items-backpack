module.exports = class BackpackItem {
    constructor(name, weight, reward) {
        this.name = name;
        this.weight = weight;
        this.reward = reward;
    }
    static availableItems = []
    toString() {
        return `${this.name}`;
    }
}