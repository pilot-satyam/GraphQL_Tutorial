# GraphQL_Tutorial

Example Queries and mutation calls:

You can run them eiter through postman or the apollo server which in this case is hosted on port 4000

Below are the nested queries eg. for different resources 

1) Nested Game and Review resource

query GameQuery($id: ID!){
  game(id: $id) {
    title,
    reviews {
      rating
      content
    }
  }

2) Nested Query check for Review 

query ReviewCheck($id: ID!){
  review(id: $id) {
    content,
    author {
      name
    },
    game {
      title,
      platform
    }
  }
}

Note: In order to make the query work for a single game with ID pass the Id of the game in variable's section

Eg:

{
  "id" : "2",
}

Below are the mutation calls examples

1) Deleting a particular record 

mutation deleteGame($id: ID!){
  deleteGame(id: $id) {
    id,
    title,
    platform
  }
}

2) For Adding a new value

mutation AddGame($game: AddGameInput!){
  addGame(game: $game) {
    id,
    title,
    platform
}
}

Note: For adding new values following data must be passed in variables section

{
  "game": {
    "title" : "Test adding",
    "platform": ["switch","ps5"]
  }
}

3) For Updating the Game follow the below syntax 

mutation EditGame($edits: EditGameInput!,$id:ID!){
  updateGame(edits: $edits,id: $id) {
    title,
    platform
}
}

And Pass this in the variables section or any other suitable value

{
  "edits": {
    "title": "NEW Title",
    "platform" : "ps4"
  },
  "id" : "2"
}