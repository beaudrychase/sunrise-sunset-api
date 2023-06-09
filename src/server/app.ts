import express from 'express'
import { validationResult } from 'express-validator'
import { checkSchema } from 'express-validator/src/middlewares/schema'
import sunCalc from 'suncalc'

const app = express()

app.get('/', (req, res) => res.send('Hello world!'))

app.get(
  '/time',
  checkSchema({
    lat: {
      in: ['params', 'query'],
      isDecimal: {
        bail: true,
        errorMessage: 'Value must be decimal value',
      },
      custom: {
        options: value => {
          return -90 <= value && 90 >= value
        },
        errorMessage: 'Value must be valid latitude (-90 <= latitude <= 90)',
      },
    },
    long: {
      in: ['params', 'query'],
      isDecimal: {
        bail: true,
        errorMessage: 'Value must be decimal value',
      },
      custom: {
        options: value => {
          return -90 <= value && 90 >= value
        },
        errorMessage:
          'Value must be valid longitude (-180 <= longitude <= 180)',
      },
    },
    date: {
      optional: true,
      in: ['params', 'query'],
      isDate: {
        errorMessage: 'Value must be a date',
      },
      customSanitizer: {
        options: value => Date.parse(value),
      },
    },
  }),
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const lat = req.query.lat
    const long = req.query.long
    const date = req.query.date ?? Date.now()
    const resultBody = sunCalc.getTimes(date, lat, long)
    resultBody['now'] = new Date(Date.now())
    console.log(resultBody)
    res.status(200).json(resultBody)
  }
)
// required by everything else
export default app
// required by claudia
// module.exports = app
