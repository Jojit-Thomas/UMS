import { createClient } from "redis";


export const connectRedis = ()=>{
  const client = createClient({socket : {
    port: 6379,
    host : "127.0.0.1"
  }});
  (async () => await client.connect())()

  client.on("connect", () => {
    console.log("Client connnected to redis...")
  })
  
  client.on("ready", () => {
    console.log("Client connnected to redis and ready to use...")
  }) 
  
  client.on("error", (err) => {
    console.log("``` Redis Error : ", err.message, "```")
  })
  
  client.on("end", () => {
    console.log("Client discconected from redis!!!")
  })
  return client
}



// import { createClient } from "redis";

// const state = {
//   client: null
// }

// export const connectRedis = ()=>{
//   state.client = createClient({socket : {
//     port: 6379,
//     host : "127.0.0.1"
//   }});
//   (async () => await state.client.connect())()

//   state.client.on("connect", () => {
//     console.log("Client connnected to redis...")
//   })
  
//   state.client.on("ready", () => {
//     console.log("Client connnected to redis and ready to use...")
//   }) 
  
//   state.client.on("error", (err) => {
//     console.log("``` Redis Error : ", err.message, "```")
//   })
  
//   state.client.on("end", () => {
//     console.log("Client discconected from redis!!!")
//   })
//   // return client
// }

// export const getClient = () => {
//   if(!state.client) throw new Error("Error with redis")
//   return state.client
// }