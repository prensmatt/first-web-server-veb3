import express from 'express'
import userAgent from "express-useragent"
import readDbFile, { writeDbFile } from './middlewares/dbIO.js';

const app = express()
const port = 3000
app.use(userAgent.express());



app.use('/students', readDbFile);
app.get('/students',
    async (req, res) => res.send(req.students)
)

app.post("/students",
    async (req, res, next) => {
        console.log(req.students)
        req.students.push({
            "id":1,"name":"aliya","surname":"agayeva","schoolNo":"223","grade":"85"
        })
        req.data = JSON.stringify(req.students)
        next()
    },
    writeDbFile
)

app.put('/students/:id',
    async (req, res, next) => {
        const id = req.params.id;
        const bodyFromFe = {
            "id":1,"name":"kamila","surname":"agayeva","schoolNo":"223","grade":"85"

        }
        const newStudents = req.students.map((student) => {
            if (student.id == id) {
                return { ...student, ...bodyFromFe }
            }
            return student;
        })
        req.data = JSON.stringify(newStudents)
        next()
    },
    writeDbFile
)

app.delete("/students/:id",
    async (req, res, next) => {
        const id = req.params.id
        const newStudents = req.students.filter((student) => student.id != id)
        req.data = JSON.stringify(newStudents)
        next()
    },
    writeDbFile
)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
