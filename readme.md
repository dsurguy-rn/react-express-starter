# React + Express Starter
This repo provides a solid base for developing a webapp with a react frontend and expressjs backend.

Out of the box, it includes bootstrap, provides a single api route (api/vi/ping), and offers hot reloading on both 
the client and server. 

## How To Use
Download this repo as a zip and unzip into your new repo's directory. You could fork it and possibly receive upstream 
updates from this repo, but it's not updated very often so I don't recommend that.

Ensure you are using node v10, install it through [nvm](https://github.com/creationix/nvm) on mac or [nvm for windows](https://github.com/coreybutler/nvm-windows)

Quickstart commands:
- `nvm use 10` (`nvm install 10` first if you don't have it)
- `npm i`
- `npm run dev`

## Development

`npm run dev -- [--port <port>]` (you need the extra `--` because you do)

#### Option Defaults

- port: 3030

## Production

`npm run build -- [--port <port>]`

Webpack compiles static front-end into `/client-dist`.

After compiling, `npm start` should fire up the web server.

## Docker

`npm run build:docker`

This compiles a docker immage labeled "react-express-starter:TEST". I recommend loading this into your CI process instead of doing it manually.
