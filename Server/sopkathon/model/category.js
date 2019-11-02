const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');

const categoryDB = [
    {'category':'Joker', 'voteNum': 6873, 'thumbnail': 'https://image.businessinsider.com/56e1eb5891058426008b59cc?width=1100&format=jpeg&auto=webp'},
    {'category':'Dracula', 'voteNum':3245, 'thumbnail': ''},
    {'category':'Minions', 'voteNum':2312, 'thumbnail': ''},
    {'category':'Maid', 'voteNum':1752, 'thumbnail': ''},
    {'category':'Pennywise', 'voteNum':5523, 'thumbnail': 'https://img1.nickiswift.com/img/uploads/2017/09/The_actor_who_plays_Pennywise_is_gorgeous_in_real_life.jpg'},
    {'category':'Werewolf', 'voteNum':892, 'thumbnail': ''},
    {'category':'Ghost', 'voteNum':1232, 'thumbnail': ''},
    {'category':'Scream', 'voteNum':1302, 'thumbnail': ''},
    {'category':'witch', 'voteNum':652, 'thumbnail': ''},
    {'category':'Batman', 'voteNum':2130, 'thumbnail': ''},
    {'category':'Spiderman', 'voteNum':1920, 'thumbnail': ''},
    {'category':'Superman', 'voteNum':1203, 'thumbnail': ''},
    {'category':'Cat woman', 'voteNum':932, 'thumbnail': ''},
    {'category':'Wander woman', 'voteNum':1132, 'thumbnail': ''},
    {'category':'Hulk', 'voteNum':4420, 'thumbnail': 'https://cdn.vox-cdn.com/thumbor/wgMcgj6LStdjW-qlLkaHUBsdQzY=/0x0:2048x858/1200x800/filters:focal(834x251:1160x577)/cdn.vox-cdn.com/uploads/chorus_image/image/57442421/hulk_agnarok.0.jpg'},
    {'category':'Captain America', 'voteNum':2320, 'thumbnail': ''},
    {'category':'Demogorgon', 'voteNum':3230, 'thumbnail': ''},
    {'category':'Zombi', 'voteNum':3420, 'thumbnail': ''},
    {'category':'Super mario', 'voteNum':1453, 'thumbnail': ''},
    {'category':'The smurfs', 'voteNum':862, 'thumbnail': ''},
    {'category':'Luffy', 'voteNum':543, 'thumbnail': ''},
    {'category':'Harley Quinn', 'voteNum':4814, 'thumbnail': 'https://miro.medium.com/max/4000/0*bdhf1cch4Mjib3UL.jpg'},
    {'category':'Kaonashi', 'voteNum':2942, 'thumbnail': ''},
    {'category':'Dead pool', 'voteNum':3213, 'thumbnail': ''},
    {'category':'Iron man', 'voteNum':2764, 'thumbnail': ''},
    {'category':'Reaper', 'voteNum':2420, 'thumbnail': ''},
    {'category':'Wally', 'voteNum':1721, 'thumbnail': ''},
    {'category':'dinosaur', 'voteNum':1292, 'thumbnail': ''},
    {'category':'Sponge Bob', 'voteNum':814, 'thumbnail': ''},
    {'category':'Thanos', 'voteNum':4621, 'thumbnail': 'https://metro.co.uk/wp-content/uploads/2018/09/sei_28297430-3e8c.jpg?quality=90&strip=all'},
    {'category':'Thor', 'voteNum':2876, 'thumbnail': ''},
    {'category':'Dr. Strange', 'voteNum':1658, 'thumbnail': ''},
    {'category':'Ant man', 'voteNum':1131, 'thumbnail': ''},
    {'category':'Black widow', 'voteNum':892, 'thumbnail': ''},
    {'category':'Hawkeye', 'voteNum':2323, 'thumbnail': ''},
    {'category':'Ninja', 'voteNum':2315, 'thumbnail': ''},
    {'category':'Oak', 'voteNum':427, 'thumbnail': ''},
    {'category':'Jack sparrow', 'voteNum':1925, 'thumbnail': ''},
    {'category':'Bumblebee', 'voteNum':704, 'thumbnail': ''},
    {'category':'Optimus prime', 'voteNum':831, 'thumbnail': ''},
    {'category':'Dobby', 'voteNum':325, 'thumbnail': ''},
    {'category':'Gollum', 'voteNum':624, 'thumbnail': ''},
    {'category':'Terminator', 'voteNum':1175, 'thumbnail': ''},
    {'category':'Avatar', 'voteNum':932, 'thumbnail': ''},
    {'category':'Groot', 'voteNum':3426, 'thumbnail': ''},
    {'category':'R2D2', 'voteNum':729, 'thumbnail': ''},
    {'category':'Yoda', 'voteNum':468, 'thumbnail': ''},
    {'category':'Darth Vader', 'voteNum':2130, 'thumbnail': ''},
    {'category':'Shrek', 'voteNum':890, 'thumbnail': ''},
    {'category':'Kungfu panda', 'voteNum':1523, 'thumbnail': ''}
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