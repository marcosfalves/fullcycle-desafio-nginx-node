const express = require('express')
const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

const mysql = require('mysql')

async function executeQuery(sql) {
  const connection = mysql.createConnection(config);

  const results = await new Promise((resolve, reject) => {
    connection.query(sql, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })

  connection.end()
  return results
}

app.get('/', async (req, res) => {
  await executeQuery(`INSERT INTO people(name) values('Marcos')`)
  const peoples = await executeQuery('SELECT * FROM people');

  const html = `<h1>Full Cycle Rocks!</h1>\n
        <ul>
          ${peoples.map(p => `<li>${p.name}</li>`).join('')}
        </ul>`
  res.send(html)
})

app.listen(port, () => {
  console.log('Rodando na porta ' + port)
})