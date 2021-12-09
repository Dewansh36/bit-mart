const express = require("express")
const { newOrder, myOrders } = require("../controllers/orderController")

const router = express.router()

router.route("/order/new").post(newOrder)
router.route("/order/me").get(myOrders)

module.exports = router