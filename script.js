let detail;
let amount;

let dispArr;

// holds all transactions
let transactions = [];

// get values from inputs
function getInputValues() {
  detail = document.getElementById("detail").value;
  amount = Number(document.getElementById("amount").value);
}

// validate inputs
function isValid() {
  if (!detail || !amount) {
    alert("Detail and Amount are both required");
    return false;
  }
  return true;
}

// populate the table
function displayTable() {
  const tableBody = document.getElementById("tableBody");

  tableBody.innerHTML = "";
  if(transactions != null)
  {
    for (let i = 0; i < transactions.length; i++) {
      tableBody.innerHTML += `
          <tr>
                  <th>${transactions[i].type}</th>
                  <th>${transactions[i].detail}</th>
                  <th>${transactions[i].amount}</th>
              </tr>
          `;
    }
  }
  else
  {
    retrieveLocal();
    if(dispArr != null)
    {
      for (let i = 0; i < dispArr.length; i++) {
        tableBody.innerHTML += `
            <tr>
                    <th>${dispArr[i].type}</th>
                    <th>${dispArr[i].detail}</th>
                    <th>${dispArr[i].amount}</th>
                </tr>
            `;
      }
    }
    else
    {
      alert("Display array retrieved nothing");
    }
  }
}

function getResults () {
    const incomeTotal = document.getElementById("incomeTotal");
    const expenseTotal = document.getElementById("expenseTotal");
    const amountTotal = document.getElementById("amountTotal");

    let income = 0;
    let expense = 0;
    let amount = 0;

   for (let i = 0; i < transactions.length; i++) {

    if (transactions[i].type === "Income") {
        income += transactions[i].amount;
    }

    if (transactions[i].type === "Expense") {
        expense += transactions[i].amount;
    }
       
   }

   incomeTotal.innerHTML = income;
   expenseTotal.innerHTML = expense;
   amountTotal.innerHTML = income - expense;
   sendLocal();
}


function calc(type) {
  getInputValues();

  if (!isValid()) return;

  
  transactions.push({ type, detail, amount })
  getResults();
  displayTable();
  clearInoutsFields();
}

function clearInoutsFields()
{
  let inputs = document.querySelectorAll("input");
  inputs.forEach((input) => (input.value = ""));
}

function sendLocal()
{
  localStorage.setItem('detail', JSON.stringify(transactions));
  localStorage.setItem('amountTotal', amountTotal.innerHTML);
  localStorage.setItem('incomeTotal', incomeTotal.innerHTML);
  localStorage.setItem('expenseTotal', expenseTotal.innerHTML);
}

function retrieveLocal()
{
  dispArr = JSON.parse(localStorage.getItem('detail'));
  //return 1;
}
