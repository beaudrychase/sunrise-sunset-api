const express = require('express')
const sunCalc = require('suncalc')
const app = express()
const port = 3000

app.get('/time', (req, res) => {
  var lat = req.query.lat
  var long = req.query.long
  var date = req.query.date
  res.json(sunCalc.getTimes(date?? Date.now(), lat, long))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})