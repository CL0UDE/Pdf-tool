const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const mergePdfs = require("./merger")

app.use("/static",express.static("public"))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"templates/index.html"))
})

app.post('/merge', upload.array('pdf',8), async (req, res, next)=> {
    console.log(req.files)
    let d = await mergePdfs(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path))
    res.redirect(`http://localhost:3000/static/${d}.pdf`)
    //res.send({data: req.files})
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost${port}`)
})