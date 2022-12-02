const transactionContainer = document.getElementsByClassName(
  "body__transaction-container"
);
const btnExpense = document.getElementsByClassName("body__tabs-btn-expense");
const btnIncome = document.getElementsByClassName("body__tabs-btn-income");
const btnAddExpense = document.getElementById("addExpense");
const btnAddIncome = document.getElementById("addIncome");
const closeButton = document.getElementsByClassName("body__btn-close");
const submitButton = document.getElementsByClassName("body__btn-submit");
const modal = document.getElementsByClassName("body__modal-container");
const btnOpenModal = document.getElementById("modalAdd");
const balanceDisplay = document.getElementById("balance");
let typeTransaction = "";
let balance = localStorage.getItem("balance") || 0;

btnOpenModal.addEventListener("click", openModal);
closeButton[0].addEventListener("click", closeModal);
submitButton[0].addEventListener("click", submitTransaction);
btnExpense[0].addEventListener("click", getExpenseList);
btnAddExpense.addEventListener("click", chooseTypeExpense);
btnAddIncome.addEventListener("click", chooseTypeIncome);
btnIncome[0].addEventListener("click", getIncomeList);

var text = document.createTextNode(balance);
balanceDisplay.appendChild(text);

let expenseList = JSON.parse(localStorage.getItem("expenseList")) || [];

let incomeList = JSON.parse(localStorage.getItem("incomeList")) || [];

function updateBalance() {
  balanceDisplay.innerHTML = "";
  var text = document.createTextNode(balance);
  balanceDisplay.appendChild(text);
}

function closeModal() {
  modal[0].style.display = "none";
}

function openModal() {
  modal[0].style.display = "block";
}

function chooseTypeExpense() {
  typeTransaction = "";
  btnAddIncome.classList.remove("body__tabs-btn-active");
  btnAddExpense.classList.add("body__tabs-btn-active");
  typeTransaction = "expense";
}

function chooseTypeIncome() {
  typeTransaction = "";
  btnAddIncome.classList.add("body__tabs-btn-active");
  btnAddExpense.classList.remove("body__tabs-btn-active");
  typeTransaction = "income";
}

function submitTransaction() {
  const inputTrans = document.getElementById("transName").value;
  const inputAmount = document.getElementById("amount").value;

  if (typeTransaction == "income") {
    incomeList.push({ name: inputTrans, price: inputAmount });
    balance = balance + parseInt(inputAmount);
    updateBalance();
    localStorage.setItem("balance", balance);
    localStorage.setItem("incomeList", JSON.stringify(incomeList));
    closeModal();
  }
  if (typeTransaction == "expense") {
    expenseList.push({ name: inputTrans, price: inputAmount });
    balance -= inputAmount;
    updateBalance();
    localStorage.setItem("balance", balance);
    localStorage.setItem("expenseList", JSON.stringify(expenseList));
    closeModal();
  }
}

function getExpenseList() {
  let html = "";
  btnIncome[0].classList.remove("body__tabs-btn-active");
  btnExpense[0].classList.add("body__tabs-btn-active");

  if (expenseList.length) {
    expenseList.forEach((exp) => {
      html += `
      <div class="body__transaction-list">
          <p>${exp.name}</p>
          <p style='color: red'>Rp -${exp.price}</p>
      </div>
      `;

      // balance = balance - exp.price;
    });
    // updateBalance()
  } else {
    html += `<p>Expense list is empty.</p>`;
  }

  transactionContainer[0].innerHTML = html;
}

function getIncomeList() {
  let html = "";
  btnExpense[0].classList.remove("body__tabs-btn-active");
  btnIncome[0].classList.add("body__tabs-btn-active");

  if (incomeList.length) {
    incomeList.forEach((exp) => {
      html += `
      <div class="body__transaction-list">
          <p>${exp.name}</p>
          <p style='color: green'>Rp ${exp.price}</p>
      </div>
      `;
    });
  } else {
    html += `<p>Income list is empty.</p>`;
  }

  transactionContainer[0].innerHTML = html;
}
