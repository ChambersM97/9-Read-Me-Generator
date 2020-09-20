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
            default: "npm install"
        },
        {
            type: "input",
            name: "usage",
            message: "How do you run this project?"
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
        }
    ])
}
//Our template literal that will hold the values that are put in from the prompts
function generateReadme (answer) {
    return `
# ${answer.title}

![GitHub license](https://img.shields.io/badge/Made%20by-%40ChambersM97-orange)

# Table of Contents


- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Description:
    This area is designed for leaving a report of what the project is and it's purpose.
    ${answer.description}

## Installation:
    These are the necessary steps to follow/files to download that you need in order to run the application.
    ${answer.installation}

## Usage:
    ${answer.usage}

## License:
[![License](https://img.shields.io/badge/License-${answer.license}%202.0-blue.svg)](https://opensource.org/licenses/${answer.license})

## Contributing:
    ${answer.contributing}

## Tests:

![Password-Generator-gif](readmeGenerator.gif)
![Password-Generator_img](readmepic.PNG)

## Questions:
- GitHub: [${answer.username}](https://github.com/${answer.username})
- Email: Contact me @ ${answer.email} for any other questions you might have!

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