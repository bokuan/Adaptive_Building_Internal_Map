const express = require('express')
const app = express()
const port = 3014
//app.use(express.static('public', { 'Content-Type': 'text/javascript' }));
app.use(express.static(__dirname + '/public', { 'extensions': ['css'] }));

app.get('/', (req, res) => res.redirect('/home'))
app.get('/home', (req, res) => res.sendFile(__dirname + '/home.html'))
app.get('/kth/en', (req, res) => res.sendFile(__dirname + '/app.html'))
app.get('/kth/sv', (req, res) => res.sendFile(__dirname + '/appsv.html'))
app.get('/changelog', (req, res) => res.sendFile(__dirname + '/changelog.html'))
// app.get('/2.geojson', (req, res) => {
//     // build 2.geojson absolute path
//     const geojsonFilePath = path.join(__dirname, 'public', '2.geojson');
//     // use Express res.sendFile() to send file
//     res.sendFile(geojsonFilePath);
//   });
app.listen(port, () => console.log(`Example app listening on port ${ port }!`))
