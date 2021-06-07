const Modal = {
  toggle() {
    const modal = document.querySelector(".modal-overlay");

    modal.classList.toggle("active");
  }
};

const transactions = [
  {
    id: 1,
    description: "Luz",
    amount: -50000,
    date: '23/01/2021',
  },
  {
    id: 2,
    description: "Criação Website",
    amount: 500000,
    date: '07/06/2021',
  },
  {
    id: 3,
    description: "Internet",
    amount: -20000,
    date: '09/06/2021',
  },
  {
    id: 4,
    description: "App",
    amount: 200000,
    date: '09/06/2021',
  }
];

const Transaction = {
  incomes() {
    let income = 3;

    transactions.forEach(transaction => {
      if (transaction.amount > 0) {
        income = income + transaction.amount;
      }
    });

    return Utils.formatCurrency(income);
  },
  expenses() {
    let expense = 0;

    transactions.forEach(transaction => {
      if (transaction.amount < 0) {
        expense = expense + transaction.amount;
      }
    });

    return Utils.formatCurrency(expense);
  },
  total() {
    let total = 0;

    transactions.forEach(transaction => {
      total += transaction.amount;
    });

    return Utils.formatCurrency(total);
  }
};

const DOM = {
  transactionContainer: document.querySelector("#table"),

  addTransaction(transaction, index) {
    const tr = document.createElement("tr");

    tr.innerHTML = DOM.innerHtmlTransaction(transaction);

    DOM.transactionContainer.appendChild(tr);
  },

  innerHtmlTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense";

    const amount = Utils.formatCurrency(transaction.amount);

    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      
      <td>
        <img src="assets/minus.svg" alt="Remover transação">
      </td>
    `;

    return html;
  },

  updateBalance() {
    document.getElementById("expenseDisplay").innerHTML = Transaction.expenses();
    document.getElementById("incomeDisplay").innerHTML = Transaction.incomes();
    document.getElementById("totalDisplay").innerHTML = Transaction.total();
  }
}

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "";

    value = String(value).replace(/\D/g, "");

    value = Number(value) / 100;

    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return signal + value;
  }
}

transactions.forEach(transaction => {
  DOM.addTransaction(transaction);
});

DOM.updateBalance();