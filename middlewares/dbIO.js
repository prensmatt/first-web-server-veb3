import { readFile, writeFile } from "node:fs/promises";

const readDbFile = async (req, res, next) => {
    const data = (await readFile("./db.json")).toString()
    req.students = JSON.parse(data);
    next()
}
export const writeDbFile = async (req, res) => {
    await writeFile("./db.json", req.data)
    res.send('successfully done!')
}
export default readDbFile;
