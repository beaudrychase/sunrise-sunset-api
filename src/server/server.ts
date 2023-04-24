import app from './app'

app.set('port', process.env.PORT || 3000)

const server = app.listen(app.get('port'), () => {
  console.log(
    'App is running on http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  )
})

export default server
