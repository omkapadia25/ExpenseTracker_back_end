const express =require('express')
const {createTransaction,deleteTransaction,updateTransaction,getAllTransaction,getDailyTransaction,getMonthlyTransaction,getYearlyTransaction,getWeeklyTransaction}=require('../controllers/dashboard');

const router=express.Router();


router.route('/').post(createTransaction).get(getAllTransaction)
router.route('/:id').delete(deleteTransaction).patch(updateTransaction)
router.route('/dailyTransaction').get(getDailyTransaction)
router.route('/weeklyTransaction').get(getWeeklyTransaction)
router.route('/monthlyTransaction').get(getMonthlyTransaction)
router.route('/yearlyTransaction').get(getYearlyTransaction)


module.exports=router;