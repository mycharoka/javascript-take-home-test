const {Pool} = require('pg')

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
})

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error(`Database Error: ${err}`)
  }
  console.info(`Database ${process.env.DB_NAME} connected`)
})

function cleanup () {
  pool.end(() => {
    console.info('pool has ended')
  })
}

module.exports = {
  pool,
  cleanup
}