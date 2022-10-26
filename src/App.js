import { useEffect, useState } from 'react';
import './App.css';
import BarChartComponent from './components/BarChartComponent';
import ListItem from './components/ListItem';
import YearDropDown from './components/YearDropDown';
import MonthDropDown from './components/MonthDropDown';
import TransactionDropDown from './components/TransactionDropDown';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Localbase from 'localbase';
import TotalTransaction from './components/TotalTransaction';
import { uid } from 'uid';

function App() {
  let db = new Localbase('db')
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const date = new Date();

  const [month, setMonth] = useState(monthNames[date.getMonth()]);
  const [year, setYear] = useState(date.getFullYear());
  const [totalIncome, setTotalIncome] = useState(0)
  const [totalExpense, setTotalExpense] = useState(0);

  const [transactionMonth, setTransactionMonth] = useState(null);
  const [transactionYear, setTransactionYear] = useState(null);
  const [transaction, setTransaction] = useState(null);

  const [incomeData, setIncomeData] = useState([])
  const [expenseData, setExpenseData] = useState([])

  const [edit, setEdit] = useState(false);
  const [id, setId] = useState('');

  const getData = () => {
    db.collection('database').get().then(users => {
      const incomeDatabase = users.filter(user => user.transaction === 'Income')

      let incomeSum = 0;
      const incomeData = incomeDatabase.filter(item => {
        return item.year === year && item.month === month;
      })
      incomeData.forEach(user => {
        incomeSum = parseInt(incomeSum) + parseInt(user.amount)
      })
      setTotalIncome(incomeSum);
      setIncomeData(incomeData);

      const expenseDatabase = users.filter(user => user.transaction === 'Expense')
      let expenseSum = 0;
      const expenseData = expenseDatabase.filter(item => {
        return item.year === year && item.month === month;
      })
      expenseData.forEach(user => {
        expenseSum = parseInt(expenseSum) + parseInt(user.amount)
      })
      setTotalExpense(expenseSum);
      setExpenseData(expenseData);
    })
  };

  useEffect(() => {
    getData();
  }, [transaction, year, month, getData]);


  const bardata = [
    {
      name: 'Income',
      value: totalIncome,
    },
    {
      name: 'Expense',
      value: totalExpense,
    }
  ]

  const onChangeYear = (y) => {
    setYear(y);
  }

  const onChangeMonth = (m) => {
    setMonth(m);
  }

  const onChangeTransaction = (t) => {
    setTransaction(t);
  }
  const onChangeTransactionYear = (y) => {
    setTransactionYear(y);
  }

  const onChangeTransactionMonth = (m) => {
    setTransactionMonth(m);
  }

  const makeTransaction = () => {
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    if (amount > 0 && description !== "" && transaction !== null && transactionMonth !== null && transactionYear !== null) {
      if (edit) {
        db.collection('database').doc({ id }).update({
          year: transactionYear,
          month: transactionMonth,
          amount: amount,
          description: description,
          transaction: transaction,
        })
        getData();
        Swal.fire({
          type: 'success',
          title: '✅ Transaction successfully updated!',
          showConfirmButton: false,
          timer: 3000,
          color: 'green',
          position: 'top-end',
        })
      } else {
        db.collection('database').add({
          year: transactionYear,
          month: transactionMonth,
          amount: amount,
          description: description,
          transaction: transaction,
          id: uid(16),
        })
        Swal.fire({
          type: 'success',
          title: '✅ Transaction successfully added!',
          showConfirmButton: false,
          timer: 3000,
          color: 'green',
          position: 'top-end',
        })
      }
      setEdit(false);
      document.getElementById('amount').value = '';
      document.getElementById('description').value = '';
      setMonth(transactionMonth);
      setYear(transactionYear);
      setTransaction(null);
      setTransactionYear(null);
      setTransactionMonth(null);
    } else {
      Swal.fire({
        position: 'top-end',
        type: 'error',
        title: '❌ Please enter all required information!',
        showConfirmButton: false,
        timer: 3000,
        color: 'tomato',
      })
    }
  }

  const editTransactionItem = (item) => {
    setTransactionMonth(item.month);
    setTransactionYear(item.year);
    setTransaction(item.transaction);
    document.getElementById('amount').value = item.amount;
    document.getElementById('description').value = item.description;
    setId(item.id);
    setEdit(true);
  }

  const deleteTransaction = (id) => {
    db.collection('database').doc({ id }).delete();
    setId(id);
    getData();
    Swal.fire({
      type: 'success',
      title: '✅ Transaction successfully deleted!',
      showConfirmButton: false,
      timer: 3000,
      color: 'green',
      position: 'top-end',
    })
  };

  return (
    <div className="App">
      <div className="container" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <h1 className='py-2 bg-dark text-white my-4 rounded shadow'>Expense Tracker</h1>
      </div>
      <div className="container border rounded my-3 shadow-lg bg-white">
        <div className="row mt-3 bg-white">
          <div className="col-sm-12 col-md-12 col-lg mt-3 bg-white">
            <h1 className='rounded fw-bold py-1 bg-info shadow'>Add Transaction</h1>
            <div className='border mt-3 bg-white'>
              <div className='d-flex justify-content-around mt-3 bg-white'>
                <div className='bg-white'>
                  <TransactionDropDown transaction={transaction} onChangeTransaction={onChangeTransaction} />
                </div>
                <div className='bg-white'>
                  <YearDropDown year={transactionYear} onChangeYear={onChangeTransactionYear} />
                </div>
                <div className='bg-white'>
                  <MonthDropDown month={transactionMonth} onChangeMonth={onChangeTransactionMonth} />
                </div>
              </div>
              <div className='row m-2 bg-white'>
                <div className='col-sm-12 col-md-12 col-lg my-2 bg-white'>
                  <div className='d-flex justify-content-start bg-white'>
                    <h5 className='text-left bg-white'>Amount</h5>
                  </div>
                  <input type="number" className="form-control" id="amount" placeholder="$ 20000"></input>
                </div>
                <div className='col-sm-12 col-md-12 col-lg my-2 bg-white'>
                  <div className='d-flex justify-content-start bg-white'>
                    <h5 className='text-left bg-white'>Description</h5>
                  </div>
                  <input type="text" className="form-control" id="description" placeholder="Salary"></input>
                </div>
              </div>
            </div>
            <div className='my-4 bg-white'>
              <Button onClick={makeTransaction} className='w-50 text-white shadow' style={{ backgroundColor: '#3c1053' }}>{edit ? 'Update Transaction' : 'Make Transaction'}</Button>
            </div>
            <div className='row bg-white mx-2'>
              <hr />
              <div className="col-sm-12 col-md-12 col-lg-12 bg-white">
                <ListItem data={incomeData} transaction="Income" editTransactionItem={editTransactionItem} deleteTransaction={deleteTransaction} />
                <ListItem data={expenseData} transaction="Expense" editTransactionItem={editTransactionItem} deleteTransaction={deleteTransaction} />
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg mt-3 bg-white">
            <h1 className='rounded fw-bold py-1 bg-info shadow'>History</h1>
            <div className='d-flex justify-content-between mt-3 bg-white'>
              <div className='bg-white'>
                <h3 className='fw-bold bg-white'>Filter By</h3>
              </div>
              <div className='d-flex bg-white'>
                <YearDropDown year={year} onChangeYear={onChangeYear} />

                <MonthDropDown month={month} onChangeMonth={onChangeMonth} />
              </div>
            </div>
            <hr />
            <div className="row border p-3 bg-white" style={{ marginLeft: 0, marginRight: 0 }}>
              <div className="col-sm-12 col-md-12 col-lg pt-2 d-flex flex-column justify-content-between bg-white">
                <TotalTransaction transactionName="Total Income" total={totalIncome} />
                <TotalTransaction transactionName="Total Expense" total={totalExpense} />
              </div>
            </div>
            <div className='row bg-white' style={{ marginLeft: 0, marginRight: 0 }}>
              <h2 className='fw-bold my-2 bg-white'>{month} - {year}</h2>
              <hr />
              <div className="col-sm-12 col-md-12 col-lg-12 bg-white">
                <div className="d-flex flex-column align-items-center bg-white">
                  <BarChartComponent data={bardata} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
