import { ApolloServer } from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone"
import { typeDefs } from "./schema.js"
import _db from "./_db.js";

const resolvers = {
    //this Query will be exactly named as in type Query
    Query:{
        games(){
           return _db.games //we are returning back the array of games from db
        },
        reviews(){
           return _db.reviews
        },
        authors(){
            return _db.authors
        },
        review(_,args){
            return _db.reviews.find((review)=>review.id === args.id) 
        },
        game(_,args){
            return _db.games.find((game)=>game.id === args.id)
        },
        author(_,args){
            return _db.authors.find((author)=>author.id === args.id)
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const{url} = await startStandaloneServer(server,{
    listen:{
        port:4000
    }
})
console.log(`Server started on port:${url}`);