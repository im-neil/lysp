import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'

const Child = ({ child }) => {
  const displayDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  let fundList = null
  if (child.funds) {
    fundList = child.funds.map((fund) => (
      <ListGroup.Item
        key={fund._id}
      >{`${fund.name}: $${fund.balance}`}</ListGroup.Item>
    ))
  }

  let deposits = null
  if (child.recentDeposits) {
    deposits = child.recentDeposits.map((deposit) => (
      <ListGroup.Item key={deposit._id}>
        {displayDate(deposit.date) + ':   '}
        <span className={'text-success'}>{deposit.action}</span>
      </ListGroup.Item>
    ))
  }

  let withdrawals = null
  if (child.recentWithdrawals) {
    withdrawals = child.recentWithdrawals.map((withdrawal) => (
      <ListGroup.Item key={withdrawal._id}>
        {displayDate(withdrawal.date) + ':   '}
        <span className={'text-danger'}>{withdrawal.action}</span>
      </ListGroup.Item>
    ))
  }

  return (
    <Card>
      <Card.Header>
        {child.avatar && (
          <Card.Img
            variant='top'
            className='avatar'
            src={`/avatars/${child.avatar}`}
          />
        )}

        <div style={{ height: '100%', padding: '1.6rem 0' }}>
          <h4>{child.name}</h4>
        </div>
      </Card.Header>

      <ListGroup variant='flush'>{fundList}</ListGroup>

      <Card.Body className='borderBottom'>
        <Card.Title>Recent Deposits</Card.Title>
        <ListGroup variant='flush'>{deposits}</ListGroup>
      </Card.Body>

      <Card.Body>
        <Card.Title>Recent Withdrawals</Card.Title>
        <ListGroup variant='flush'>{withdrawals}</ListGroup>
      </Card.Body>
      <Card.Footer>
        <small className='text-muted'>
          Last updated {displayDate(child.updatedAt)}
        </small>
      </Card.Footer>
    </Card>
  )
}

export default Child
