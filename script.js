const ulContainer = document.querySelector('#transactions');
const totalContainer = document.querySelector('#balance');
const receitasContainer = document.querySelector('#money-plus');
const despesasContainer = document.querySelector('#money-minus');
const form = document.querySelector('#form');
const inputTransactionsName = document.querySelector('#text');
const inputTransactionsAmount = document.querySelector('#amount');


// let transactionsStorage = [
//     { id: 1, name: 'Salário', amount: 3000 }
// ];

const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'));
let transactionsStorage = localStorage
    .getItem('transactions') !== null ? localStorageTransactions : [];


const removeTransaction = (event) => {
    const idTrans = +event.target.id;
    transactionsStorage = transactionsStorage.filter(values =>
        values.id !== idTrans);
    console.log(transactionsStorage);
    ulContainer.innerHTML = '';
    init();
    updateLocalStorage();
}

const addTransactionsIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+';
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus';
    const amountWhithoutOperator = Math.abs(transaction.amount);
    const li = document.createElement('li');
    li.innerHTML = `
    ${transaction.name} <span> ${operator} R$ ${amountWhithoutOperator
    .toFixed(2).split('.').join(',')}</span>`;
    // <button class="delete-btn">x</button>
    li.classList.add(CSSClass);
    const button = document.createElement('button');
    button.classList.add('delete-btn')
    button.innerHTML = 'x';
    button.id = transaction.id;
    button.addEventListener('click', removeTransaction);
    li.appendChild(button);
    ulContainer.prepend(li);
};

const updateBalanceValues = () => {
    const total = transactionsStorage
        .reduce((acc, value) => acc + value.amount, 0);
    totalContainer.textContent = `R$ ${total.toFixed(2).split('.').join(',')}`
    const receitas = transactionsStorage
        .filter(values => values.amount > 0)
        .reduce((acc, value) => acc + value.amount, 0);
    receitasContainer.textContent = `R$ ${receitas.toFixed(2).split('.').join(',')}`;
    const despesas = Math.abs(transactionsStorage
        .filter(values => values.amount < 0)
        .reduce((acc, value) => acc + value.amount, 0));
    despesasContainer.textContent = `R$ ${despesas.toFixed(2).split('.').join(',')}`;   
}

const init = () => {
    transactionsStorage.forEach(addTransactionsIntoDOM);
    updateBalanceValues();
};

init();

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactionsStorage));
}

const gennerateID = () => Math.round(Math.random() * 1000);

form.addEventListener('submit', event => {
    event.preventDefault();
    const transactionName = inputTransactionsName.value.trim();
    const transactionAmount = inputTransactionsAmount.value.trim();
    if (transactionAmount === '' || transactionName === '') {
        alert('Por favor Preencha Tanto o Nome quanto o valor da Transação');
        return;
    }
    const idTransaction = gennerateID()
    const transaction = { id: idTransaction , name: transactionName, amount: +transactionAmount };
    transactionsStorage.push(transaction);
    ulContainer.innerHTML = ''
    inputTransactionsName.value = '';
    inputTransactionsAmount.value = '';
    init();
    updateLocalStorage();
});
