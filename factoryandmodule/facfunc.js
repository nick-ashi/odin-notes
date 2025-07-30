const User = function (name) {
    this.name = name;
    this.discordName = "@" + name;
}

// hey, this is a constructor - 
// then this can be refactored into a factory!

function createUser(name) {
    const discordName = "@" + name;
    return { name, discordName };
}

// hey, this is a constructor - 
// then this can be refactored into a factory!