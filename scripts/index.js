const Modal = {
  toggle() {
    const modal = document.querySelector(".modal-overlay");

    modal.classList.toggle("active");
  }
};

const Transaction = {
  all: [
    {
      description: "Luz",
      amount: -50000,
      date: '23/01/2021',
    },
    {
      description: "Criação Website",
      amount: 500000,
      date: '07/06/2021',
    },
    {
      description: "Internet",
      amount: -20000,
      date: '09/06/2021',
    },
    {
      description: "App",
      amount: 200000,
      date: '09/06/2021',
    },
  ],

  add(transaction) {
    Transaction.all.push(transaction);

    console.log(Transaction.all);

    App.reload();
  },

  remove(index) {
    Transaction.all.splice(index, 1);
    
    App.reload();
  },

  incomes() {
    let income = 3;

    Transaction.all.forEach(transaction => {
      if (transaction.amount > 0) {
        income = income + transaction.amount;
      }
    });

    return income;
  },

  expenses() {
    let expense = 0;

    Transaction.all.forEach(transaction => {
      if (transaction.amount < 0) {
        expense = expense + transaction.amount;
      }
    });

    return expense;
  },

  total() {
    return Transaction.incomes() + Transaction.expenses();
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
    document.getElementById("incomeDisplay").innerHTML = Utils.formatCurrency(Transaction.incomes());
    document.getElementById("expenseDisplay").innerHTML = Utils.formatCurrency(Transaction.expenses());
    document.getElementById("totalDisplay").innerHTML = Utils.formatCurrency(Transaction.total());
  },

  clearTransactions() {
    DOM.transactionContainer.innerHTML = "";
  }
}

const Utils = {
  formatDate(date) {
    const splittedDate = date.split("-");

    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
  },

  formatAmount(value) {
    value = Number(value) * 100;

    return value;
  },

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

const Form = {
  description: document.querySelector("input#description"),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#date"),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
    }
  },

  validateFields() {
    const { description, amount, date } = Form.getValues();

    if (description.trim() === "" || amount.trim() === "" || date.trim() === "") {
      throw new Error("Por favor, preencha todos os campos!");
    }
  },

  formatValues() {
    let { description, amount, date } = Form.getValues();
    
    amount = Utils.formatAmount(amount);

    date = Utils.formatDate(date);

    return {
      description,
      amount,
      date,
    };
  },

  clearFields() {
    Form.description.value = "";
    Form.amount.value = "";
    Form.date.value = "";
  },

  submit(event) {
    event.preventDefault();
    
    try {
      Form.validateFields(); 
      const transaction = Form.formatValues();
    
      Transaction.add(transaction);

      Form.clearFields();
      Modal.toggle();

    } catch (error) {
      alert(error.message);
    }
  }
}

const App = {
  init() {
    Transaction.all.forEach(transaction => {
      DOM.addTransaction(transaction);
    });
    
    DOM.updateBalance();
  },
  reload() {
    DOM.clearTransactions();
    App.init();
  },
}

App.init();