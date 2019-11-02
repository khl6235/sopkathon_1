const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');

const characterDB = [];

module.exports = {
    //character list 생성
    create: (characterName, voteNum, category) => {
        return new Promise((resolve, reject) => {
            //blog명 중복 체크
            // if (characterDB.filter(it => it.blogName == blogName).length > 0) {
            //     resolve({
            //         code: statusCode.BAD_REQUEST,
            //         json: authUtil.successFalse(responseMessage.ALREADY_ID)
            //     })
            //     return;
            // }
            
            //character 생성 성공
            const character = {
                characterName,
                voteNum,
                category
            };
            characterDB.push(character);
            const result = character;

            resolve({
                code:statusCode.OK,
                json:authUtil.successTrue(responseMessage.LIST_CREATE_SUCCESS, result)
            });
        });
    },

    read: (category) => {
        return new Promise((resolve, reject) => {
            //category(int) 확인
            if(category > characterDB.length){
                resolve({
                    code:statusCode.BAD_REQUEST,
                    json:authUtil.successFalse(responseMessage.OUT_OF_VALUE)
                })
                return;
            }

            //성공
            resolve({
                code:statusCode.OK,
                json:authUtil.successTrue(responseMessage.BOARD_READ_ALL_SUCCESS, characterDB[category])
            });
        });
    },

    readAll: () => {
        return new Promise((resolve, reject) => {
            //성공
            resolve({
                code:statusCode.OK,
                json:authUtil.successTrue(responseMessage.LIST_READ_SUCCESS, characterDB)
            });
        });
    }
}