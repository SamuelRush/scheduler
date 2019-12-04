# Interview Scheduler

## What it does

- An application that creates and stores interview time slots given a preset API of days, interviewers, and appointments (if any exist)

## Photos

!["Single Page Application"](/docs/IndexPage.png)
!["Add Interview Slot"](/docs/AddUser.png)
!["Delete Interview"](/docs/DeleteUser.png)

## How it works

- A user can pick a day for an interview
- The user sees which spots on that day are available (the user can also see how many spots remain on a day before clicking on it)
- The user clicks the '+' to add their name to the interview schedule, this is where they will be able to choose who they interview with as well
- After the user saves, the data gets stored to the API
- The user can later edit their name or interviewer from the same page or can delete their appointment

## Dependencies

- axios
- @testing-library/react-hooks
- react-test-renderer

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
