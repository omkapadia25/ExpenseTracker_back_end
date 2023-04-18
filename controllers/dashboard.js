const Dashboard = require("../models/Dashboard");
const ITEMS_PER_PAGE = 7;

const getDailyAmount = async (req, res) => {
  let sum = 0;
  let expense = 0;
  let savings = 0;
  let investment = 0;


  const toDate = new Date();
  toDate.setDate(toDate.getDate() + 1);
  toDate.toLocaleDateString();

  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 1);
  fromDate.toLocaleDateString();

  const resultSet = await Dashboard.find({
    createdBy: req.user.userId,
    date: { $gte: fromDate, $lte: toDate },
  });
  for (let i = 0; i < resultSet.length; i++) {
    if (
      resultSet[i].categories === "expense" ||
      resultSet[i].categories === "Expense"
    ) {
      expense += parseInt(resultSet[i].amount);
    } else if (
      resultSet[i].categories === "savings" ||
      resultSet[i].categories === "Savings"
    ) {
      savings += parseInt(resultSet[i].amount);
    } else {
      investment += parseInt(resultSet[i].amount);
    }
    sum += parseInt(resultSet[i].amount);
  }

  // res.send(sum.toString());

  return {
    Amount: {
      totalAmount: sum.toString(),
      expense: expense.toString(),
      savings: savings.toString(),
      investment: investment.toString(),
    },
    pagination: {
      count: resultSet.length,
      pageCount: Math.ceil(resultSet.length / ITEMS_PER_PAGE),
    },
    ResultSet: resultSet,
  };
};
const getWeeklyAmount = async (req, res) => {
  let sum = 0;
  let expense = 0;
  let savings = 0;
  let investment = 0;

  const toDate = new Date();
  toDate.setDate(toDate.getDate() + 1);
  toDate.toLocaleDateString();

  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7);
  fromDate.toLocaleDateString();
  const resultSet = await Dashboard.find({
    createdBy: req.user.userId,
    date: { $gte: fromDate, $lte: toDate },
  });
  for (let i = 0; i < resultSet.length; i++) {
    if (
      resultSet[i].categories === "expense" ||
      resultSet[i].categories === "Expense"
    ) {
      expense += parseInt(resultSet[i].amount);
    } else if (
      resultSet[i].categories === "savings" ||
      resultSet[i].categories === "Savings"
    ) {
      savings += parseInt(resultSet[i].amount);
    } else {
      investment += parseInt(resultSet[i].amount);
    }
    sum += parseInt(resultSet[i].amount);
  }
  // console.log(resultSet)

  return {
    Amount: {
      totalAmount: sum.toString(),
      expense: expense.toString(),
      savings: savings.toString(),
      investment: investment.toString(),
    },
    pagination: {
      count: resultSet.length,
      pageCount: Math.ceil(resultSet.length / ITEMS_PER_PAGE),
    },
    ResultSet: resultSet,
  };
};
const getMonthlyAmount = async (req, res) => {
  let sum = 0;
  let expense = 0;
  let savings = 0;
  let investment = 0;

  const toDate = new Date();
  toDate.setDate(toDate.getDate() + 1);
  toDate.toLocaleDateString();

  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 30);
  fromDate.toLocaleDateString();

  const resultSet = await Dashboard.find({
    createdBy: req.user.userId,
    date: { $gte: fromDate, $lte: toDate },
  });
  for (let i = 0; i < resultSet.length; i++) {
    if (
      resultSet[i].categories === "expense" ||
      resultSet[i].categories === "Expense"
    ) {
      expense += parseInt(resultSet[i].amount);
    } else if (
      resultSet[i].categories === "savings" ||
      resultSet[i].categories === "Savings"
    ) {
      savings += parseInt(resultSet[i].amount);
    } else {
      investment += parseInt(resultSet[i].amount);
    }
    sum += parseInt(resultSet[i].amount);
  }

  return {
    Amount: {
      totalAmount: sum.toString(),
      expense: expense.toString(),
      savings: savings.toString(),
      investment: investment.toString(),
    },
    pagination: {
      count: resultSet.length,
      pageCount: Math.ceil(resultSet.length / ITEMS_PER_PAGE),
    },
    ResultSet: resultSet,
  };
};
const getYearlyAmount = async (req, res) => {
  let sum = 0;
  let expense = 0;
  let savings = 0;
  let investment = 0;

  const toDate = new Date();
  toDate.setDate(toDate.getDate() + 1);
  toDate.toLocaleDateString();

  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 365);
  fromDate.toLocaleDateString();

  const resultSet = await Dashboard.find({
    createdBy: req.user.userId,
    date: { $gte: fromDate, $lte: toDate },
  });
  for (let i = 0; i < resultSet.length; i++) {
    if (
      resultSet[i].categories === "expense" ||
      resultSet[i].categories === "Expense"
    ) {
      expense += parseInt(resultSet[i].amount);
    } else if (
      resultSet[i].categories === "savings" ||
      resultSet[i].categories === "Savings"
    ) {
      savings += parseInt(resultSet[i].amount);
    } else {
      investment += parseInt(resultSet[i].amount);
    }
    sum += parseInt(resultSet[i].amount);
  }

  return {
    Amount: {
      totalAmount: sum.toString(),
      expense: expense.toString(),
      savings: savings.toString(),
      investment: investment.toString(),
    },
    pagination: {
      count: resultSet.length,
      pageCount: Math.ceil(resultSet.length / ITEMS_PER_PAGE),
    },
    ResultSet: resultSet,
  };
};

