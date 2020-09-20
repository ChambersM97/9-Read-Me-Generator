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
            message: "What command should be run to download independencies?",
            default: "npm intall"
        },
        {
            type: "input",
            name: "usage",
            message: "What does this application do?"
        },
        {
            type: "input",
            name: "contributing",
            message: "Listed who all contributed to this project"
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
            name: "username",
            message: "What is your Github username?",
        },
        {
            type: "input",
            name: "email",
            message: "What is your email address?"
        },
        {
            type: "input",
            name: "questions",
            message: "Enter questions here"
        },

    ])
}
//Our template literal that will hold the values that are put in from the prompts
function generateReadme (answer) {
    return `
# ${answer.title}

# Table of Contents


- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Description:
    ${answer.description}
## Installation:
    ${answer.installation}
## Usage:
    ${answer.usage}
## License:
    ${answer.contributing}
## Questions:
    <h1> You can check out my other projects at ${answer.username}, or
    contact me at ${answer.email} </h1>
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