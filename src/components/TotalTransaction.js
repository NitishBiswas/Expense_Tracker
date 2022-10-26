import React from 'react'

const TotalTransaction = ({transactionName, total}) => {
    return (
        <div className='d-flex justify-content-around bg-white'>
            <h4 className='m-1 fw-bold bg-white'>{transactionName} = </h4>
            {transactionName === 'Total Income' ? <h4 className='text-primary m-1 fw-bold bg-white'> {total} $</h4> : <h4 className='text-danger m-1 fw-bold bg-white'> {total} $</h4>}
        </div>
    )
}

export default TotalTransaction
