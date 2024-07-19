import express from 'express'
import cors from 'cors'
const app = express()
import cookieParser from 'cookie-parser'

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({extended: true, limit: '16kb'}))
app.use(express.static('Public'))
app.use(cookieParser())
app.get('/', (req, res) => {
    res.send('working')
})

// import routes

import userRoute from './Router/routes.js'

import postRouter from './Router/posts.routes.js'

app.use('/api/v2/users', userRoute)

app.use('/api/v2/post', postRouter)
 
 
export{app}   