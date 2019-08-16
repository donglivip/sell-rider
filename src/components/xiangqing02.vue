<template>
  <div class="wrapper" v-if="chidata.length != 0">
    <div class="header">
      <div class="header-aside" @click="back()"><img src="../../static/youjian.png" /></div>
      <div class="header-content">订单详情</div>
      <div class="header-aside"></div>
    </div>
    <div class="main">
      <div id="map-container"></div>
      <div class="main-one">
        <div class="one-box">
          <img src="../../static/xxxx.png" v-if="tabdata.usOrIsCancel >= 1" />
          <img src="../../static/xuanse.png" v-if="tabdata.usOrIsCancel < 1" />
          <div class="one-news" :class="tabdata.usOrIsCancel >= 1 ? 'one-zi' : ''">取货</div>
        </div>
        <div class="one-text"></div>
        <div class="one-box">
          <img src="../../static/xxxx.png" v-if="tabdata.usOrIsCancel >= 2" />
          <img src="../../static/xuanse.png" v-if="tabdata.usOrIsCancel < 2" />
          <div class="one-news" :class="tabdata.usOrIsCancel >= 2 ? 'one-zi' : ''">送货</div>
        </div>
        <div class="one-text"></div>
        <div class="one-box">
          <img src="../../static/xxxx.png" v-if="tabdata.usOrIsCancel >= 3" />
          <img src="../../static/xuanse.png" v-if="tabdata.usOrIsCancel < 3" />
          <div class="one-news" :class="tabdata.usOrIsCancel >= 3 ? 'one-zi' : ''">完成</div>
        </div>
      </div>
      <div class="main-two">配送信息</div>
      <div class="main-box">
        <div class="main-b">
          <div class="b-left">起</div>
          <div class="b-content">
            <div class="b-top">
              <div class="b-text">{{ tabdata.traderAddress }}</div>
            </div>
            <div class="b-bottom">{{ tabdata.usAdsDetailed }}{{ tabdata.usTsCompanyName }}</div>
          </div>
          <div class="b-right">
            <a :href="'tel:' + tabdata.usTsPhone"><img src="../../static/dianhua.png" /></a>
          </div>
        </div>
        <div class="main-b">
          <div class="b-left">终</div>
          <div class="b-content">
            <div class="b-top">
              <div class="b-text">{{ tabdata.address }}</div>
            </div>
            <div class="b-bottom">{{ tabdata.usTsDetailed }}{{ tabdata.usNickname }}</div>
          </div>
          <div class="b-right">
            <a :href="'tel:' + tabdata.usPhone"><img src="../../static/dianhua.png" /></a>
          </div>
        </div>
      </div>
      <div class="main-two">产品信息</div>
      <div class="main-three">
        <div class="three-top">
          <div class="top-left">合计</div>
          <div class="top-right">¥ {{ chidata[0].usDetailsPrice }}</div>
        </div>
        <div class="three-content" v-for="i in chidata">
          <div class="content-left">
            <div class="content-text">{{ i.usTsName }}</div>
            <div class="content-text">{{ i.usOdNum }}</div>
          </div>
          <div class="content-right">¥ {{ i.usTsPrice }}</div>
        </div>
      </div>
      <div class="main-two">配送信息</div>
      <div class="main-three">
        <div class="three-content">
          <div class="content-left">
            <div class="content-text">包装费</div>
            <div class="content-text"></div>
          </div>
          <div class="content-right">¥ {{ tabdata.usOrPackingFee }}</div>
        </div>
        <div class="three-content">
          <div class="content-left">
            <div class="content-text">配送费</div>
            <div class="content-text"></div>
          </div>
          <div class="content-right">¥ {{ tabdata.usOrDeliveryPrice }}</div>
        </div>
      </div>
      <div class="main-two">发票信息</div>
      <div class="main-four">
        <div class="four-text">订单编号</div>
        <div class="four-text">{{ tabdata.usOrderId }}</div>
      </div>
      <div class="main-five" @click.stop="jie(tabdata.usOrderId)" v-if="tabdata.usOrRiStartus == 2">确认接单</div>
      <div class="main-five" @click.stop="qu(tabdata.usOrderId)" v-if="tabdata.usOrRiStartus == 1">确认取货</div>
      <div class="main-five" @click.stop="wancehng(tabdata.usOrderId)" v-if="tabdata.usOrRiStartus == 4">确认送货</div>
    </div>
  </div>
