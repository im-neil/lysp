import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Navbar bg='dark' variant='dark' className='fixed-bottom'>
        <Container>
          <Row className='wx-100'>
            <Col className='text-center py-3'>
              <Nav>
                <LinkContainer to='/' exact>
                  <Nav.Link>
                    <i className='glyphicon glyphicon-home'></i> Home
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Col>
            <Col className='text-center py-3'>
              <Nav>
                <LinkContainer to='/account/1'>
                  <Nav.Link>
                    <i className='glyphicon glyphicon-off'></i> Account
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Col>
            <Col className='text-center py-3'>
              <Nav>
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='glyphicon glyphicon-user'></i> Sign in
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </footer>
  )
}

export default Footer
