const express = require('express');
const router = express.Router();
const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const Character = require('../model/character');

/* [GET]localhost:3000/character
request body{
    "id":"아이디",
    "pwd":"비밀번호",
    "name":"이름"
}
response
1. 성공
2. 파라미터 오류
3. 아이디 중복
4. 서버 오류
*/

router.post('/postup', (req, res) => {
    const {characterName, voteNum, category} = req.body;
    
    //파라미터 오류
    if (!characterName|| !voteNum || !category){
        res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }

    Character.create(characterName, voteNum, category)
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
    });
});

router.get('/', (req, res) => {
    Character.readAll()
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
    Character.read(category)
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
    });
});

module.exports = router;