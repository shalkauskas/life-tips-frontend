# Life Pro Tips (frontend)

Life Pro Tips is a full-stack app inspired by a famous subreddit [/r/LifeProTips](https://www.reddit.com/r/LifeProTips/) featuring usefull life hacks and tips.

## [View Website](https://life-tips.shalkauskas.com/)

[![](https://res.cloudinary.com/dyj6lkekg/image/upload/c_scale,q_56,w_735/v1618511848/github/lpt.png)](https://life-tips.shalkauskas.com/)

## Features

- Create or like posts anonymously
- Register or login with Google
- **C**reate, **R**ead, **U**pdate or **D**elete posts
- Comment, like and share you favorites
- Change your name or profile picture in profile settings
- Search & sort to find what you like easier

LPT is a full-stack app, with this repository containing a front-end side built with React. The back end repo can be found [here.](https://github.com/shalkauskas/life-tips-server)

## Tech

### Front-end

- [React](https://reactjs.org/) - state management with Context API and useReducer
- [Axios](https://github.com/axios/axios) - API calls
- [Material-UI](https://material-ui.com/) - styling and UI.
- [Cloudinary](https://cloudinary.com/) - user profile picture upload storage

_Hosted on [Vercel](https://vercel.com/dashboard)_

### Back-end/Server

- [node.js](http://nodejs.org) - evented I/O for the backend
- [Express](http://expressjs.com) - fast node.js network app framework
- [MongoDB](https://www.mongodb.com/) - No SQL Database for storing userdata and content
- [Mongoose](https://mongoosejs.com/) - elegant mongodb object modeling for node.js
- [Passport](http://www.passportjs.org/) - local and Google Auth

_Hosted on [Heroku](https://www.heroku.com/)_

## Installation

Installation guidelines for front-end only.
Back-end can be found in corresponding [repo](https://github.com/shalkauskas/life-tips-server).

1. Clone the repo

2. In root folder create a `.env` file and add your API keys

```
PORT="Port for react server"
REACT_APP_SERVER="Server address for all api calls || default http://localhost:8080/api"
REACT_APP_CLOUDNAME="Cloudname from Cloudinary for uploading user pictures"
REACT_APP_CLOUDINARY_API_KEY="Cloudinary API key"
```

3. Then
   `npm start`

## Contribute

If you like this project and would like to contribute feel free to send a PR or simply add an issue with feature or bug fix request

## License

MIT
