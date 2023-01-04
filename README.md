# Fireworks Microsite

Fireworks uses Eleventy and Webpack.

## Install

Run `npm install`

## Content and Meta

Site Meta and site content are in ./src/_data/paged.json and in ./src/_data/home.json
Data for a template is contained in a json property, eg content for the content template is in the content property.


## Images

You can run `node webp.mjs` to create Webp images. This will also run in the build process.

## Running the dev server

Run `npm run serve`

## Build 

Run `npm run build`
This will build to the _site folder