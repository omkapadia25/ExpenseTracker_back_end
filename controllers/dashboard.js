const Dashboard=require('../models/Dashboard');

const getDailyAmount=async(req,res)=>{
    let sum=0;
    const toDate = new Date();
    toDate.setDate(toDate.getDate()+1);
    toDate.toLocaleDateString()

    const fromDate=new Date;
    fromDate.setDate(fromDate.getDate()-1);
    fromDate.toLocaleDateString();

    const resultSet=await Dashboard.find({createdBy:req.user.userId,date:{$gte:fromDate,$lte:toDate}})
    console.log(resultSet);
    for(let i=0;i<resultSet.length;i++){
        sum+=parseInt(resultSet[i].amount);
    }

    // res.send(sum.toString());
    return {dailyAmount:sum.toString(),dailyResultSet:resultSet}

    

}
const getWeeklyAmount=async(req,res)=>{
    let sum=0;
    const toDate = new Date();
    toDate.setDate(toDate.getDate()+1);
    toDate.toLocaleDateString()

    const fromDate=new Date;
    fromDate.setDate(fromDate.getDate()-7);
    fromDate.toLocaleDateString();
    const resultSet=await Dashboard.find({createdBy:req.user.userId,date:{$gte:fromDate,$lte:toDate}})
    for(let i=0;i<resultSet.length;i++){
        sum+=parseInt(resultSet[i].amount);
    }

    return {weeklyAmount:sum.toString(),weeklyResultSet:resultSet}


    

}
const getMonthlyAmount=async(req,res)=>{
    let sum=0;
    const toDate = new Date();
    toDate.setDate(toDate.getDate()+1);
    toDate.toLocaleDateString()

    const fromDate=new Date;
    fromDate.setDate(fromDate.getDate()-30);
    fromDate.toLocaleDateString();

    const resultSet=await Dashboard.find({createdBy:req.user.userId,date:{$gte:fromDate,$lte:toDate}})
    for(let i=0;i<resultSet.length;i++){
        sum+=parseInt(resultSet[i].amount);
    }

    return {monthlyAmount:sum.toString(),monthlyResultSet:resultSet}


    

}
const getYearlyAmount=async(req,res)=>{
    let sum=0;
    const toDate = new Date();
    toDate.setDate(toDate.getDate()+1);
    toDate.toLocaleDateString()

    const fromDate=new Date;
    fromDate.setDate(fromDate.getDate()-365);
    fromDate.toLocaleDateString();

    const resultSet=await Dashboard.find({createdBy:req.user.userId,date:{$gte:fromDate,$lte:toDate}})
    for(let i=0;i<resultSet.length;i++){
        sum+=parseInt(resultSet[i].amount);
    }

    return {yearlyAmount:sum.toString(),yearlyResultSet:resultSet}

    

}




const getDailyTransaction=async(req,res)=>{
    const {dailyResultSet}=await getDailyAmount(req,res);
    res.status(200).json(dailyResultSet)
}
const getMonthlyTransaction=async(req,res)=>{
    const {monthlyResultSet}=await getMonthlyAmount(req,res);
    res.status(200).json(monthlyResultSet)
}
const getWeeklyTransaction=async(req,res)=>{
    const {weeklyResultSet}=await getWeeklyAmount(req,res);
    res.status(200).json(weeklyResultSet)

}
const getYearlyTransaction=async(req,res)=>{
    const{yearlyResultSet}=await getYearlyAmount(req,res);
    res.status(200).json(yearlyResultSet);


}






const getAllTransaction=async(req,res)=>{
 
    const {dailyAmount}=await getDailyAmount(req,res);
    const {weeklyAmount}=await getWeeklyAmount(req,res);
    const {monthlyAmount} =await getMonthlyAmount(req,res);
    const {yearlyAmount}=await getYearlyAmount(req,res);
    res.status(400).json({dailyAmount,weeklyAmount,monthlyAmount,yearlyAmount});

}



const createTransaction=async(req,res)=>{

    req.body.createdBy = req.user.userId

    const temp={...req.body,date:Date.now()}
    const dashboard = await Dashboard.create(temp)
    res.status(400).json({ dashboard })

}

const updateTransaction=async(req,res)=>{

    try {
        const{
            user:{userId},
            params:{id:transactionId}
        }=req

        const{name,categories,amount}=req.body
    
        if(name==='' || amount==="" || categories===''){
            throw "name,amount,category can't be empty";
        }
        const transaction=await Dashboard.findByIdAndUpdate({_id:transactionId,createdBy:userId},req.body,{new:true,runValidator:true})
        if(!transaction){
            throw "no transaction with id ${transactionId}"
        }
        console.log(transactionId)
        res.status(400).json({transaction})
    } catch (error) {
        res.status(400).json({error});
    }



    
}
const deleteTransaction=async(req,res)=>{

    try {
        const{
            user:{userId},
            params:{id:transactionId},
        }=req
    
        const transaction=await Dashboard.findByIdAndRemove({
            _id:transactionId,
            createdBy:userId
        })
        if(!transaction){
            throw  'No job with id ${transactionId}'
        }
        res.status(400).send('<h1>hello</h1>')
        
    } catch (error) {
        res.status(400).json({error})
    }
   

}

module.exports={
    createTransaction,
    updateTransaction,
    deleteTransaction,
   getAllTransaction,
   getDailyTransaction,
   getWeeklyTransaction,
   getMonthlyTransaction,
   getYearlyTransaction
}