const axios = require('axios')
const FormData = require('form-data');

const yt1sFoo = async (youtubeUrl) => {

    const res1 = await axios({
        method: 'post',
        url: 'https://yt1s.com/api/ajaxSearch/index',
        data: `q=${youtubeUrl}&vt=home`,
    });


    var data = new FormData();
    data.append('vid', res1.data.vid);
    data.append('k', res1.data.links.mp3.mp3128.k);

    var config = {
        method: 'post',
        url: 'https://yt1s.com/api/ajaxConvert/convert',
        headers: {
            // 'Cookie': '__cfduid=dd2c6af4196c68b9f5be2f061c63ccb171619904835',
            ...data.getHeaders()
        },
        data: data
    };


    const res99 = await axios(config)
    return res99.data.dlink
}

module.exports = yt1sFoo


