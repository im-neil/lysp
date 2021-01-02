import React, { useEffect, useState } from 'react'
import { Container, Button, Table, Modal, Form } from 'react-bootstrap'
import axios from 'axios'

const List = ({ match }) => {
  const id = match.params.id

  const addItem = async () => {
    try {
      const { data } = await axios.post(`/api/lysp/${id}`, { title: title })
      setItems(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const getAllItems = async () => {
    try {
      const { data } = await axios.get(`/api/lysp/${id}`)
      setItems(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const remList = (id) => async () => {
    try {
      const { data } = await axios.delete(`/api/lysp/${id}`)
      setItems(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const [showModal, setShowModal] = useState(false)
  const handleCloseModal = () => setShowModal(false)
  const handleShowModal = () => setShowModal(true)
  const handleSubmitModal = async () => {
    setShowModal(false)
    await addItem(title)
  }

  const [items, setItems] = useState([])
  const handleRemoveItem = async (logId) => {
    const warning = window.confirm('Are you sure?')
    if (warning) {
      const { data } = await axios.delete(`/api/lysp/${id}/${logId}`)
      setItems(data)
    }
  }

  const [title, setTitle] = useState()
  const handleTitleInput = (event) => setTitle(event.target.value)

  /* Sample Data */
  const remDays = (days) => {
    var someDate = new Date()
    someDate.setDate(someDate.getDate() - days)
    return someDate
  }

  var timeSince = function (date) {
    if (typeof date !== 'object') {
      date = new Date(date)
    }

    var seconds = Math.floor((new Date() - date) / 1000)
    var intervalType
    var interval = Math.floor(seconds / 31536000)
    if (interval >= 1) {
      intervalType = 'year'
    } else {
      interval = Math.floor(seconds / 2592000)
      if (interval >= 1) {
        intervalType = 'month'
      } else {
        interval = Math.floor(seconds / 86400)
        if (interval >= 1) {
          intervalType = 'day'
        } else {
          interval = 0
        }
      }
    }

    return interval
      ? interval > 1
        ? interval + ' ' + intervalType + 's ago'
        : interval + ' ' + intervalType + ' ago'
      : 'today'
  }

  useEffect(() => {
    const getItems = async () => await getAllItems()
    getItems()
  }, [])

  return (
    <Container>
      {/*childAccounts ? <Child child={childAccounts} /> : <NotFound />*/}
      <Button className='my-3' onClick={handleShowModal}>
        Add Item
      </Button>
      <Table striped bordered hover size={'sm'}>
        <tbody key='1'>
          {Array.isArray(items) &&
            items.map(({ title, date, _id }) => (
              <tr key={_id}>
                <td>
                  <Button
                    className='remove-btn mr-2'
                    color='danger'
                    size='sm'
                    onClick={() => handleRemoveItem(_id)}
                  >
                    &times;
                  </Button>
                  {title}
                </td>
                <td>{timeSince(date)}</td>
              </tr>
            ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>New List Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              type='text'
              placeholder='Item name'
              onChange={handleTitleInput}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSubmitModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default List
