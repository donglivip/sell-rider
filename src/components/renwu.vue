<template>
  <div class="wrapper">
    <!-- 主页 -->
    <div class="header">
      <div class="header-top">
        <div class="header-aside"><img src="../../static/wode.png" @click="xianshi()" /></div>
        <div class="header-content">美邦跑腿</div>
        <div class="header-aside"><img src="../../static/tixing.png" @click="opennew('tongzhixiaoxi')" /></div>
      </div>
      <div class="header-bottom">
        <div class="header-text" @click="opennew('index')">首页</div>
        <div class="header-text" @click="opennew('peisong')">外卖</div>
        <div class="header-text" @click="opennew('paotui-mai')">跑腿</div>
        <div class="header-text header-news">任务</div>
      </div>
    </div>
    <div class="main">
      <div class="main-one">
        <div class="one-top">
          <div class="top-text top-news">外卖订单</div>
          <div class="top-text" @click="opennew('renwu02')">跑腿订单</div>
        </div>
        <div class="one-bottom">
          <div class="one-text" :class="myindex == 2 ? 'one-news' : ''" @click="bian(2)">待取货</div>
          <div class="one-text" :class="myindex == 3 ? 'one-news' : ''" @click="bian(3)">待送达</div>
          <div class="one-text" :class="myindex == 1 ? 'one-news' : ''" @click="bian(1)">已完成</div>
        </div>
      </div>
      <div class="box">
        <div class="main-box" v-for="i in tabdata" @click="dian02(i.usOrderId)">
          <div class="main-a">
            <div class="a-zi">#{{ i.usOrNum }}</div>
            <div class="a-han">{{ i.usTsCompanyName }}</div>
            <div class="a-time">{{ i.usOrClaimTimeString }}送达</div>
          </div>
          <div class="main-b">
            <div class="b-left">取</div>
            <div class="b-content" @click.stop="daohang(i.usTsCoordinatesLongitude,i.usTsCoordinatesDimension)">
              <div class="b-top">
                <div class="b-text">{{ i.usTsArea }}</div>
                <div class="b-news">{{ i.companyDistance }}km</div>
              </div>
              <div class="b-bottom">{{ i.usTsDetailed }}</div>
            </div>
            <div class="b-right">
              <a :href="'tel:' + i.usTsContactPhone"><img src="../../static/dianhua.png" /></a>
            </div>
          </div>
          <div class="main-b"  @click.stop="daohang(i.map.lng,i.map.lat)">
            <div class="b-left">送</div>
            <div class="b-content">
              <div class="b-top">
                <div class="b-text">{{ i.usAdsProvince }}</div>
                <div class="b-news">{{ i.userDistance }}km</div>
              </div>
              <div class="b-bottom">{{ i.usAdsDetailed }}</div>
            </div>
            <div class="b-right">
              <a :href="'tel:' + i.usAdsPhone"><img src="../../static/dianhua.png" /></a>
            </div>
          </div>
          <div class="main-c">
            <div class="c-text" v-if="myindex == 2" @click.stop="qu(i.usOrderId)">确认取货</div>
            <div class="c-text" v-if="myindex == 3" @click.stop="song(i.usOrderId)">确认送达</div>
            <div class="c-news" v-if="myindex == 2" @click.stop="zhuan(i.usOrderId)">转单</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 首页-我的 -->
    <div class="mengceng" v-if="wode" @click="dian">
      <div class="m-box">
        <div class="m-top">
          <img src="../../static/234564.jpg" />
          <div class="m-text">DD MOGUL</div>
        </div>
        <div class="m-coment" @click.stop="opennew('waimaidingdan')">
          <img src="../../static/wodedingdan.png" />
          <div class="m-news">我的订单</div>
        </div>
        <div class="m-coment" @click.stop="opennew('renzheng02')">
          <img src="../../static/yirenzheng.png" />
          <div class="m-news">实名认证</div>
        </div>
        <div class="m-coment" @click.stop="opennew('caiwuzhongxin')">
          <img src="../../static/caiwu.png" />
          <div class="m-news">财务中心</div>
        </div>
        <div class="m-coment" @click.stop="opennew('fuwuzhongxin')">
          <img src="../../static/kefu.png" />
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
  export default {
    name: 'renwu',
    data() {
      return {
        wode: false,
        tabdata: [],
        myindex: 2
      };
    },
    methods: {
       daohang: function(jing, wei) {
        var dst = new plus.maps.Point(that.jing, that.wei); // 天安门
        var src = new plus.maps.Point(jing,wei); // 大钟寺
        // 调用系统地图显示
        plus.maps.openSysMap(dst, "为您导航", src);
      },
      zhuan: function(id) {
        var that = this;
        plus.nativeUI.showWaiting('转单中')
        //	骑手转单
        $.ajax({
          type: 'post',
          url: that.myurl + '/purchase/transferOfOrder',
          data: {
            usOrderId: id,
            type: 1
          },
          success: function(res) {
            if (res.status == 200) {
              alert('转单成功');
              that.myajax();
            } else {
              alert(res.msg);
            }
            plus.nativeUI.closeWaiting()
          },
          error: function(res) {
             plus.nativeUI.closeWaiting()
            alert('网络连接失败，请检查网络后再试！');
          }
        });
      },
      song: function(id) {
        var that = this;
        plus.nativeUI.showWaiting('收货中')
        //		用户确认收货
        $.ajax({
          type: 'post',
          url: that.myurl + '/rider/riderTriderConfirmGoodsUser',
          data: {
            usOrderId: id,
            id:localStorage.getItem('myid')
          },
          success: function(res) {
             plus.nativeUI.closeWaiting()
            if (res.status == 200) {
              alert('收货成功');
              that.myajax();
            } else {
              alert(res.msg);
            }
          },
          error: function(res) {
             plus.nativeUI.closeWaiting()
            alert('网络连接失败，请检查网络后再试！');
          }
        });
      },
      qu: function(id) {
        var that = this;
        //		骑手确定收到商品
        plus.nativeUI.showWaiting('取货中')
        $.ajax({
          type: 'post',
          url: that.myurl + '/rider/riderTriderConfirmGoods',
          data: {
            usOrderId: id
          },
          success: function(res) {
            plus.nativeUI.closeWaiting()
            if (res.status == 200) {
              alert('取货成功');
              that.myajax();
            } else {
              alert(res.msg);
            }
          },
          error: function(res) {
            plus.nativeUI.closeWaiting()
            alert('网络连接失败，请检查网络后再试！');
          }
        });
      },
      //点击跳转--订单详情
      dian02: function(id) {
        this.$store.state.dingdanid = id;
        this.$router.push({
          name: 'xiangqing02'
        });
      },
      //点击切换已完成那一栏
      bian: function(index) {
        this.myindex = index;
        this.myajax();
      },
      myajax: function() {
        var that = this;
        document.addEventListener('plusready', function() {
          plus.nativeUI.showWaiting()
        });
        //			骑手订单中心
        $.ajax({
          type: 'post',
          url: that.myurl + '/rider/queryRiderOrderPojo',
          data: {
            id: localStorage.getItem('myid'),
            type: this.myindex,
            long1: that.jing,
            lat1: that.wei
          },
          success: function(res) {
            document.addEventListener('plusready', function() {
              plus.nativeUI.closeWaiting()
            });
            if (res.status == 200) {
              that.tabdata = res.data;
            } else {
              alert(res.msg);
            }
          },
          error: function(res) {
            document.addEventListener('plusready', function() {
              plus.nativeUI.closeWaiting()
            });
            alert('网络连接失败，请检查网络后再试！');
          }
        });
      },
      // 点击蒙层返回主页
      dian: function() {
        this.wode = false;
      },
      // 点击我的小图标显示蒙层
      xianshi: function() {
        this.wode = true;
      },
      back: function() {
        this.$router.back();
      },
      opennew: function(target, id) {
        this.$store.state.msdNewsId = id;
        this.$router.push({
          name: target
        });
      }
    },
    mounted() {
 this.myajax();
    },
    computed: {
       myurl() {
        return this.$store.state.myurl;
      },
      dingdanid() {
        return this.$store.state.dingdanid;
      },
      jing() {
        return this.$store.state.jing;
      },
      wei() {
        return this.$store.state.wei;
      }
    }
  };
