<template>
  <div class="wrapper">
    <!-- 首页 -->
    <div class="header">
      <div class="header-top">
        <div class="header-aside">
          <img src="../../static/wode.png" @click="xianshi()">
        </div>
        <div class="header-content">美邦跑腿</div>
        <div class="header-aside">
          <img src="../../static/tixing.png" @click="opennew('tongzhixiaoxi')">
        </div>
      </div>
      <div class="header-bottom">
        <div class="header-text header-news">首页</div>
        <div class="header-text" @click="opennew('peisong')">外卖</div>
        <div class="header-text" @click="opennew('paotui-mai')">跑腿</div>
        <div class="header-text" @click="opennew('renwu')">
          任务
          <div class="num">
            {{ydata}}
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="main-one">
        <div class="one-top">
          <div class="one-left">
            今日在线{{worktime}}
          </div>
          <div class="one-right">
          </div>
        </div>
        <!-- 配送 -->
        <div class="one-contenr">
          <div class="content-left">
            <div class="content-text">{{wdata.count}}</div>
            <div class="content-news">今日完成</div>
          </div>
          <div class="content-content">
           <img src="../../static/234564.jpg" v-if="tdata.usRiHeadImgUrl ==null">
           <img :src="myurl + tdata.usRiHeadImgUrl"  v-if="tdata.usRiHeadImgUrl !=null">
          </div>
          <div class="content-right">
            <div class="content-text">{{wdata.price}}</div>
            <div class="content-news">今日收益</div>
          </div>
        </div>
        <div class="one-bottom">
          <div class="bottom-left">我在:</div>
          <div class="bottom-content">
            <swiper :options="swiperOption" ref="mySwiper">
              <!-- 这部分放你要渲染的那些内容 -->
              <swiper-slide>
                ({{jing}}, {{wei}})
              </swiper-slide>
              <swiper-slide>
                {{wanzheng}}
              </swiper-slide>
            </swiper>
          </div>
          <div class="bottom-right" @click="reset">
            <img src="../../static/shuaxin.png">
            <div class="one-word">刷新</div>
          </div>
        </div>
      </div>
      <p>当前可同时接单数：{{kdata}} 单。</p>
      <div class="main-two">
        <div class="two-box">
          <img src="../../static/erweima.png">
          <div class="two-text">推荐骑手</div>
        </div>
        <div class="two-box">
          <img src="../../static/erweima.png">
          <div class="two-text">推荐用户</div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-text" @click="openwork()">{{workstate==0?'开始接单':'停止接单'}}</div>
    </div>
    <!-- 首页-我的 -->
    <div class="mengceng" v-if="wode" @click="dian">
      <div class="m-box">
        <div class="m-top">
          <img src="../../static/234564.jpg" v-if="tdata.usRiHeadImgUrl ==null">
          <img :src="myurl + tdata.usRiHeadImgUrl"  v-if="tdata.usRiHeadImgUrl !=null">
          <div class="m-text">{{tdata.usRiName==null?'未实名骑手':tdata.usRiName}}</div>
        </div>
        <div class="m-coment" @click.stop="opennew('waimaidingdan')">
          <img src="../../static/wodedingdan.png">
          <div class="m-news">我的订单</div>
        </div>
        <div class="m-coment" @click.stop="opennew('renzheng02')">
          <img src="../../static/yirenzheng.png">
          <div class="m-news">实名认证</div>
        </div>
        <div class="m-coment" @click.stop="opennew('caiwuzhongxin')">
          <img src="../../static/caiwu.png">
          <div class="m-news">财务中心</div>
        </div>
        <div class="m-coment" @click.stop="opennew('fuwuzhongxin')">
          <img src="../../static/kefu.png">
          <div class="m-news">服务中心</div>
        </div>
        <div class="m-coment" @click.stop="opennew('jiaonayajin')">
          <img src="../../static/guanyu.png">
          <div class="m-news">缴纳押金</div>
        </div>
        <a class="m-coment" href="tel:0572-5129628">
          <img src="../../static/qq.png">
          <div class="m-news">在线客服</div>
        </a>
        <div class="m-coment" @click.stop="opennew('rule')">
          <img src="../../static/rule.png">
          <div class="m-news">服务标准</div>
        </div>
        <div class="m-coment" @click.stop="opennew('aboutus')">
          <img src="../../static/about.png">
          <div class="m-news">关于我们</div>
        </div>
        <div class="m-bottom" @click="opennew('denglu')">退出登录</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: 'shouye',
    data() {
      return {
        tabdata: [],
        wode: false,
        wdata: '',
        kdata: 0,
        ydata:0,
        tdata: '',
        swiperOption: {
        	autoplay: {
        		stopOnLastSlide: true,
        	},
        	loop: true,
          slidesPerView: 'auto',
          loopedSlides: 2
        },
        workstate:0,
        worktime:'时间计算中'
      }
    },
    methods: {
      openwork:function(){
        // 切换工作状态
        plus.nativeUI.showWaiting('开启中')
        var that=this
         $.ajax({
          type: 'post',
          url: that.myurl + '/rider/insertRiderWorkTime',
          dataType: 'json',
          data: {
            id: localStorage.getItem('myid'),
            type:that.workstate==0?1:2
          },
          success: function(res) {
             plus.nativeUI.closeWaiting()
            if (res.status == 200) {
              if(that.workstate==0){
                that.opennew('peisong')
              }else{
                that.workstate=0
              }

            } else {
              alert(res.msg)
            }
          },
          error: function(res) {
            alert('网络连接失败，请检查网络后再试！')
          }
        })
      },
      reset: function() {
        plus.nativeUI.showWaiting('定位中')
        setTimeout(function() {
          plus.nativeUI.closeWaiting()
          plus.nativeUI.toast('刷新完成')
        }, 1000)
      },
      //点击切换跑腿和配送
      xuan: function(id) {
        this.x = id
      },
      //判断配送和跑腿内容的出现
      qie: function(id) {
        this.x = id
      },
      // 点击蒙层返回主页
      dian: function() {
        this.wode = false
      },
      // 点击我的小图标显示蒙层
      xianshi: function() {
        this.wode = true
      },
      myajax: function() {
        var that = this
        // plus.nativeUI.showWaiting('信息查询中')

        //			 查询今日外卖已完成订单数量
        $.ajax({
          type: 'post',
          url: that.myurl + '/rider/queryAllOrderToday',
          dataType: 'json',
          data: {
            id: localStorage.getItem('myid')
          },
          success: function(res) {
            if (res.status == 200) {
              that.wdata = res.data
            } else {
              alert(res.msg)
            }
          },
          error: function(res) {
            alert('网络连接失败，请检查网络后再试！')
          }
        })
        //			 查询可接单数
        $.ajax({
          type: 'post',
          url: that.myurl + '/rider/queryRiderLastNum',
          data: {
            id: localStorage.getItem('myid')
          },
          dataType: 'json',
          success: function(res) {
            if (res.status == 200) {
              that.kdata = res.data
            } else {

            }
          },
          error: function(res) {
            alert('网络连接失败，请检查网络后再试！')
          }
        })
         //			 查询已接单数
        $.ajax({
          type: 'post',
          url: that.myurl + '/rider/queryRiderFristNum',
          data: {
            id: localStorage.getItem('myid')
          },
          dataType: 'json',
          success: function(res) {
            if (res.status == 200) {
              that.ydata = res.data
            } else {
              alert(res.msg)
            }
          },
          error: function(res) {
            alert('网络连接失败，请检查网络后再试！')
          }
        })
        //			 查询头像和用户名
        $.ajax({
          type: 'post',
          url: that.myurl + '/rider/selectUsRiderName',
          data: {
            usRiderId : localStorage.getItem('myid')
          },
          dataType: 'json',
          success: function(res) {
            if (res.status == 200) {
              that.tdata = res.data
            } else {
              alert(res.msg)
            }
          },
          error: function(res) {
            alert('网络连接失败，请检查网络后再试！')
          }
        })
        //查询骑手工作状态
        $.ajax({
          type: 'post',
          url: that.myurl + '/rider/queryUsRiderState',
          data: {
            id: localStorage.getItem('myid')
          },
          dataType: 'json',
          success: function(res) {
            if (res.status == 200) {
              that.workstate = res.data.state
              that.worktime = res.data.time
            }
             plus.nativeUI.closeWaiting()
          },
          error: function(res) {
            alert('网络连接失败，请检查网络后再试！')
          }
        })
      },
      back: function() {
        this.$router.back()
      },
      opennew: function(target, id) {
        this.$store.state.msdNewsId = id
        this.$router.push({
          name: target
        })
      }
    },
    created() {

      if (localStorage.getItem('myid') == null || localStorage.getItem('myid') == undefined) {
        this.$router.push({
          name: 'denglu'
        })
      }
      var that=this
      that.myajax()
      function plusReady() {
        that.myajax()
      	plus.runtime.getProperty(plus.runtime.appid, function(inf) {
      		$.ajax({
      			type: "post",
      			url: that.myurl + "/showVersion",
      			dataType: 'json',
      			success: function(res) {
      				if (res.data != null ? res.data.bpAvRiderNum != inf.version : false) {
      					//										版本更新
      					plus.nativeUI.toast("正在为您更新版本~");
      					plus.downloader.createDownload(that.myurl + res.data.bpAvRiderAppUrl, {
      						filename: "_doc/update/"
      					}, function(d, status) {
      						if (status == 200) {
      							plus.runtime.install(d.filename, {}, function() {
      								plus.nativeUI.alert("应用资源更新完成！点击重启！", function() {
      									plus.runtime.restart();
      								});
      							}, function(e) {
      								plus.nativeUI.alert("安装更新包失败[" + e.code + "]：" + e.message);
      							});
      						} else {
      							plus.nativeUI.alert("下载更新包失败！");
      						}
      					}).start();
      				}
      			}
      		});
      	});
      }
      if (window.plus) {
      	plusReady();
      } else {
      	document.addEventListener("plusready", plusReady, false);
      }
    },
    computed: {
      myurl() {
        return this.$store.state.myurl
      },
      jing() {
        return this.$store.state.jing
      },
      wei() {
        return this.$store.state.wei
      },
      qu() {
        return this.$store.state.qu
      },
      shi() {
        return this.$store.state.shi
      },
      wanzheng() {
        return this.$store.state.wanzheng
      },
      swiper() {
					return this.$refs.mySwiper.swiper;
				}
    },
    components: {
    	swiper,
    	swiperSlide
    }
  }
