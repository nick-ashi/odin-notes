const rl = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
});

rl.question("Please enter your choice (1, 2, or 3): ", (userChoice) => {
    switch (userChoice) {
        case "1":
            console.log("You chose option 1.");
            // Add your code for option 1 here
            break;
        case "2":
            console.log("You chose option 2.");
            // Add your code for option 2 here
            break;
        case "3":
            console.log("You chose option 3.");
            // Add your code for option 3 here
            break;
        default:
            console.log("Invalid choice. Please enter 1, 2, or 3.");
            // Optionally, you can prompt the user again or handle the error
            break;
    }
    readline.close();
});

