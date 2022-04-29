/* eslint-disable no-console */

import { app } from './app'
import { connect } from './config/database'

const port = process.env.PORT || 8000

connect()
    .then((resp) => console.log(resp))
    .catch((err) => console.log(err))

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
