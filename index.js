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

  //JS functions call basic queries to display whole table
  function viewBranches() {
    db.query(`SELECT * FROM service_branch`, function (err, res) {
      if (err) throw err;
      console.table(res);
      initialize();
    })
  };

  function viewRoles() {
    db.query(`SELECT * FROM role`, function (err, res) {
      if (err) throw err;
      console.table(res);
      initialize();
    })
  };

  function viewMembers() {
    db.query(`SELECT * FROM member_data`, function (err, res) {
      if (err) throw err;
      console.table(res);
      initialize();
    })
  };

  function addBranch() {
    inquirer.prompt([
      {
        name: "addBranch",
        message: "What is the name of the new imperial service branch?"
      }
    ]).then(function (answer) {
      db.query(
        "INSERT INTO service_branch SET ?", {
        name: answer.addBranch
      },
        function (err, res) {
          if (err) throw err;
          console.log(" New Service Branch is active.\n");
          initialize();
        }
      );
    });
  }

  initialize()