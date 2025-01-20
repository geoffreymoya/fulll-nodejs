# fleet
- Here's my fleet JS/TS implementation

## step 1
To test this step we need :
- Install dependencies with `yarn install`
- And run `yarn test` to test the memory repository

## step 2
To test this second step we need :
- a running mongodb server with url/credentials defined in src/App/config.ts
- the test command is `yarn test-persist`
To use the CLI interface we need to run `npm link` before

## step 3
For code quality ESLint could be a useful tool to analyse and refactor code
For CI/CD in github actions, a Docker Image of MongoDB is required with some samples data and next deploy the fleet package and run cucumber tests