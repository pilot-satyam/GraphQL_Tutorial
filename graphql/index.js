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
    },
    Game:{
        reviews(parent){
          return _db.reviews.filter((r)=>r.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent){
          return _db.reviews.filter((r)=>r.author_id === parent.id)
        }
    },
    Review: {
        author(parent){
            // using find here because we want single author for a review
            return _db.authors.find((a)=>a.id === parent.author_id)
        },
        game(parent){
            // using find here because we want single author for a review
            return _db.games.find((g)=>g.id === parent.game_id)
        }
    },

    Mutation: {
        deleteGame(_,args){
            _db.games = _db.games.filter((g) => g.id !== args.id)
            return _db.games
        },
        addGame(_,args){
            let game = {
                // accessing the game variable from schema
                ...args.game,
                id: Math.floor(Math.random()*10000).toString()
            }
            _db.games.push(game)
            // returning from schema since we have sprcified that game will be returned
            return game 
        },
        updateGame(_,args){
            _db.games = _db.games.map((g)=>{
                if(g.id === args.id){
                    return {
                        ...g,...args.edits
                    }
                }
                return g
            })

            return _db.games.find((g)=>g.id === args.id)
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