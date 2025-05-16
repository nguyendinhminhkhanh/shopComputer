// const Admin = require("../models/products");


const Trademark = require("../models/Trademarks");
const path = require('path');
const fs = require('fs');
const { mongooseToObject } = require('../../util/mongose');
const { mutipleMongooseToObject } = require('../../util/mongose');
const removeVietnameseTones = require('../../util/removeVietnameseTones')
class adminController {

    //===Dashboard==========
    async dashboard(req, res) {
        res.render('admin/dashboard', { layout: 'admin', currentPath: req.path });
    }

    //===Customer==========
    async customer(req, res) {
        res.render('admin/customer', { layout: 'admin', currentPath: req.path });
    }
    //Thêm khach hàng 
    //Xoá khách hàng 




    //===Order=============
    async order(req, res) {
        res.render('admin/order', { layout: 'admin', currentPath: req.path });
    }
    ///,....

}

module.exports = new adminController;