</script>

<style scoped>
  /* 蒙层 */
  .mengceng {
    background: rgba(0, 0, 0, .5);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }
a{
  text-decoration: none;
}
  .m-box {
    width: 5.8rem;
    height: 100%;
    background: #F7F7F9;
  }
  p{
    margin: 0 auto .2rem auto;
    text-align: center;
    color: #FF8A97;
  }
  .m-top {
    height: 2.4rem;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 .3rem;
    margin-bottom: .1rem;
  }

  .m-top img {
    width: 1.2rem;
    height: 1.2rem;
    margin-right: .4rem;
    border-radius: .72rem;
  }

  .m-text {
    font-size: .32rem;
    color: #272727;
  }

  .m-coment {
    height: .8rem;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 .3rem;
    margin-bottom: .1rem;
  }

  .m-coment img {
    height: .4rem;
    margin-right: .2rem;
  }

  .m-news {
    font-size: .28rem;
    color: #272727;
  }

  .m-bottom {
    width: 2.6rem;
    height: .6rem;
    border: 1px solid #929292;
    font-size: .28rem;
    color: #272727;
    border-radius: .08rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: .4rem;
    left: 1.5rem;
  }

  /* 首页 */
  .wrapper {
    background: #F7F7F9;
  }

  .header {
    height: 2rem;
    background: #FFFFFF;
  }

  .header-top {
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 .3rem;
  }

  .header-aside {
    width: .3rem;
  }

  .header-aside img {
    height: .35rem;
  }

  .header-content {
    font-size: .32rem;
    color: #000000;
  }

  .header-bottom {
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

    .header-text {
    font-size: 0.32rem;
    height: 0.8rem;
    line-height: 0.8rem;
    box-sizing: border-box;
    width: 0.4rem;
    white-space: nowrap;
    text-indent: -0.14rem;
    position: relative;
  }

.header-text .num{
  position: absolute;
  width: .3rem;
  height: .3rem;
  border-radius: 50%;
  top: 0rem;
  right: -.3rem;
  background: red;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .2rem;
  text-indent: 0;
}
  .header-news {
    color: #000000;
    border-bottom: 3px solid #ff8a97;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    font-weight: 600;
  }

  .main {
    height: calc(100% - 3.6rem);
    overflow: hidden;
  }

  .main-one {
    height: 4.8rem;
    background: #FFFFFF;
    margin: .2rem;
    border-radius: .08rem;
  }

  .one-top {
    height: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 .3rem;
    border-bottom: 1px dashed #979797;
  }

  .one-left {
    font-size: .3rem;
    color: #979797;
  }

  .one-right {
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: 1px solid #FF8A97;
    border-radius: .12rem;
    overflow: hidden;
  }

  .one-text {
    font-size: .24rem;
    color: #FFFFFF;
    background: #FF8A97;
    padding: .1rem .3rem;
    border-top-left-radius: .08rem;
    border-bottom-left-radius: .08rem;
  }

  .one-news {
    font-size: .24rem;
    color: #FF8A97;
    background: #FFFFFF;
    padding: .1rem .3rem;
    border-top-right-radius: .08rem;
    border-bottom-right-radius: .08rem;
  }

  .one-rouder {
    color: #FFFFFF;
    background: #FF8A97;
  }

  .one-contenr {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 2.4rem;
    margin-top: .2rem;
    border-bottom: 1px solid #D8D8D8;
  }

  .content-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .content-text {
    font-size: .4rem;
    color: #FF8A97;
    margin-bottom: .1rem;
  }

  .content-news {
    font-size: .3rem;
    color: #000000;
  }

  .content-content {
    width: 1.2rem;
    height: 1.2rem;
  }

  .content-content img {
    height: 100%;
    width: 100%;
    border-radius: .72rem;
  }

  .content-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .one-bottom {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 .3rem;
    height: .9rem;
  }

  .bottom-left {
    font-size: .24rem;
    color: #979797;
    margin-right: .2rem;
  }

  .bottom-content {
    font-size: .24rem;
    color: #000000;
    width: 4.2rem;
  }

  .bottom-right {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
  }

  .bottom-right img {
    height: .3rem;
  }

  .one-word {
    font-size: .24rem;
    color: #FF8A97;
    margin-left: .1rem;
  }

  .main-two {
    height: 3.4rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 0 .2rem .9rem .2rem;
    background: #FFFFFF;
    border-radius: .12rem;
  }

  .two-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .two-box img {
    height: 1.6rem;
    border: 1px dashed #979797;
    border-radius: .12rem;
    padding: .06rem;
  }

  .two-text {
    font-size: .3rem;
    color: #000000;
    margin-top: .2rem;
  }

  .bottom {
    height: 1.6rem;
    background: #FFFFFF;
    position: relative;
  }

  .bottom-text {
    background: #FF8A97;
    height: 1.6rem;
    width: 1.6rem;
    border-radius: 50%;
    font-size: .32rem;
    color: #FFFFFF;
    text-align: center;
    line-height: 1.6rem;
    position: absolute;
    bottom: .4rem;
    left: 2.7rem;
    border: 6px solid #FFFFFF;
  }
</style>
