import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

const YearDropDown = ({ year, onChangeYear }) => {
    return (
        <Dropdown className='mx-2 bg-white'>
            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="success">
                {year === null ? 'Year' : year}
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
                <Dropdown.Item onClick={() => onChangeYear(2022)} className={year === 2022 ? 'active' : null}>2022</Dropdown.Item>
                <Dropdown.Item onClick={() => onChangeYear(2023)} className={year === 2023 ? 'active' : null}>2023</Dropdown.Item>
                <Dropdown.Item onClick={() => onChangeYear(2024)} className={year === 2024 ? 'active' : null}>2024</Dropdown.Item>
                <Dropdown.Item onClick={() => onChangeYear(2025)} className={year === 2025 ? 'active' : null}>2025</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default YearDropDown
