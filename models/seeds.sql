<<<<<<< HEAD
--seeds data for matches table ---
=======
<<<<<<< HEAD
=======
INSERT INTO privatetables (email, actual_location, contact, createdAt, updatedAt) VALUES ("fake@fake.fke", "Saint Paul, MN", "Phone: 952-555-1234", '2011-04-12T00:00:00.000', '2011-04-12T00:00:00.000');
INSERT INTO privatetables (email, actual_location, contact, createdAt, updatedAt) VALUES ("fakeuser2@fake.fke", "Bloomington, MN", "Phone: 952-555-1233", '2011-04-12T00:00:00.000', '2011-04-12T00:00:00.000');
INSERT INTO privatetables (email, actual_location, contact, createdAt, updatedAt) VALUES ("fakeuser3@fake.fke", "MPLS, MN", "Phone: 952-555-2234", '2011-04-12T00:00:00.000', '2011-04-12T00:00:00.000');
INSERT INTO privatetables (email, actual_location, contact, createdAt, updatedAt) VALUES ("fakeuser4@fake.fke", "Minneapolis, MN", "Phone: 952-555-3333", '2011-04-12T00:00:00.000', '2011-04-12T00:00:00.000');
INSERT INTO privatetables (email, actual_location, contact, createdAt, updatedAt) VALUES ("fakeuser5@fake.fke", "Edina, MN", "Phone: 952-555-5544", '2011-04-12T00:00:00.000', '2011-04-12T00:00:00.000');
INSERT INTO privatetables (email, actual_location, contact, createdAt, updatedAt) VALUES ("mk1@icloud.com", "Highland Park, MN", "Phone: 952-555-1235", '2011-04-12T00:00:00.000', '2011-04-12T00:00:00.000');
INSERT INTO privatetables (email, actual_location, contact, createdAt, updatedAt) VALUES ("mk2@icloud.com", "Burnsville, MN", "Phone: 952-555-1236", '2011-04-12T00:00:00.000', '2011-04-12T00:00:00.000');
INSERT INTO privatetables (email, actual_location, contact, createdAt, updatedAt) VALUES ("mk3@icloud.com", "Apple Valley, MN", "Phone: 952-555-1237", '2011-04-12T00:00:00.000', '2011-04-12T00:00:00.000');
INSERT INTO privatetables (email, actual_location, contact, createdAt, updatedAt) VALUES ("mk4@icloud.com", "Bloomington, MN", "Phone: 952-555-1238", '2011-04-12T00:00:00.000', '2011-04-12T00:00:00.000');
INSERT INTO privatetables (email, actual_location, contact, createdAt, updatedAt) VALUES ("mk5@icloud.com", "Minnetonka, MN", "Phone: 952-555-1239", '2011-04-12T00:00:00.000', '2011-04-12T00:00:00.000');

>>>>>>> 83d2c06406ff41d737c08a2806d3f3fa4e654d3b

INSERT INTO matches (user1, user2, createdAt, updatedAt) VALUES (5, 7, '2011-04-12T00:00:00.000', '2011-04-12T00:00:00.000');
INSERT INTO matches (user1, user2, createdAt, updatedAt) VALUES (5, 2, '2011-04-12T00:00:00.000', '2011-04-12T00:00:00.000');
INSERT INTO matches (user1, user2, createdAt, updatedAt) VALUES (4, 7, '2011-04-12T00:00:00.000', '2011-04-12T00:00:00.000');
INSERT INTO matches (user1, user2, createdAt, updatedAt) VALUES (1, 2, '2011-04-12T00:00:00.000', '2011-04-12T00:00:00.000');
INSERT INTO matches (user1, user2, createdAt, updatedAt) VALUES (0, 7, '2011-04-12T00:00:00.000', '2011-04-12T00:00:00.000');

