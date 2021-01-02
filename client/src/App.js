import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Landing from './screens/Landing'
import List from './screens/List'
import NotFound from './screens/NotFound'

const App = () => {
  return (
    <Router>
      <Header />

      <Switch>
        <Route exact path='/' component={Landing} />

        <Route path='/list/:id' component={List} />

        <Route>
          <Container>
            <NotFound />
          </Container>
        </Route>
      </Switch>
    </Router>
  )
}

export default App
