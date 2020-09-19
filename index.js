// These are all npm packages that we need to run the ReadeMe generator
const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const writeFileAsync = util.promisify(fs.writeFile);

// Creates questions for the user to answer, and has a place for that information to be
// stored for later use
function promptUser() {
    return inquirer.prompt ([
        {
            type: "input",
            name: "title",
            message: "What is the title of your project?"
        },
        {
            type: "input",
            name: "description",
            message: "Please describe the functionality of your project."
        },
        {
            type: "input",
            name: "installation",
            message: "Enter installation here."
        },
        {
            type: "input",
            name: "usage",
            message: "Enter usage here."
        },
        {
            type: "checkbox",
            name: "license",
            message: "Select your license",
            choices: [
                "GNU GPLv3",
                "MIT",
                "ISC",
                "Apache"
            ]
        },
        {
            type: "input",
            name: "contributing",
            message: "Listed who all contributed to this project"
        },
        {
            type: "input",
            name: "Tests",
            message: "Test enter here"
        },
        {
            type: "input",
            name: "questions",
            message: "Enter questions here"
        }
    ])
}

//Makes the template for the readeMe
function generateReadme(answer) {
    return `
    # ${answer.title}
    `
}

// Makes sure we get the user input before it tries to generate the Readme
async function startProgram() {
    try {    
        const answer = await promptUser();
        const readMe = generateReadme(answer);
    
        await writeFileAsync("README.md", readMe);
        console.log("It works!");
    } catch (err) {
        console.log(err);
    }

}

startProgram();