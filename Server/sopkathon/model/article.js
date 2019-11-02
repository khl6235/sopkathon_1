const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');

const articleDB = [
    {'category':'Joker', 'articleIdx':'1', 'userIdx':'', 'likeNum':178, 'photo':'https://i2.wp.com/metro.co.uk/wp-content/uploads/2019/10/PRI_90103786.jpg?quality=90&strip=all&zoom=1&resize=644%2C362&ssl=1', 'title':'I\'m the best', 'time':200},
    {'category':'Joker', 'articleIdx':'2', 'userIdx':'', 'likeNum':15, 'photo':'https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/06/06/10/jared-leto-joker.jpg', 'title':'WTF!!', 'time':670},
    {'category':'Joker', 'articleIdx':'3', 'userIdx':'', 'likeNum':145, 'photo':'https://i.ytimg.com/vi/votcOf5cYCM/maxresdefault.jpg', 'title':'Why so serious?', 'time':550},
    {'category':'Joker', 'articleIdx':'4', 'userIdx':'', 'likeNum':120, 'photo':'https://movies-b26f.kxcdn.com/wp-content/uploads/2019/10/batmanjokerburtonbanner.jpg', 'title':'I love ketchup!', 'time':300},
    {'category':'Joker', 'articleIdx':'5', 'userIdx':'', 'likeNum':95, 'photo':'https://i.pinimg.com/originals/46/57/4f/46574f036dffa8a296ff0fad7730a8f9.jpg', 'title':'Keep your eyes down', 'time':900}
];
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