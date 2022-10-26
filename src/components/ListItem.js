import React from 'react'
import { FiEdit } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';

const ListItem = ({ data, transaction, editTransactionItem, deleteTransaction }) => {
    
    return (
        <div className='bg-white'>
            {data.map((item, index) => {
            return (
                <div className='d-flex justify-content-between bg-white' key={index}>
                    <div className='bg-white'>
                        <h5 className='fw-bold text-dark bg-white'>{item.description}</h5>
                    </div>
                    <div className='bg-white d-flex'>
                        <div className='bg-white'>
                        {transaction === 'Income' ? <h5 className='text-primary fw-bold bg-white'>{item.amount} $</h5> : <h5 className='text-danger fw-bold bg-white'>{item.amount} $</h5>}
                        </div>
                        <div className='bg-white'>
                            <FiEdit className='bg-white mx-3 edit' color='green' onClick={() => editTransactionItem(item)} />
                            <FaTrash className='bg-white delete' color='tomato' onClick={() => deleteTransaction(item.id)} />
                        </div>
                    </div>
                </div>
            )
        })}
        </div>
  )
}

export default ListItem