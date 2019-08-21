# jobtracker
jobtracker fullstack project

1. Overview The Job Tracker program is a fullstack CRUD application that enables a job hunter to create an account, authenticate, and then create, read, update and delete job cards. Each job card represents a job that the job hunter is interested in pursuing, and they contain various data fields related to the job hunting process, including the position, company, salary, a url to the job posting, notes and other application status fields.

2. Explanation of Technologies Used The primary logic for this application is written in Javascript, augmented with AngularJS and AJAX. The database is in MongoDB hosted on Atlas, and Mongoose is used for interacting with the database. Additionally, authentication leverages bcrypt to protect and verify passwords. We decided to use partials for the different views on our single page application.

3. The Approach Taken Our setup uses up a new github repository, a mongo database hosted on Atlas, and application hosting on heroku. We decided to use bcrypt to add authentication to our site. Using Angular, we created functions to create, read, update and delete jobs. Our display uses HTML and CSS for styling, and we decided to use partials for the different views on our single page application.

4. Unsolved Problems

5. User Stories I, as a job seeker will be able to create a username and password. I, as a job seeker will be able to create a job card that contains: Position Name Company Name Date that I submitted my application Whether or not I submitted a resume Whether or not I submitted a cover letter Date that I followed up The offered salary, if listed A url to the job posting A notes field where I can enter notes to myself I, as a job seeker will be able to read, update and delete jobs from my database I, as a job seeker will be able to have my own job cards that only I can see and manipulate. Other users will not be able to see my job cards.

6. Notes As a future upgrade to the Job Tracker application, we should consider adding links to popular job posting sites (e.g., Indeed, Monster). When a user accesses those sites from our application, they should be able to import key fields from the job posting into their newly created job card.

7. Link The Job Tracker application can be accessed at the following link: https://jobtracker12345.herokuapp.com/
