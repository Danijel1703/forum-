const express = require('express');
const { required } = require('@hapi/joi');
const viewHome = (req,res) => {

    if(!req.cookies['userRole']){
        res.cookie('userRole','guest',{expires:new Date(Date.now() + 7200000)});
    }
    res.render('HomeView');
}

module.exports.viewHome = viewHome;