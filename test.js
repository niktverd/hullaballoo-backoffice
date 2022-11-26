const { Innertube } = require('youtubei.js');
(async () => {
    const youtube = await Innertube.create();
    const videoInfo = await youtube.getInfo('oGqWRwHiRX4');
    console.log(videoInfo);

})()