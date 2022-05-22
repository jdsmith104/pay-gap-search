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
- Using Ionic + React
- Firebase (deployment)

## Planned dependencies
- TypeScript
- Eslint-airbnb
- Prettier

## Notes
- Considering using a Trie (because I know it as a good string search data structure). On loading the page, the trie would be filled with the data)
- Considering using a simple match words containing - will be much slower potentially (worst case number of words * average word length)
