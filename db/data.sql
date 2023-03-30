USE imperial_database;

INSERT INTO service_branch (name)
VALUES ("Army"), ("Navy"), ("Inquisition"), ("Intelligence"), ("Administration");

INSERT INTO role (title, paygrade,branch_id)
VALUES ("Grand Moff", 100000000, 5), 
        ("Stormtrooper", 10, 1),
        ("Tie Fighter Pilot", 10000, 2),
        ("Star Destroyer Captain", 50000, 2),
        ("Dark Lord Inquisitor", 999999, 5),
        ("Interrogation Officer", 5555, 4);

INSERT INTO member_data(first_name, last_name, rank, role_id,
officer_id)
VALUES ("Darth", "Vader", "big boss", 5, null),
        ("Willem", "Tarkin", "regional gov", 1, 1),
        ("Jed", "Shryke", "Flight Lieutenant", 3, 2),
        ("Noe", "Budee", "private", 2, 2),
        ("Kevin", "Thrawn", "Admiral", 3, 2);