const express = require('express');
const router = express.Router();
const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const User = require('../model/user');

//const userDB = [];

/* [POST]localhost:3000/users/signup
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
router.post('/signup', (req, res) => {
    const {id, pwd, name} = req.body;
    
    //파라미터 오류
    if (!id || !pwd || !name){
        res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }

/*
    //아이디 중복 체크
    if(userDB.filter(it => it.id == id).length > 0){ //.filter() 안에꺼가 true 반환
        res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.ALREADY_ID));
        return;
    } 

    const user = {
        id,
        pwd,
        name,
        address
    }
    userDB.push(user);
    console.log(userDB);
    const result = user;

    //회원가입 성공 
    res.status(statusCode.OK).send(authUtil.successTrue(responseMessage.SIGN_UP_SUCCESS, result));
    */
    User.signup(id, pwd, name)
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
    });
});

/* [POST]localhost:3000/users/signin
request body{
    "id":"아이디",
    "pwd":"비밀번호"
}
response
1. 성공
2. 파라미터 오류
3. 아이디 중복
4. 서버 오류
*/
router.post('/signin', (req, res) => {
    const {id, pwd} = req.body;

    //파라미터 값 체크
    if(!id || !pwd){
        res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
/*
    //유저가 존재하는지 체크
    const user = userDB.find(it =>it.id == id);
    console.log(user);
    if(!user){
        res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.NO_USER));
        return;
    }

    //비밀번호 체크
    if(user.pwd != pwd){
        res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.MISS_MATCH_PW));
        return;
    }
    
    //로그인 성공
    res.status(statusCode.OK).send(authUtil.successTrue(responseMessage.SIGN_IN_SUCCESS));
*/
    User.signin(id, pwd)
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
    });
});



module.exports = router;