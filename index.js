import { ApolloServer, UserInputError ,gql } from "apollo-server"; 
import {v1 as uuid}from 'uuid'

const pesons = [
    {name: "Midu",
    phone: "034-1234567",
    street: "Calle Frontend",
    city: "Barcelona",
    id:"3d594650-3436-11e9-bc57-8b80ba54c431"
    },

    {name: "Youseff",
    phone: "044-123456",
    street: "Avenida Fullstack",
    city: "Mataro",
    id:"3d599470-3436-11e9-bc57-8b80ba54c431"
    },

    {name: "Itzi",
    street: "Pasaje Testing",
    city: "Ibiza",
    id:"3d599471-3436-11e9-bc57-8b80ba54c431"
    },
]

// description of data:

const typeDefs = gql`
    type Address {
        street: String
        city: String
    }
    type Person{
        name: String!
        phone: String
        street: String!
        city: String!
        address: Address!
        id: ID!
    }

    type Query{
        pesonCount: Int!
        allPersons: [Person]!
        findPerson(name:String!): Person
    }


    type Mutation{
        addPerson(
            name: String!
            phone: String
            street: String!
            city: String!
        ): Person
    }
    `

    const resolvers ={
        Query: {
            pesonCount:() => pesons.length,
            allPersons:() => pesons,
            findPerson: (root, args)=>{
                const {name} = args
                return pesons.find(person => person.name === name)
            }
        },
        Mutation: {
           addPerson: (root, args) => {
            if(person.find(p => p.name === args.name)){
                throw new UserInputError('Name must be unique',{
                    invalidArgs: args.name
                } )
            }
           }
        },
        Person: {
            address: (root) => {
                return {
                    street: root.street,
                    city: root.city
                }
            }
        }
    }

    const server = new ApolloServer({
        typeDefs,
        resolvers
    })

    server.listen().then(({ url }) => {
        console.log(`Server ready at ${url}`)
    })