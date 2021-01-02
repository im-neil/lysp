import React, { useState } from 'react'
import { Navbar, Nav, Modal, Form, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import axios from 'axios'

const Header = () => {
  const [showModal, setShowModal] = useState(false)
  const handleCloseModal = () => setShowModal(false)
  const handleShowModal = () => setShowModal(true)
  const handleSubmitModal = async () => {
    setShowModal(false)
    //await addItem(title)
    const { data } = await axios.get(`/api/lysp/auth/${name}`)
    window.location.href = `/list/${data.id}`
  }

  const [name, setName] = useState()
  const handleNameInput = (event) => setName(event.target.value)

  return (
    <>
      <header>
        <Navbar bg='dark' variant='dark'>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img className='header-logo' src='/logo256.png' alt='' />
              Lysp
            </Navbar.Brand>
          </LinkContainer>
          <Nav className='ml-auto'>
            <Nav.Link onClick={handleShowModal}>
              <i className='glyphicon glyphicon-user'></i> Login
            </Nav.Link>
          </Nav>
        </Navbar>
      </header>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>What is your list called?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              type='text'
              placeholder='List name'
              onChange={handleNameInput}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant='primary' onClick={handleSubmitModal}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Header