INSERT INTO matches (user1, user2,createdAt, updatedAt) VALUES (7,2,'2011-04-12T00:00:00.000', '2011-04-12T00:00:00.000' );
INSERT INTO matches (user1, user2,createdAt, updatedAt) VALUES (3,5,'2011-04-12T00:00:00.000', '2011-04-12T00:00:00.000' );
INSERT INTO matches (user1, user2,createdAt, updatedAt) VALUES (2,1,'2011-04-12T00:00:00.000', '2011-04-12T00:00:00.000' );
INSERT INTO matches (user1, user2,createdAt, updatedAt) VALUES (1,8,'2011-04-12T00:00:00.000', '2011-04-12T00:00:00.000' );
INSERT INTO matches (user1, user2,createdAt, updatedAt) VALUES (1,6,'2011-04-12T00:00:00.000', '2011-04-12T00:00:00.000' );
INSERT INTO matches (user1, user2,createdAt, updatedAt) VALUES (1,4,'2011-04-12T00:00:00.000', '2011-04-12T00:00:00.000' );
<<<<<<< HEAD

-- seeds data for users table --

INSERT INTO users (first_name, last_name, email, username, password, createdAt, updatedAt) VALUES ("Nick", "Wilson","nickw556@google.com", "nickw", "8894jiogfklgfkldf", '2011-04-12T00:00:00.000', '2011-04-12T00:00:00.000' );

INSERT INTO users (first_name, last_name, email, username, password, createdAt, updatedAt) VALUES ("Brian", "Samuels","brian@google.com", "bsam", "4849499003", '2011-04-12T00:00:00.000', '2011-04-12T00:00:00.000' );

INSERT INTO users (first_name, last_name, email, username, password, createdAt, updatedAt) VALUES ("Jackson", "Oppenheimer","jackson@google.com",  "jopp","rerrrererere", '2011-04-12T00:00:00.000', '2011-04-12T00:00:00.000' );

INSERT INTO users (first_name, last_name, email, username, password, createdAt, updatedAt) VALUES ("Jon", "Alden","john@google.com", "rer84948dkrrererere", "johnnya", '2011-04-12T00:00:00.000', '2011-04-12T00:00:00.000' );

INSERT INTO users (first_name, last_name, email, username, password, createdAt, updatedAt) VALUES ("Ben", "Escorcia","ben@google.com", "benEsco", "**)#KKSSDSDS", '2011-04-12T00:00:00.000', '2011-04-12T00:00:00.000' );


INSERT INTO users (first_name, last_name, email, username, password, createdAt, updatedAt) VALUES ("John", "Boo","nickw557@google.com",  "Jboo", "osdfjsdfjoisdfj", '2011-04-12T00:00:00.000', '2011-04-12T00:00:00.000' );

INSERT INTO users (first_name, last_name, email, username, password, createdAt, updatedAt) VALUES ("Clark", "Man","nickw559@google.com",  "Clarkman", "sdfjsdjsidjv", '2011-04-12T00:00:00.000', '2011-04-12T00:00:00.000' );

INSERT INTO users (first_name, last_name, email, username, password, createdAt, updatedAt) VALUES ("Howard", "Johnson","nickw550@google.com", "HowardJ","sgjspipsimr90e0", '2011-04-12T00:00:00.000', '2011-04-12T00:00:00.000' );

INSERT INTO users (first_name, last_name, email, username, password, createdAt, updatedAt) VALUES ("Howard", "Duck","nickw436@google.com",  "Hduck", "s9eriwe9fksck", '2011-04-12T00:00:00.000', '2011-04-12T00:00:00.000' );

INSERT INTO users (first_name, last_name, email, username, password, createdAt, updatedAt) VALUES ("Tony", "Stark","nickw216@google.com", "IronMan", "sefscmspofjpoic", '2011-04-12T00:00:00.000', '2011-04-12T00:00:00.000' );
=======
>>>>>>> fa078446aef38c5948bcc55f337aa3d6fe053a94
>>>>>>> 83d2c06406ff41d737c08a2806d3f3fa4e654d3b
