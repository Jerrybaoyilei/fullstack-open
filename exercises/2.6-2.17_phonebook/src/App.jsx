import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import AddNew from './components/AddNew'
import Number from './components/Number'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('John Appleseed')
  const [newNumber, setNewNumber] = useState('123-456-7890')
  const [searchKey, setSearchKey] = useState('')

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addNewPerson = (event) => {
    event.preventDefault()
    if (persons.findIndex(person => person.name === newName) !== -1) {
      alert(`Person with name ${newName} is already added to phonebook`)

    }
    else if (persons.findIndex(person => person.number === newNumber) !== -1) {
      alert(`Person with number ${newNumber} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      axios.post("http://localhost:3001/persons", newPerson).then(response => {
        setPersons(persons.concat(response.data))
      })

    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchKey = (event) => {
    setSearchKey(event.target.value)

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchKey={searchKey} handleSearchKey={handleSearchKey}></Filter>
      <h2>Add A New</h2>
      <AddNew newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addNewPerson={addNewPerson}></AddNew>
      <h2>Numbers</h2>
      <Number persons={persons} searchKey={searchKey}></Number>
    </div>
  )
}

export default App