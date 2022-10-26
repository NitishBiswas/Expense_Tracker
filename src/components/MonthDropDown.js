import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

const MonthDropDown = ({month, onChangeMonth}) => {
  return (
    <Dropdown className='mx-2 bg-white'>
                  <Dropdown.Toggle id="dropdown-button-dark-example1" variant="warning">
                    {month === null ? 'Month' : month}
                  </Dropdown.Toggle>
                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item onClick={() => onChangeMonth('January')} className={month === 'January' ? 'active' : null}>January</Dropdown.Item>
                    <Dropdown.Item onClick={() => onChangeMonth('February')} className={month === 'February' ? 'active' : null}>February</Dropdown.Item>
                    <Dropdown.Item onClick={() => onChangeMonth('March')} className={month === 'March' ? 'active' : null}>March</Dropdown.Item>
                    <Dropdown.Item onClick={() => onChangeMonth('April')} className={month === 'April' ? 'active' : null}>April</Dropdown.Item>
                    <Dropdown.Item onClick={() => onChangeMonth('May')} className={month === 'May' ? 'active' : null}>May</Dropdown.Item>
                    <Dropdown.Item onClick={() => onChangeMonth('June')} className={month === 'June' ? 'active' : null}>June</Dropdown.Item>
                    <Dropdown.Item onClick={() => onChangeMonth('July')} className={month === 'July' ? 'active' : null}>July</Dropdown.Item>
                    <Dropdown.Item onClick={() => onChangeMonth('August')} className={month === 'August' ? 'active' : null}>August</Dropdown.Item>
                    <Dropdown.Item onClick={() => onChangeMonth('September')} className={month === 'September' ? 'active' : null}>September</Dropdown.Item>
                    <Dropdown.Item onClick={() => onChangeMonth('October')} className={month === 'October' ? 'active' : null}>October</Dropdown.Item>
                    <Dropdown.Item onClick={() => onChangeMonth('November')} className={month === 'November' ? 'active' : null}>November</Dropdown.Item>
                    <Dropdown.Item onClick={() => onChangeMonth('December')} className={month === 'December' ? 'active' : null}>December</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
  )
}

export default MonthDropDown
