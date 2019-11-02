const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');

const categoryDB = [
    {'category':'Joker', 'voteNum': 100},
    {'category':'Dracula', 'voteNum':30},
    {'category':'Minions', 'voteNum':70},
    {'category':'Maid', 'voteNum':70},
    {'category':'Pennywise', 'voteNum':70},
    {'category':'Werewolf', 'voteNum':70},
    {'category':'Ghost', 'voteNum':70},
    {'category':'Scream', 'voteNum':70},
    {'category':'witch', 'voteNum':70},
    {'category':'Batman', 'voteNum':70},
    {'category':'Spiderman', 'voteNum':70},
    {'category':'Superman', 'voteNum':70},
    {'category':'Cat woman', 'voteNum':70},
    {'category':'Wander woman', 'voteNum':70},
    {'category':'Hulk', 'voteNum':70},
    {'category':'Captain America', 'voteNum':70},
    {'category':'Demogorgon', 'voteNum':70},
    {'category':'Zombi', 'voteNum':70},
    {'category':'Super mario', 'voteNum':70},
    {'category':'The smurfs', 'voteNum':70},
    {'category':'Luffy', 'voteNum':70},
    {'category':'Harley Quinn', 'voteNum':70},
    {'category':'Kaonashi', 'voteNum':70},
    {'category':'Dead pool', 'voteNum':70},
    {'category':'Iron man', 'voteNum':70},
    {'category':'Reaper', 'voteNum':70},
    {'category':'Wally', 'voteNum':70},
    {'category':'dinosaur', 'voteNum':70},
    {'category':'Sponge Bob', 'voteNum':70},
    {'category':'Thanos', 'voteNum':70},
    {'category':'Thor', 'voteNum':70},
    {'category':'Dr. Strange', 'voteNum':70},
    {'category':'Ant man', 'voteNum':70},
    {'category':'Black widow', 'voteNum':70},
    {'category':'Hawkeye', 'voteNum':70},
    {'category':'Ninja', 'voteNum':70},
    {'category':'Oak', 'voteNum':70},
    {'category':'Jack sparrow', 'voteNum':70},
    {'category':'Bumblebee', 'voteNum':70},
    {'category':'Optimus prime', 'voteNum':70},
    {'category':'Dobby', 'voteNum':70},
    {'category':'Gollum', 'voteNum':70},
    {'category':'Terminator', 'voteNum':70},
    {'category':'Avatar', 'voteNum':70},
    {'category':'Groot', 'voteNum':70},
    {'category':'R2D2', 'voteNum':70},
    {'category':'Yoda', 'voteNum':70},
    {'category':'Darth Vader', 'voteNum':70},
    {'category':'Shrek', 'voteNum':70},
    {'category':'Kungfu panda', 'voteNum':70}
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