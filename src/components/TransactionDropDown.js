import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

const TransactionDropDown = ({transaction, onChangeTransaction}) => {
  return (
    <Dropdown className='mx-2 bg-white'>
            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="primary">
                {transaction === null ? 'Transaction' : transaction}
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
                <Dropdown.Item onClick={() => onChangeTransaction('Income')} className={transaction === 'Income' ? 'active' : null}>Income</Dropdown.Item>
                <Dropdown.Item onClick={() => onChangeTransaction('Expense')} className={transaction === 'Expense' ? 'active' : null}>Expense</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
  )
}

export default TransactionDropDown
