export const typeDefs= `#graphql
type Game{
    id: ID!
    title : String!
    platform : [String!]!
    # every game should have reviews
    reviews : [Review!] 
}

type Review{
    id: ID!
    rating: Int!
    content: String!
    # every review should have author and what game is being reviewd and it will not be an array,cuz review will be by one author
    author: Author!
    game: Game!
}

type Author{
    id:ID!
    name:String!
    verified:Boolean!
    reviews: [Review!]
}

type Query{
    reviews : [Review]
    # If the data to be fetched from specific ID
    review(id:ID!): Review
    games : [Game]
    game(id:ID!): Game
    authors : [Author]
    author(id:ID!): Author
}

type Mutation{
    addGame(game: AddGameInput!): Game
    deleteGame(id: ID!): [Game]
    # we are not using AddGameInput here because platform is not mandatory as user might want to update only a single record
    updateGame(id: ID!,edits: EditGameInput!): Game
}

input AddGameInput{
    title: String!,
    platform: [String!]!
}

input EditGameInput{
    title: String!,
    platform: [String!]
}
`