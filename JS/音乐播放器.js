/*
1.https://autumnfish.cn/search 搜索歌曲路径
2.歌曲url获取接口
    请求地址：https://autumnfish.cn/song/url
    请求方法：get
    请求参数：id（查询关键字）
    响应内容：歌曲url地址
3.歌曲详情获取
    请求地址：https://autumnfish.cn/song/detail
    请求方法：get
    请求参数：id（查询关键字）
    响应内容：歌曲详情（包括封面信息）

5.mv地址获取
    请求地址：https://autumnfish.cn/mv/url
    请求方法：get
    请求参数：id（mvid,为0表示没有mv）
    响应内容：mv地址
*/

var app=new Vue({
    el:"#app",
    data:{
        //查询关键字
        query:"",
        //歌曲数组
        musicList:[],
        //歌曲地址
        musicUrl:"",
        //歌曲封面
        musicCover:"",
        //歌曲播放状态
        isPlaying:false,
        //遮罩层的显示状态
        isShow:false,
        //mv地址
        mvUrl:""
    },
    methods: {
        //歌曲搜索
        searchMusic: function () {
            if(this.query==0){
                return;
            }
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords=" + this.query)
                .then(function (response) {
                    //console.log(response);
                    that.musicList = response.data.result.songs;
                    //console.log(response.data.result.songs);
                }, function (err) {

                });
            //清空搜索

        },
        //歌曲播放
        playMusic: function (musicid) {
            //console.log(musicid);
            var that = this;
            //获取歌曲地址
            axios.get("https://autumnfish.cn/song/url?id=" + musicid)
                .then(function (response) {
                    //console.log(response);
                    //console.log(response.data.data[0].url);
                    that.musicUrl = response.data.data[0].url;
                }, function (err) {
                });
            //歌曲获取详情
            axios.get("https://autumnfish.cn/song/detail?ids=" + musicid)
                .then(function (response) {
                    //console.log(response.data.songs[0].al.picUrl);
                    // 设置封面
                    that.musicCover = response.data.songs[0].al.picUrl;
                }, function (err) {
                });
        },
        //歌曲播放
        play: function () {
            //console.log("play");
            this.isPlaying=true;this.query='';
            // 清空mv的信息
            this.mvUrl=''
        },
        //歌曲暂停
        pause: function () {
            //console.log("pause");
            this.isPlaying=false;
        },
        //播放mv
        playMv:function (mvid) {
            var that=this;
            axios.get("https://autumnfish.cn/mv/url?id="+mvid)
                .then(function (response) {
                    //console.log(response);
                    //console.log(response.data.data.url);
                    // 暂停歌曲播放
                    that.$refs.audio.pause();
                    that.isShow=true;
                    // 获取mv地址
                    that.mvUrl=response.data.data.url;
                },function (err) {  })
        },
        //mv隐藏
       closeMv:function () {
            this.isShow=false;
            this.$refs.video.pause();
        }

    }
});