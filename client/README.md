<h1>The Project Palace Readme</h1>

<h2>Setup and Installation</h2>

### Dependencies

Run `npm install` in the project folder to install dependencies related to Express (the server).

`cd client` and run `npm install` install dependencies related to React (the client).

### Database Prep

Create `.env` file in project directory and add

```
DB_NAME=projects
DB_PASS=YOUR_PASSWORD
```

(replace `YOUR_PASSWORD` with your actual password)

Alternatively, you can rename the provided `.env.example` file to `.env`.

Type `mysql -u root -p` to access the MySQL CLI using your password.

In the MySQL CLI, type `create database projects;` to create a database in MySQL.

Run the following in the MySQL CLI: `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YOUR_PASSWORD';` (replace `YOUR_PASSWORD` with your actual password)

Run `npm run migrate` in your **TERMINAL**, in the **project** folder (not your MySQL CLI! Open a new terminal window for this). This will create a table called 'items' in your database.

### Run Your Development Servers

- Run `npm start` in project directory to start the Express server on port 4000
- `cd client` and run `npm run dev` to start client server in development mode with hot reloading in port 5173.
- Client is configured so all API calls will be proxied to port 4000 for a smoother development experience. Yay!
- You can test your client app in `http://localhost:5173`
- You can test your API in `http://localhost:5000/api`

<h2>API Authentication Keys</h2>

There are two external APIs in the Idaes component. You will need to set up an authentication key for both and save these in a .env file in the <b>client</b> folder.

You will then have two .env files: one in the main project with your mysql password, and one in the client folder for the API keys.

- Unsplash
- Youtube

Create your .env file in the client folder.
Copy the following, inserting your own keys.

VITE_UNSPLASH_API_KEY=/<b>YOUR PASSWORD HERE</b>/ <br>
VITE_YOUTUBE_API_KEY=/<b>YOUR PASSWORD HERE</b>/

There is a limit to the number of API calls you can make each day (around 50 for each)

<h2>App structure</h2>

<h3>Main App.jsx</h3>

The app has three main components rendered through the Home component contained in the App.jsx file (client). These are all linked using React Router.

Home (app landing page)

1. Create
2. Gallery
3. Ideas

The src/components folder contains all of the app's components.

<h4>Create</h4>

One component for the edit project form:

<li>POST fetch request to add a new project.</li>
<li>On submission, reroutes to the Gallery component. </li>

<h4>Gallery</h4>

All components are rendered through the Gallery.jsx. This maps through the project cards and renders them.

ProjectCard renders the following components:

<li>EditProject</li>
<li>DeleteProject</li>
<li>ProjectModal</li>

<h4>Ideas</h4>
Two components:
<li>ImageIdeas: API call to Unsplash.</li>
<li>YoutubeIdeas: API call to Youtube.</li>

Please check the notes on setting up the API keys for these.
