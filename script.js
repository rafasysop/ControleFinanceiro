const ulContainer = document.querySelector('#transactions');
const totalContainer = document.querySelector('#balance');
const receitasContainer = document.querySelector('#money-plus');
const despesasContainer = document.querySelector('#money-minus');


const dummyTransactions = [
    { id: 1, name: 'Bolo de Brigadeiro', amaunt: -20 },
    { id: 2, name: 'Salário', amaunt: 300 },
    { id: 3, name: 'Torta de Frango', amaunt: -10.29 },
    { id: 4, name: 'Violão', amaunt: 150 }
];

const addTransactionsIntoDOM = transaction => {
    const operator = transaction.amaunt < 0 ? '-' : '+';
    const CSSClass = transaction.amaunt < 0 ? 'minus' : 'plus';
    const amauntWhithoutOperator = Math.abs(transaction.amaunt);
    const li = document.createElement('li');
    li.innerHTML = `
    ${transaction.name} <span> ${operator} R$ ${amauntWhithoutOperator.toFixed(2).split('.').join(',')}</span><button class="delete-btn">x</button>
    `
    li.classList.add(CSSClass);
    ulContainer.prepend(li);
};

const updateBalanceValues = () => {
    const total = dummyTransactions
        .reduce((acc, value) => acc + value.amaunt, 0).toFixed(2);
    totalContainer.textContent = `RS ${total.split('.').join(',')}`
    const receitas = dummyTransactions
        .filter(values => values.amaunt > 0)
        .reduce((acc, value) => acc + value.amaunt, 0).toFixed(2);
    receitasContainer.textContent = `RS ${receitas.split('.').join(',')}`;
    const despesas = Math.abs(dummyTransactions
        .filter(values => values.amaunt < 0)
        .reduce((acc, value) => acc + value.amaunt, 0));
    despesasContainer.textContent = ` - RS ${despesas.toFixed(2).split('.').join(',')}`;   
}



const init = () => {
    dummyTransactions.forEach(addTransactionsIntoDOM);
    updateBalanceValues();
};

init();
