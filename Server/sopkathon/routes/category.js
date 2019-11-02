const express = require('express');
const router = express.Router();
const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const Category = require('../model/category');

// router.post('/postup', (req, res) => {
//     const {characterName, voteNum, category} = req.body;
    
//     //파라미터 오류
//     if (!characterName|| !voteNum || !category){
//         res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.NULL_VALUE));
//         return;
//     }

//     Category.create(characterName, voteNum, category)
//     .then(({code, json}) => {
//         res.status(code).send(json);
//     }).catch(err => {
//         console.log(err);
//         res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
//     });
// });

router.get('/', (req, res) => {
    Category.readAll()
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

router.get('/:category', (req, res)=>{
    const category = req.params.category;
    if(!category){
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Category.read(category)
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
    });
});

module.exports = router;