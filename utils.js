const shuffles = 4;
function shuffleArray(array) {
    for (var s = 1; s <= shuffles; s++) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

module.exports = {
    shuffleArray
};