</template>

<script>
import AMap from 'AMap';
export default {
  name: 'xiangqing02',
  data() {
    return {
      tabdata: [],
      chidata: []
    };
  },
  methods: {
    wancehng: function(id) {
      var that = this;
      //		用户确认收货
      $.ajax({
        type: 'post',
        url: that.myurl + '/rider/riderTriderConfirmGoodsUser',
        data: {
          usOrderId: id,
          id: localStorage.getItem('myid')
        },
        success: function(res) {
          if (res.status == 200) {
            alert('送货成功');
            that.myajax();
          } else {
            alert(res.msg);
          }
        },
        error: function(res) {
          alert('网络连接失败，请检查网络后再试！');
        }
      });
    },
    jie: function(id) {
      var that = this;
      //		查询当前骑手有没有审核通过 通过返回
      $.ajax({
        type: 'post',
        url: that.myurl + '/rider/selectUsRiderByUsRiderIdRetrunOk',
        data: {
          usRiderId: localStorage.getItem('myid')
        },
        success: function(res) {
          if (res.status == 200) {
            //		骑手接单
            $.ajax({
              type: 'post',
              url: that.myurl + '/rider/triderReceipt',
              data: {
                usOrderId: id,
                usOrUpdateName: localStorage.getItem('name'),
                usRiderId: localStorage.getItem('myid'),
                lng: that.jing,
                lat: that.wei
              },
              success: function(res) {
                if (res.status == 200) {
                  //接单声音
                  var music = new Audio();
                  music.src = './static/jiedanchenggong.wav';
                  music.play();
                  alert('接单成功');
                  that.myajax();
                } else {
                  alert(res.msg);
                }
              },
              error: function(res) {
                alert('网络连接失败，请检查网络后再试！');
              }
            });
          } else {
            alert(res.msg);
          }
        },
        error: function(res) {
          alert('网络连接失败，请检查网络后再试！');
        }
      });
    },
    qu: function(id) {
      var that = this;
      //		骑手确定收到商品
      $.ajax({
        type: 'post',
        url: that.myurl + '/rider/riderTriderConfirmGoods',
        data: {
          usOrderId: id
        },
        success: function(res) {
          if (res.status == 200) {
            alert('取货成功');
            that.myajax();
          } else {
            alert(res.msg);
          }
        },
        error: function(res) {
          alert('网络连接失败，请检查网络后再试！');
        }
      });
    },
    myajax: function() {
      var that = this;
      //			骑手订单详情
      $.ajax({
        type: 'post',
        url: that.myurl + '/rider/riderDetails',
        data: {
          usOrderId: that.dingdanid
        },
        success: function(res) {
          if (res.status == 200) {
            that.tabdata = res.data.listUsTriderPojo[0];
            that.chidata = res.data.UsOrderDetaileUsTraderShoppingPojo;
          } else {
            alert(res.msg);
          }
        },
        error: function(res) {
          alert('网络连接失败，请检查网络后再试！');
        }
      });
    },
    back: function() {
      this.$router.back();
    },
    opennew: function(target, id) {
      this.$store.state.msdNewsId = id;
      this.$router.push({
        name: target
      });
    },
    // 导航
    daohang: function() {
      var that = this,
        qi = '',
        zhong = '';
      // 终点经纬度
      AMap.service('AMap.Geocoder', function() {
        var dst = new plus.maps.Point(that.jing, that.wei); // 天安门
        var src = new plus.maps.Point(that.tabdata.usUserAddressLng, that.tabdata.usUserAddressLat); // 大钟寺
        // 调用系统地图显示
        plus.maps.openSysMap(src, '', dst);
      });
    }
  },
  mounted() {
    this.myajax();
  },
  updated: function() {
    var that = this;
    var map = new AMap.Map('map-container', {
      zoom: 15,
      center: [that.jing, that.wei]
    });
    // 我的位置
    new AMap.Marker({
      map: map,
      position: [that.jing, that.wei],
      icon: new AMap.Icon({
        size: new AMap.Size(27, 33),
        image: './static/che.png'
      })
    });
    // 商家位置
    new AMap.Marker({
      map: map,
      position: [that.tabdata.usTsCoordinatesLongitude, that.tabdata.usTsCoordinatesDimension],
      icon: new AMap.Icon({
        size: new AMap.Size(27, 33),
        image: './static/dian.png'
      })
    });
    // 用户位置
    new AMap.Marker({
      map: map,
      position: [that.tabdata.usUserAddressLng, that.tabdata.usUserAddressLat],
      icon: new AMap.Icon({
        size: new AMap.Size(27, 33),
        image: './static/ren.png'
      })
    });
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
.wrapper {
  background: #f7f7f9;
}

.header {
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.3rem;
  background: #ffffff;
}

.header-aside {
  width: 0.3rem;
}

.header-aside img {
  height: 0.36rem;
}

.header-content {
  font-size: 0.36rem;
  color: #000000;
}

.main {
  height: calc(100% - 1rem);
  overflow-x: hidden;
  overflow-y: scroll;
}

#map-container {
  width: 100%;
  height: 5rem;
}

.main-one {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.6rem;
  background: #ffffff;
  margin: -1rem 0.2rem 0;
  border-radius: 0.06rem;
  z-index: 1000;
  position: relative;
}

.one-box {
  width: 0.3rem;
  height: 0.3rem;
}

.one-box img {
  height: 0.3rem;
  margin-bottom: 0.04rem;
}

.one-news {
  font-size: 0.24rem;
  color: #cacaca;
  white-space: nowrap;
  text-indent: -0.1rem;
}

.one-zi {
  color: #ff8190;
}

.one-text {
  width: 2rem;
  height: 0.02rem;
  background: #cacaca;
  margin: 0 0.04rem;
}

.main-two {
  font-size: 0.24rem;
  color: #929292;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0.3rem;
  border-left: 2px solid #ff8190;
  padding: 0 0.2rem;
}

.main-box {
  margin: 0 0.2rem;
  background: #ffffff;
  border-radius: 0.06rem;
  padding: 0 0.3rem;
}

.main-b {
  height: 1.7rem;
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid #f7f7f9;
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
}

.b-news {
  font-size: 0.22rem;
  color: #ffffff;
  background: #ff8190;
  padding: 0.04rem 0.2rem;
  border-radius: 0.04rem;
  margin-left: 0.3rem;
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

.main-three {
  margin: 0 0.2rem;
  border-radius: 0.06rem;
  background: #ffffff;
  padding: 0 0.3rem;
}

.three-top {
  height: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.top-left {
  font-size: 0.32rem;
  color: #929292;
}

.top-right {
  font-size: 0.32rem;
  color: brown;
}

.three-content {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0.2rem;
  padding: 0.2rem 0;
}

.content-left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
}

.content-text {
  font-size: 0.32rem;
  color: #000;
}

.content-right {
  font-size: 0.3rem;
  color: #000;
}

.main-four {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 1rem;
  margin: 0 0.2rem 0.3rem 0.2rem;
  padding: 0 0.3rem;
  background: #ffffff;
  border-radius: 0.06rem;
}

.four-text {
  font-size: 0.3rem;
  color: #000;
}

.main-five {
  font-size: 0.3rem;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ff8190;
  margin: 0.3rem 0.4rem;
  height: 0.9rem;
  border-radius: 0.06rem;
}
</style>
