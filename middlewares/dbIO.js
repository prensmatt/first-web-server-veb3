import { readFile, writeFile } from "node:fs/promises";

const readDbFile = async (req, res, next) => {
    const data = (await readFile("./db.json")).toString()
    req.users = JSON.parse(data);
    next()
}
export const writeDbFile = async (req, res) => {
    await writeFile("./db.json", req.data)
    res.send('successfully added!')
}
export default readDbFile;
