const Orders = require('../model/orderSchema')



exports.listUserOrders = (async(req,res)=>{
    const orders = await Orders.find()
    return res.status(200).json("orders fetched",orders)
})

