import express from 'express'
import userAgent from "express-useragent"
import readDbFile, { writeDbFile } from './middlewares/dbIO.js';

const app = express()
const port = 3000
app.use(userAgent.express());

// create read update delete -> db (file)
// post, get, put/patch, delete -> verb


app.use('/users', readDbFile);
app.get('/users',
    async (req, res) => res.send(req.users)
)

app.post("/users",
    async (req, res, next) => {
        req.users.push({
            "name": "ali2",
            "age": 14,
            "email": "2elinemet.isiyev@mail.ru"
        })
        req.data = JSON.stringify(req.users)
        next()
    },
    writeDbFile
)

app.put('/users/:id',
    async (req, res, next) => {
        const id = req.params.id;
        const bodyFromFe = {
            "name": "alinemet"
        }
        const newUsers = req.users.map((user) => {
            if (user.id == id) {
                return { ...user, ...bodyFromFe }
            }
            return user;
        })
        req.data = JSON.stringify(newUsers)
        next()
    },
    writeDbFile
)

app.delete("/users/:id",
    async (req, res, next) => {
        const id = req.params.id
        const newUsers = req.users.filter((user) => user.id != id)
        req.data = JSON.stringify(newUsers)
        next()
    },
    writeDbFile
)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
