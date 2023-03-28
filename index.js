const inquirer =  require("inquirer");
const db = require("./connection")


function initialize() {
    inquirer.prompt([
      {
        name: "action",
        type: "list",
        message: "Welcome to the Imperial Database, please select an option.",
        choices: [
          "View all branches",
          "View all roles",
          "View all service members",
          "Add a new branch",
          "Add a new role",
          "Add a new service member",
          "Update member role",
          "Exit"
        ]
      }])
      .then(function (answer) {
        switch (answer.action) {
          case "View all branches":
            viewBranches();
            break;
          case "View all roles":
            viewRoles();
            break;
          case "View all service members":
            viewMembers();
            break;
          case "Add a new branch":
            addBranch();
            break;
          case "Add a new role":
            addRole();
            break;
          case "Add a new service member":
            addMember();
            break;
          case "Update member role":
            updateRole();
            break;
          case "Exit":
            db.end();
            console.log("Goodbye and long live the Emperor.")
            break;
        }
      });
  };

  function viewBranches() {
    db.query(`SELECT * FROM service_branch`, function (err, res) {
      if (err) throw err;
      console.table(res);
      initialize();
    })
  };

  initialize()