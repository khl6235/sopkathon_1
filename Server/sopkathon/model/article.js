const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');

const articleDB = [
    {'category':'Joker', 'articleIdx':'1', 'userIdx':'', 'likeNum':'178', 'photo':'https://i2.wp.com/metro.co.uk/wp-content/uploads/2019/10/PRI_90103786.jpg?quality=90&strip=all&zoom=1&resize=644%2C362&ssl=1', 'title':'I\'m the best'},
    {'category':'Joker', 'articleIdx':'2', 'userIdx':'', 'likeNum':'150', 'photo':'https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/06/06/10/jared-leto-joker.jpg', 'title':'WTF!!'},
    {'category':'Joker', 'articleIdx':'3', 'userIdx':'', 'likeNum':'145', 'photo':'https://i.ytimg.com/vi/votcOf5cYCM/maxresdefault.jpg', 'title':'Why so serious?'},
    {'category':'Joker', 'articleIdx':'4', 'userIdx':'', 'likeNum':'120', 'photo':'https://movies-b26f.kxcdn.com/wp-content/uploads/2019/10/batmanjokerburtonbanner.jpg', 'title':'I love ketchup!'},
    {'category':'Joker', 'articleIdx':'5', 'userIdx':'', 'likeNum':'95', 'photo':'https://i.pinimg.com/originals/46/57/4f/46574f036dffa8a296ff0fad7730a8f9.jpg', 'title':'Keep your eyes down'},
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