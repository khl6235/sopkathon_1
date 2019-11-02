const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');

const articleDB = [];

module.exports = {
    readAll: () => {
        return new Promise((resolve, reject) => {
            //성공
            resolve({
                code:statusCode.OK,
                json:authUtil.successTrue(responseMessage.ARTICLE_READ_SUCCESS, articleDB)
            });
        });
    }

}