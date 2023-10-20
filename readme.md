#Why
As part of the final evaluation for the HyperionDev bootcamp, we are required to develop a full-stack web application using MERN and JWT.

#install
You can install the file directly from the file.
Once installed, you need to open your preferred terminal and cd to the backend. Type npm i.
Do the same for the front end.

#Setup
-In order to setup the required passwords and usernames, please go to the backend file/server. On line 16 - 33 you can create the relevant details.

-Set up your own MongoDatase on (Backend/controllers/controller line 6)

Keeping the details on the backend creates more security as the details cannot be collected from a user in the frontend.

#Run
Once installed, cd to the frontend and backend and type npm run start.

List functional and non-functional requirements.

##Functional Requirements

1. The application shall be built using the MERN stack (Mongo, Express, React, and Node.js).
2. The application shall make use of JWT authentication.
3. The application shall make use of its own express backend.
4. The application shall allow an admin user to make use of CRUD (Delete, Create, Edit, and View) on data.
5. The application shall make use of a MongoDB database for storing data.

##Non-Functional Requirements

1. The layout shall allow the user to view all data with two clicks.
2. The system will be easy to maintain and update.
3. The site shall be able to run on a PC.
4. The background colour shall be pastel to create a soft feel for users.
5. The system will be easy to use and understand.

##5 User Stories

1. As Cindy, I want to log into my portfolio and see the company's current vacancies.
2. As Linda, I want to be able to create three different vacancies that will display for all users that log in.
3. As Felicity, I want to be able to see if my manager's role has been advertised for.
4. As Peter, I would love to be able to see what roles are in the final stages (status).
5. As Linda, I want to be able to amend a role. Changing the status from interviewing to offering
6. As Linda, I want to be able to delete a role that has been cancelled due to budget constraints.

#Link to deployment
https://github.com/ChaneScheepers/FirstAttemptMern

#Recommendations for improvement
- Make cookies secret (I did not do so the reviewer can review).
- Add functionality to add candidate names and progress to specific roles.
