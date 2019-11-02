const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');

const articleDB = [
    {'category':'joker', 'articleIdx':'1', 'userIdx':'10', 'likeNum':'4', 'photo':'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=2ahUKEwia29yyjczlAhWT7WEKHSH1C2kQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.digitalspy.com%2Fmovies%2Fa29384592%2Fjoker-batman-twist-related-explained%2F&psig=AOvVaw2pMiQY2lQdooaBbZTfEV1n&ust=1572803939205593', 'title':'good'},
    {'category':'horror', 'articleIdx':'2', 'userIdx':'20', 'likeNum':'8', 'photo':'', 'title':'comeon'}
];
const categoryDB = [
    {'category':'joker', 'voteNum': 100},
    {'category':'shrek', 'voteNum':30},
    {'category':'horror', 'voteNum':70}
];

module.exports = {
    //게시글 생성
    create: (category, articleIdx, userIdx, likeNum, photo, title) => {
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
            if (!category || !articleIdx || !userIdx || !likeNum || !photo || !title){
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
                title
            };
            articleDB.push(article);
            const result = article;

            resolve({
                code:statusCode.OK,
                json:authUtil.successTrue(responseMessage.LIST_CREATE_SUCCESS, result)
            });
        });
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

            articleDB[articleIdx].likeNum += 1;
            //성공
            resolve({
                code:statusCode.OK,
                json:authUtil.successTrue(responseMessage.ARTICLE_UPDATE_SUCCESS, articleDB)
            });
        })
    }

}