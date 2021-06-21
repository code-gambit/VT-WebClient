# Web Client for V Transfer
![JavaScript](https://img.shields.io/badge/Javascript-3DDC84?style=for-the-badge&logo=javascript&logoColor=white) [![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)](https://join.slack.com/t/codegambit/shared_invite/zt-pe1nuhbk-iPuFm2B1JuMS86od4a4wXQ) [![License](https://img.shields.io/badge/License-GPL-lightgrey.svg?style=for-the-badge)](https://github.com/code-gambit/VT-WebClient/blob/development/LICENSE) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/code-gambit/VT-WebClient?style=for-the-badge) <br>
[![CircleCI Workflow Status](https://img.shields.io/circleci/build/gh/code-gambit/VT-WebClient.svg?style=for-the-badge)](https://github.com/code-gambit/VT-WebClient/blob/development/.circleci/config.yml)
![React](https://img.shields.io/badge/React-0095D5?&style=for-the-badge&logo=react&logoColor=white) [![GitHub last commit](https://img.shields.io/github/last-commit/code-gambit/VT-WebClient?style=for-the-badge)](https://github.com/code-gambit/VT-WebClient/commits)

## Project description
This project is the web client for V Transfer, allowing people to share their file easily with minimum steps without compromising the security. At the backend we are using [IPFS](https://ipfs.io/), to upload a file, which is a blockchain-based technology for file sharing and thus making file upload more secure and reliable. Given below are some of the key feature of this app.
1. Upload file and get a short url for sharing
2. Create different URL with different configuration like
    * Limit click count
    * Control visibility of url (suspending the url temporarily)
    * Deleting the url
3. View file details and related urls
4. User authentication for better security
5. Manage user details

## Development Setup
Before setting up the development environment make sure you have downloaded the `npm ~6.14` and `Node.js ~14.16` and added them to path variables. [Downloading Node.js](https://nodejs.org/en/download/)

## Building the Code
1. Clone the repository using command: 
    ```sh
   git clone https://github.com/code-gambit/VT-WebClient.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create `.env` file to setup environment variables
    ```
    REACT_APP_BACKENDURL=<BACKEND_URL>
    REACT_APP_APIKEY=<API_KEY>
    REACT_APP_FRONTENDURL="http://localhost:3000"
    REACT_APP_TITLE="V Transfer"
    ```
4. In the root directory run
    ```
    npm start
    ```
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Roadmap

See the [open issues](https://github.com/code-gambit/vt-webclient/issues) for a list of proposed features and known issues.

## Contributing
1. Fork it
2. Create your feature branch `(git checkout -b my-new-feature)`
3. Commit your changes `(git commit -m 'Add some feature')`
4. In case of multiple commits squash them. You can find guide here: [how to squash commits](https://medium.com/@slamflipstrom/a-beginners-guide-to-squashing-commits-with-git-rebase-8185cf6e62ec)
4. Run the tests with `(npm run test)` and make sure all tests are passed.
5. Push your branch `(git push origin my-new-feature)`
6. Create a new Pull Request, following the template

## CI
Currently, we have a basic CircleCI workflow setup for CI, which takes care of building the project and running the basic checks. Make sure all your pull requests pass the CI build only then, it will be allowed to merge.
