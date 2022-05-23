# pay-gap-search

## Description

- Creating a search bar which autocompletes using data from https://gender-pay-gap.service.gov.uk/viewing/download
- Live firebase site https://pay-gap-search.web.app/home

## Design

- Data is formatted as a CSV - going to parse and convert it to JSON using a Python script
- Planning to make it a completely front-end application with Firebase deployment (not going to store the JSON in a database or use queries)
- Want to use a MVC pattern
  - Model: Data structure containing autocomplete data
  - View: Terminal with the data that is selected
  - Controller: Text input

### Logic ideas

- When searching persist the state of the search, to improve time complexity.

## Technologies

- Using Ionic + React front-end
- Firebase (deployment)

## Planned dependencies

- TypeScript
- Eslint-airbnb
- Prettier
- Firebase

## Notes

- SearchModel.ts is the model that has a Trie object. The Trie object is accessed to do searches and insertions.
- The Trie implements a pseudo-cache to allow instant repeat searches when page isn't reloaded
- Currently, only starts searching the Trie after two characters are entered on the search bar #1
