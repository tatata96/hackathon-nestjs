# hackathon-nestjs

A small learning project for practicing the basics of [NestJS](https://nestjs.com/) with TypeScript.

## Project structure

```text
src/
  main.ts                 # Application bootstrap; starts the HTTP server
  app.module.ts           # Root Nest module
  app.controller.ts       # HTTP route handlers
  app.service.ts          # Injectable service used by the controller
  app.controller.spec.ts  # Unit test for the controller
```

## Requirements

- Node.js
- npm

## Setup

```bash
npm install
```

## Run the app

```bash
# Start once
npm run start

# Start in watch mode while learning/developing
npm run start:dev
```
