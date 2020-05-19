const express = require("express")
const cors = require("cors")

const authRouter = require("./routes/auth")
const errorHandler = require("./error/errorHandler")

const server = express()
const PORT = process.env.PORT || 4000

server.use(express.json())
server.use(cors())

server.use("/auth", authRouter)

server.use(errorHandler)

server.listen(PORT, () => {
  console.log(`server up on port ${PORT}`)
})