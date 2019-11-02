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

    recentsort:() =>{
        return new Promise((resolve, reject) =>{
                const rankingField = 'time';
                articleDB.sort(function(a, b) { // 오름차순
                    return b[rankingField] - a[rankingField];
                });
                resolve({
                    code:statusCode.OK,
                    json:authUtil.successTrue(responseMessage.RECENT_SORTING_SUCCESS, articleDB)
                });
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