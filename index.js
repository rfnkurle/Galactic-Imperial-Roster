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

  function addRole() {
    //query service_branch for existing list of branches
    db.query("SELECT * FROM service_branch", function (err, res) {
      if (err) throw err;
      //asking for the three properties on the roles table      
      inquirer.prompt([
        {
          name: "title",
          type: "input",
          message: "Please enter the title of the new role."
        },
        {
          name: "paygrade",
          type: "number",
          message: "What is the paygrade of this role?",
        },
        {
          name: "branchId",
          type: "list",
          message: "Select a service branch for this role.",
          choices: res.map(branch=> branch.name)
        }
      ]).then(function (answers) {
        // bring response into scope of promise
        const selectedBranch = res.find(branch => branch.name === answers.branchId);
        db.query("INSERT INTO role SET ?",
          {
            title: answers.title,
            paygrade: answers.paygrade,
            branch_id: selectedBranch.id
          },
          function (err, res) {
            if (err) throw err;
            console.log("New role added.\n");
            initialize();
          }
        );
      });
    })
  };

  function addMember() {
    db.query("SELECT * FROM role", function (err, results) {
      if (err) throw err;
      inquirer.prompt([
        {
          name: "firstName",
          type: "input",
          message: "What is the new recruit's first name?"
        },
        {
          name: "lastName",
          type: "input",
          message: "What is the new recruit's last name?"
        },
    {
        name: "rank",
        type: "input",
        message: "What is the new recruit's rank?"
      },
        {
          name: "roleId",
          type: "list",
          choices: results.map(item => item.title),
          message: "Select a role for the recruit"
        }
      ]).then(function (answers) {
        const selectedRole = results.find(item => item.title === answers.roleId);
        db.query("INSERT INTO member_data SET ?",
          {
            first_name: answers.firstName,
            last_name: answers.lastName,
            rank: answers.rank,
            role_id: selectedRole.id
          }, function (err, res) {
            if (err) throw err;
            console.log("Added new recruit named " + answers.firstName + " " + answers.lastName + "\n");
            initialize();
          })
      })
    })
  };
  

  initialize()