const getDailyTransaction = async (req, res) => {
  const {page} = req.query || 1;
  const skip=(page-1)*ITEMS_PER_PAGE
  const { Amount, pagination, ResultSet } = await getDailyAmount(req, res);
  const copiedObjects = ResultSet.slice(skip, skip +ITEMS_PER_PAGE);
  res.status(200).json({ Amount, pagination, ResultSet:[...copiedObjects]} );
};
const getMonthlyTransaction = async (req, res) => {
  const {page} = req.query || 1;
  const skip=(page-1)*ITEMS_PER_PAGE
  const { Amount, pagination, ResultSet } = await getMonthlyAmount(req, res);
  const copiedObjects = ResultSet.slice(skip, skip +ITEMS_PER_PAGE);
  res.status(200).json({ Amount, pagination, ResultSet:[...copiedObjects]} );
};
const getWeeklyTransaction = async (req, res) => {
  const {page} = req.query || 1;
  const skip=(page-1)*ITEMS_PER_PAGE
  const { Amount, pagination, ResultSet } = await getWeeklyAmount(req, res);
  const copiedObjects = ResultSet.slice(skip, skip +ITEMS_PER_PAGE);
  res.status(200).json({ Amount, pagination, ResultSet:[...copiedObjects]} );
};
const getYearlyTransaction = async (req, res) => {
  const {page} = req.query || 1;
  const skip=(page-1)*ITEMS_PER_PAGE
  const { Amount, pagination, ResultSet } = await getYearlyAmount(req, res);
  const copiedObjects = ResultSet.slice(skip, skip +ITEMS_PER_PAGE);
  res.status(200).json({ Amount, pagination, ResultSet:[...copiedObjects]} );
};

const getAllTransaction = async (req, res) => {
  try {
    const daily = await getDailyAmount(req, res);
    const weekly = await getWeeklyAmount(req, res);
    const monthly = await getMonthlyAmount(req, res);
    const yearly = await getYearlyAmount(req, res);

    res.json({
      dailyAmount: daily.Amount.totalAmount,
      weeklyAmount: weekly.Amount.totalAmount,
      monthlyAmount: monthly.Amount.totalAmount,
      yearlyAmount: yearly.Amount.totalAmount,
    });
  } catch (error) {
    res.json(error);
  }
};

const createTransaction = async (req, res) => {
  console.log("created");
  req.body.createdBy = req.user.userId;

  const temp = { ...req.body, date: Date.now() };
  const dashboard = await Dashboard.create(temp);
  res.status(200).json({ dashboard });
};

const updateTransaction = async (req, res) => {
  try {
    const {
      user: { userId },
      params: { id: transactionId },
    } = req;

    const { name, categories, amount } = req.body;

    if (name === "" || amount === "" || categories === "") {
      throw "name,amount,category can't be empty";
    }
    const transaction = await Dashboard.findByIdAndUpdate(
      { _id: transactionId, createdBy: userId },
      req.body,
      { new: true, runValidator: true }
    );
    if (!transaction) {
      throw "no transaction with id ${transactionId}";
    }
    // console.log(transactionId)
    res.status(400).json({ transaction });
  } catch (error) {
    res.status(400).json({ error });
  }
};
const deleteTransaction = async (req, res) => {
  try {
    const {
      user: { userId },
      params: { id: transactionId },
    } = req;
    
    const transaction = await Dashboard.deleteOne({
      _id: transactionId,
      createdBy: userId,
    });

    if (!transaction) {
      throw new Error(`No transaction with id ${transactionId}`);
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getAllTransaction,
  getDailyTransaction,
  getWeeklyTransaction,
  getMonthlyTransaction,
  getYearlyTransaction,
};
