const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');

const categoryDB = [
    {'category':'joker', 'voteNum': 100},
    {'category':'shrek', 'voteNum':30},
    {'category':'horror', 'voteNum':70}
];

module.exports = {
    //character list 생성
    /*create: (category, voteNum) => {
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
    },*/

    /*
    onst categoryDB = [
    {'category':'joker', 'voteNum': 100},
    {'category':'shrek', 'voteNum':30},
    {'category':'horror', 'voteNum':70}
];
    */
    read: (category) => {
        return new Promise((resolve, reject) => {
            //없는 category명인지 확인
            const filterArray = categoryDB.filter(it => it.category === category);
            if(filterArray.length == 0){
                resolve({
                    code:statusCode.BAD_REQUEST,
                    json:authUtil.successFalse(responseMessage.NO_CATEGORY)
                })
                return;
            }
            
            //성공
            resolve({
                code:statusCode.OK,
                json:authUtil.successTrue(responseMessage.BOARD_READ_ALL_SUCCESS, filterArray)
            });
        });
    },

    readAll: () => { //sorting
        return new Promise((resolve, reject) => {

            const rankingField = 'voteNum';
            categoryDB.sort(function(a, b) { // 내림차순
                return b[rankingField] - a[rankingField];
            });

            //성공
            resolve({
                code:statusCode.OK,
                json:authUtil.successTrue(responseMessage.LIST_READ_SUCCESS, categoryDB)
            });
        });
    }
}