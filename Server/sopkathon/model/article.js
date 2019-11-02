const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');

const articleDB = [
    {'category':'Joker', 'articleIdx':'1', 'userIdx':'', 'likeNum':632, 'photo':'https://static01.nyt.com/images/2019/10/09/arts/joker-anatomy2/joker-anatomy2-videoSixteenByNineJumbo1600.jpg', 'title':'I\'m the best', 'time':200},
    {'category':'Joker', 'articleIdx':'2', 'userIdx':'', 'likeNum':334, 'photo':'https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/06/06/10/jared-leto-joker.jpg', 'title':'WTF!!', 'time':670},
    {'category':'Joker', 'articleIdx':'3', 'userIdx':'', 'likeNum':210, 'photo':'https://i.ytimg.com/vi/votcOf5cYCM/maxresdefault.jpg', 'title':'Why so serious?', 'time':550},
    {'category':'Joker', 'articleIdx':'4', 'userIdx':'', 'likeNum':152, 'photo':'https://movies-b26f.kxcdn.com/wp-content/uploads/2019/10/batmanjokerburtonbanner.jpg', 'title':'I love ketchup!', 'time':300},
    {'category':'Joker', 'articleIdx':'5', 'userIdx':'', 'likeNum':89, 'photo':'https://i.pinimg.com/originals/46/57/4f/46574f036dffa8a296ff0fad7730a8f9.jpg', 'title':'Keep your eyes down', 'time':900}
];
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
    //게시글 생성
    create: (category, articleIdx, userIdx, likeNum, photo, title, time) => {
        return new Promise((resolve, reject) => {
            //article idx check
            if (articleDB.filter(it => it.articleIdx === articleIdx).length > 0) {
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.ALREADY_ARTICLE)
                })
                return;
            }

            //파라미터 오류
            if (!category || !articleIdx || !userIdx || !likeNum || !photo || !title || !time){
                res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.NULL_VALUE));
                return;
            }

            //없는 category명인지 확인
            const filterArray = categoryDB.filter(it => it.category === category);
            if(filterArray.length == 0){
                resolve({
                    code:statusCode.BAD_REQUEST,
                    json:authUtil.successFalse(responseMessage.NO_CATEGORY)
                })
                return;
            }

            //character 생성 성공
            const article = {
                category,
                articleIdx, 
                userIdx, 
                likeNum, 
                photo,
                title,
                time
            };
            articleDB.push(article);
            const result = article;

            resolve({
                code:statusCode.OK,
                json:authUtil.successTrue(responseMessage.LIST_CREATE_SUCCESS, result)
            });
        });
    },

    timeCount:() =>{
        return new Promise((resolve, reject) =>{
            const now = 1000; //new Date()로 받아서 실시간
            const _1hour = 500;
            const timeTerm = now - _1hour; //articleDB.time 이 500~1000 이면 1시간 이내

            const timeArray = articleDB.filter(it => it.time > timeTerm);
            if(timeArray.length != 0){
                const rankingField = 'likeNum';
                timeArray.sort(function(a, b) { // 내림차순
                    return b[rankingField] - a[rankingField];
                });
                resolve({
                    code:statusCode.OK,
                    json:authUtil.successTrue(responseMessage.REAL_TIME_SUCCESS, timeArray)
                });
            }
        })
    },

    readAll: () => {
        return new Promise((resolve, reject) => {
            //성공
            resolve({
                code:statusCode.OK,
                json:authUtil.successTrue(responseMessage.ARTICLE_READ_SUCCESS, articleDB)
            });
        });
    },
    read: (category) => {
        return new Promise((resolve, reject) => {
            //없는 category명인지 확인
            const filterArray = articleDB.filter(it => it.category === category);
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
    update: (articleIdx) => {
        return new Promise((resolve, reject) => {
            //articleIdx 확인
            if(articleIdx > articleDB.length){
                resolve({
                    code:statusCode.BAD_REQUEST,
                    json:authUtil.successFalse(responseMessage.NO_ARTICLE)
                });
                return;
            }

            const tmp = articleDB.findIndex(i => i.articleIdx== articleIdx); 
            console.log(tmp);

            articleDB[tmp].likeNum += 1;
            //성공
            resolve({
                code:statusCode.OK,
                json:authUtil.successTrue(responseMessage.ARTICLE_UPDATE_SUCCESS, articleDB[tmp])
            });
        })
    }

}