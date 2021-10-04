const { _response } = require('../../utils/functions/response');
let https = require("https");

module.exports = {
    phnCustomize: (phnNo, res) => {

        /* REMOVE_UNWANTED_CHAR */
        let numberValidation,numberModify
        if (phnNo.length > 9) {
            numberModify = phnNo.substring(phnNo.indexOf('1') + 1);
            numberValidation = numberModify.replace(/[^0-9]/g, "");
        }else { numberValidation = phnNo }; 
        // else if(phnNo.length <= 9){ 
        //     numberValidation = numberModify.replace(/[^0-9]/g, "")
        //     numberValidation = phnNo 
        // };

        /* PHN_NO_VALID_9_DIGIT */
        if (numberValidation.length === process.env.PHONE_NUMBER_DIGITS - 2) {
            return phnNo = '+8801' + numberValidation
        } else { return phnNo = null }

    },

    /* PAGINATION */
    getPagination: (page, size) => {

        const limit = size ? +size : 10;
        const offset = page - 1 ? (page - 1) * limit : 0;
        console.log('limit:' + limit, 'offset' + offset);
        return { limit, offset };

    },

    /* PAGINATION FORMAT */
    getPagingData: (data, page, limit) => {

        const { count: totalItems, rows: records } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, totalPages, currentPage, records };

    },

    /* OTP_SENDING */
    otpSending: async (phnNo, otp) => {
        const message = process.env.OTP_WELCOME;

        let options = {
            host: 'vas.banglalink.net',
            path: '/sendSMS/sendSMS?msisdn=' + phnNo + '&message=' + message + otp + '&userID=OLYMPIC&passwd=OlympicAPI@019&sender=Greeho.com',
            method: 'POST'
        };

        let request = https.request(options, function (responce) {
            var body = '';
            responce.on("data", function (chunk) {
                body += chunk.toString('utf8');
            });
            responce.on("end", function () {
                console.log("Body", body);
            });
        });

        request.end();
    },
}