</script>

<style scoped>
  /* 蒙层 */
  .mengceng {
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }
a{
  text-decoration: none;
}
  .m-box {
    width: 5.8rem;
    height: 100%;
    background: #f7f7f9;
  }

  .m-top {
    height: 2.4rem;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 0.3rem;
    margin-bottom: 0.1rem;
  }

  .m-top img {
    width: 1.2rem;
    height: 1.2rem;
    margin-right: 0.4rem;
    border-radius: 0.72rem;
  }

  .m-text {
    font-size: 0.32rem;
    color: #272727;
  }

  .m-coment {
    height: 0.8rem;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 0.3rem;
    margin-bottom: 0.1rem;
  }

  .m-coment img {
    height: 0.4rem;
    margin-right: 0.2rem;
  }

  .m-news {
    font-size: 0.28rem;
    color: #272727;
  }

  .m-bottom {
    width: 2.6rem;
    height: 0.6rem;
    border: 1px solid #929292;
    font-size: 0.28rem;
    color: #272727;
    border-radius: 0.08rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0.4rem;
    left: 1.5rem;
  }

  /* 主页 */
  .wrapper {
    background: #f7f7f9;
  }

  .header {
    height: 2rem;
    background: #ffffff;
  }

  .header-top {
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.3rem;
  }

  .header-aside {
    width: 0.3rem;
  }

  .header-aside img {
    height: 0.3rem;
  }

  .header-content {
    font-size: 0.32rem;
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
  }

  .header-news {
    color: #000000;
    border-bottom: 3px solid #ff8a97;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    font-weight: 600;
  }

  .main {
    height: calc(100% - 2rem);
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .box {
    height: calc(100% - 2rem);
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .main-one {
    background: #ffffff;
  }

  .one-top {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ff8190;
    border-radius: 0.12rem;
    overflow: hidden;
    width: 4rem;
    margin: auto;
  }

  .top-text {
    font-size: 0.28rem;
    color: #ff8190;
    background: #ffffff;
    padding: 0.1rem 0.2rem;
    flex: 1;
    text-align: center;
  }

  .top-news {
    color: #ffffff;
    background: #ff8190;
  }

  .one-bottom {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 0.8rem;
  }

  .one-text {
    font-size: 0.28rem;
    color: #000000;
    box-sizing: border-box;
  }

  .one-news {
    font-size: 0.28rem;
    color: #ff8190;
    border-bottom: 2px solid #ff8190;
    width: 0.4rem;
    white-space: nowrap;
    line-height: 0.8rem;
    text-indent: -0.2rem;
  }

  .main-box {
    background: #ffffff;
    margin: 0.2rem;
    padding: 0 0.3rem;
    border-radius: 0.12rem;
  }

  .main-a {
    height: 1.1rem;
    border-bottom: 1px solid #d8d8d8;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .a-zi {
    font-size: 0.4rem;
    color: #272727;
    margin-right: 0.3rem;
  }

  .a-han {
    font-size: 0.36rem;
    color: #272727;
    flex: 1;
  }

  .a-time {
    font-size: 0.28rem;
    color: #ff8190;
  }

  .main-b {
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid #d8d8d8;
    padding: .1rem 0 .2rem;
  }

  .b-left {
    width: 0.36rem;
    height: 0.36rem;
    background: #ff8190;
    font-size: 0.22rem;
    color: #ffffff;
    text-align: center;
    line-height: 0.36rem;
    border-radius: 1rem;
    margin-top: 0.2rem;
  }

  .b-content {
    flex: 1;
  }

  .b-top {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .b-text {
    font-size: 0.32rem;
    color: #000000;
    margin: 0.2rem;
    flex: 1;
  }

  .b-news {
    font-size: 0.22rem;
    color: #ffffff;
    background: #ff8190;
    padding: 0.04rem 0;
    border-radius: 0.04rem;
    margin-left: 0.3rem;
    width: .8rem;
    text-align: center;
    margin-right: .2rem;
  }

  .b-bottom {
    font-size: 0.28rem;
    color: #929292;
    margin: 0 0.2rem;
  }

  .b-right {
    display: flex;
    align-items: center;
  }

  .b-right img {
    height: 0.5rem;
  }

  .main-c {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .c-text {
    font-size: 0.28rem;
    color: #ffffff;
    background: #ff8190;
    width: 3rem;
    height: 0.9rem;
    border-radius: 0.12rem;
    text-align: center;
    line-height: 0.9rem;
    flex: 1;
    margin: 0.3rem 0;
  }

  .c-news {
    font-size: 0.28rem;
    color: #ffffff;
    background: #ff8190;
    width: 3rem;
    height: 0.9rem;
    border-radius: 0.12rem;
    text-align: center;
    line-height: 0.9rem;
    margin-left: 0.2rem;
  }
</style>
