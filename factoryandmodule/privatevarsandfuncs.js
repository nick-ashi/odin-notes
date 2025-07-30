function createUser(name) {
    const discordName = "@" + name;
    
    let reputation = 0;
    const getReputation = () => reputation;
    const giveReputation = () => reputation++;

    return {name, discordName, getReputation, giveReputation};
}

const steve = createUser("Steve");
steve.giveReputation();
steve.giveReputation();

console.log({
    discordName: steve.discordName, 
    reputation: steve.getReputation()
});

function createPlayer(name, level) {
    const {getReputation, giveReputation} = createUser(name);

    const increaseLevel = () => level++;
    return {name, getReputation, giveReputation, increaseLevel};
}
const player1 = createPlayer("Noobmaster69", 1);
player1.giveReputation();
player1.increaseLevel();
console.log({
    name: player1.name, 
    reputation: player1.getReputation()
});   


// Using Object.assign to copy properties from one object to another
function createPlayerV2(name, level) {
    const user = createUser(name);

    const increaseLevel = () => level++;
    return Object.assign({}, user, {increaseLevel});
}

const player2 = createPlayerV2("Noobmaster70", 1);
player2.giveReputation();
player2.increaseLevel();
console.log({
    name: player2.name, 
    reputation: player2.getReputation(),
    discordName: player2.discordName
});