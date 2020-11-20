const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


//****** Inquirer asks for new team member's input******//
const employees = [];
function addMember() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter team member name:"
        },
        {
            type: "input",
            name: "id",
            message: "Enter team member ID:"
        },
        {
            type: "input",
            name: "email",
            message: "Enter your team member email address:"
        },
        {
            type: "list",
            name: "role",
            message: "Choose team member role:",
            choices: [
                "Intern",
                "Engineer",
                "Manager"
            ]
        }
//*******INQIERER PROVIDING ROLE SPECIFIC RETURNS********//////
]).then(function ({ name, id, email, role }) {
    let roleReturn = "";
    if (role === "Intern") {
        roleReturn = "school name";
    } else if (role === "Engineer") {
        roleReturn = "Github username"
    } else {
        roleReturn = "office phone number"
    }

    inquirer.prompt([
        {
            type: "input",
            name: "roleReturn",
            message: `Please enter ${roleReturn} associated with team member:`
        },
        {
            type: "list",
            name: "addTeamMember",
            message: "Would you like to add additional team members?",
            choices: [
                "Yes",
                "No"
            ]
        }
//**********Classes being established based on user's previous input **********//
    ]).then(function ({ roleReturn, addTeamMember }) {
        let newMember;
        if (role === "Intern") {
            newMember = new Intern(name, id, email, roleReturn);
        } else if (role === "Engineer") {
            newMember = new Engineer(name, id, email, roleReturn);
        } else {
            newMember = new Manager(name, id, email, roleReturn);
        }
        employees.push(newMember);
            if (addTeamMember === "Yes") {
                console.log("--------------------------")
                addMember();
            } else {
                buildTeam();
            }
    });
});
};

addMember();
//******HERE WE CALL THE RENDER FUNCTION*********//
function buildTeam() {
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
};
fs.writeFileSync(outputPath, render(employees));
};

