const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');

const categoryDB = [
    {'category':'Joker', 'voteNum': 6873},
    {'category':'Dracula', 'voteNum':3245},
    {'category':'Minions', 'voteNum':2312},
    {'category':'Maid', 'voteNum':1752},
    {'category':'Pennywise', 'voteNum':5523},
    {'category':'Werewolf', 'voteNum':892},
    {'category':'Ghost', 'voteNum':1232},
    {'category':'Scream', 'voteNum':1302},
    {'category':'witch', 'voteNum':652},
    {'category':'Batman', 'voteNum':2130},
    {'category':'Spiderman', 'voteNum':1920},
    {'category':'Superman', 'voteNum':1203},
    {'category':'Cat woman', 'voteNum':932},
    {'category':'Wander woman', 'voteNum':1132},
    {'category':'Hulk', 'voteNum':4420},
    {'category':'Captain America', 'voteNum':2320},
    {'category':'Demogorgon', 'voteNum':3230},
    {'category':'Zombi', 'voteNum':3420},
    {'category':'Super mario', 'voteNum':1453},
    {'category':'The smurfs', 'voteNum':862},
    {'category':'Luffy', 'voteNum':543},
    {'category':'Harley Quinn', 'voteNum':4814},
    {'category':'Kaonashi', 'voteNum':2942},
    {'category':'Dead pool', 'voteNum':3213},
    {'category':'Iron man', 'voteNum':2764},
    {'category':'Reaper', 'voteNum':2420},
    {'category':'Wally', 'voteNum':1721},
    {'category':'dinosaur', 'voteNum':1292},
    {'category':'Sponge Bob', 'voteNum':814},
    {'category':'Thanos', 'voteNum':4621},
    {'category':'Thor', 'voteNum':2876},
    {'category':'Dr. Strange', 'voteNum':1658},
    {'category':'Ant man', 'voteNum':1131},
    {'category':'Black widow', 'voteNum':892},
    {'category':'Hawkeye', 'voteNum':2323},
    {'category':'Ninja', 'voteNum':2315},
    {'category':'Oak', 'voteNum':427},
    {'category':'Jack sparrow', 'voteNum':1925},
    {'category':'Bumblebee', 'voteNum':704},
    {'category':'Optimus prime', 'voteNum':831},
    {'category':'Dobby', 'voteNum':325},
    {'category':'Gollum', 'voteNum':624},
    {'category':'Terminator', 'voteNum':1175},
    {'category':'Avatar', 'voteNum':932},
    {'category':'Groot', 'voteNum':3426},
    {'category':'R2D2', 'voteNum':729},
    {'category':'Yoda', 'voteNum':468},
    {'category':'Darth Vader', 'voteNum':2130},
    {'category':'Shrek', 'voteNum':890},
    {'category':'Kungfu panda', 'voteNum':1523}
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