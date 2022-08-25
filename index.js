const express = require('express')
const cors = require('cors')
const app = express()
const logger = require('./loggerMiddleware')

app.use(cors())
app.use(express.json())
app.use(logger)

let notes = [
  {
    id: 1,
    content: 'Test 1 ',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Test 2 ',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 3,
    content: 'Test 3 ',
    date: '2019-05-30T17:30:31.098Z',
    important: false
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find((note) => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter((note) => note.id !== id)
  response.status(204).end()
})

app.put('/api/notes/:id', (request, response) => {
  response.status(200).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  const ids = notes.map((note) => note.id)
  const nextId = Math.max(...ids) + 1
  const newNote = {
    id: nextId,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }
  notes = [...notes, newNote]
  // notes = notes.concat(newNote)
  console.log(notes)
  response.json(newNote)
})

app.use((request, response) => {
  response.status(404).json({
    error: 'Not found'
  })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
