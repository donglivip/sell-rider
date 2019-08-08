<template>
  <div class="wrapper">
    <!-- 主页 -->
    <div class="header">
      <div class="header-aside" @click="opennew('paotui-mai')">
        <img src="../../static/youjian.png">
      </div>
      <div class="header-content">
        <div class="header-text" @click="opennew('dingdanzhuangtai')" v-if="tabdata.usRtStatus!=2">订单状态</div>
        <div class="header-text header-zi">订单详情</div>
      </div>
      <div class="header-aside">
        <img src="../../static/gengduo.png" style="height: .4rem;" @click="buchu()">
      </div>
    </div>
    <div class="main">
      <div class="main-one">订单编号:{{tabdata.usReplaceTakeId}}</div>
      <div class="main-two">
        <div class="two-top">{{tabdata.usRtIsType | fen}}</div>
        <div class="two-bottom">
          <div class="two-box">
            <div class="two-text">{{tabdata.usRtWarm}}公里</div>
            <div class="two-news">距离</div>
          </div>
          <div class="two-box">
            <div class="two-text">{{tabdata.usRtPrice}}元</div>
            <div class="two-news">本单收入</div>
          </div>
        </div>
      </div>
      <div class="main-h">
        <div class="h-text">起</div>
        <div class="h-box">
          <div class="h-news">{{tabdata.usRtProvince}}</div>
          <div class="h-zi">{{tabdata.usRtDetails}}</div>
        </div>
      </div>
      <div class="main-three">
        <div class="three-text">终</div>
        <div class="three-box">
          <div class="three-news">{{tabdata.usAdsProvince}}</div>
          <div class="three-zi">{{tabdata.usAdsDetailed}}</div>
        </div>
      </div>
      <div class="main-four">
        <div class="four-text">备</div>
        <textarea class="four-news" placeholder="暂无备注" :value="tabdata.usRtRemarks" readonly="readonly"></textarea>
      </div>
      <div class="main-four">
        <div class="four-text">物</div>
        <textarea class="four-news" placeholder="暂无备注" :value="tabdata.maRtName" readonly="readonly"></textarea>
      </div>
      <div class="main-five">
        <div class="five-top">
          <div class="five-text" v-for="a in tabdata.maServiceRule">{{a}}</div>
          <div class="five-text" v-if="tabdata.usUpPrice!=null">已加价:{{tabdata.usUpPrice}}元</div>
        </div>
        <!-- <div class="five-content">收货人还没有邦跑腿，推荐收货人注册可以赚</div> -->
        <div class="five-bottom" v-if="tabdata.usRtStatus!=2">
          <a class="five-news" :href="'tel:'+tabdata.usAdsPhone">拨打下单电话</a>
          <!-- <div class="five-news">拨打取货电话</div>
					<div class="five-news">拨打收货电话</div> -->
        </div>
      </div>
    </div>
    <!-- 悬浮 -->
    <div class="dingdan" v-if="chu">
      <div class="d-box">
        <div class="d-top">
          <img src="../../static/ssss.png">
        </div>
        <div class="d-bottom">
          <div class="bottom-box" @click="zhuandan()">
            <img src="../../static/zhuanrang.png" style="height: .4rem;">
            <div class="d-text">转让订单</div>
          </div>
          <!-- <div class="bottom-box">
						<img src="../../static/quxiao.png">
						<div class="d-text">取消订单</div>
					</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dingdanxiangqing',
    data() {
      return {
        tabdata: [],
        chu: false
      }
    },
    methods: {
      zhuandan: function() {
        var that = this
        if (that.tabdata.usRtStatus == 3) {
          //		骑手转单
          $.ajax({
            type: 'post',
            url: that.myurl + '/purchase/transferOfOrder',
            data: {
              usOrderId: that.dingdanid,
              type: 2
            },
            success: function(res) {
              if (res.status == 200) {
                alert('转单成功')
                that.$router.back()
              } else {
                alert(res.msg)
              }
            },
            error: function(res) {
              alert('网络连接失败，请检查网络后再试！')
            }
          })
        } else {
          alert('不可转单')
        }

      },
      //显示与隐藏转单和取消订单
      buchu: function() {
        this.chu = !this.chu
      },
      myajax: function() {
        var that = this
        //			查询跑腿订单详情
        $.ajax({
          type: 'post',
          url: that.myurl + '/rider/queryOneRiderOrderPojo',
          data: {
            id: that.dingdanid
          },
          success: function(res) {
            if (res.status == 200) {
              that.tabdata = res.data
            } else {
              alert(res.msg)
            }
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
    mounted() {
      this.myajax()
    },
    computed: {
      myurl() {
        return this.$store.state.myurl
      },
      dingdanid() {
        return this.$store.state.dingdanid
      }
    },
    filters: {
      fen: function(id) {
        if (id == 1) {
          return '代购订单';
        } else if (id == 2) {
          return '帮我取';
        } else if (id == 3) {
          return '帮我送';
        }
      }
    }
  }
</script>

<style scoped>
  a {
    text-decoration: none;
  }

  /* 悬浮 */
  .dingdan {
    width: 100%;
    height: 100%;
  }

  .d-box {
    width: 2.5rem;
    position: fixed;
    top: .8rem;
    left: 4.5rem;
    z-index: 100;
  }

  .d-top {
    position: relative;
    top: .1rem;
    left: 1.9rem;
  }

  .d-top img {
    height: .3rem;
  }

  .d-bottom {
    padding: 0 .3rem;
    border-radius: .06rem;
    background: #FFFFFF;
    box-shadow: 2px 1px 5px 1px #D4D4D4;
  }

  .bottom-box {
    display: flex;
    align-items: content;
    justify-content: space-between;
    border-bottom: 1px solid #F7F7F9;
    padding: .2rem 0;
  }

  .bottom-box img {
    height: .3rem;
    margin-right: .2rem;
  }

  .d-text {
    font-size: .3rem;
    color: #021A13;
  }

  /* 主页 */
  .wrapper {
    background: #F7F7F9;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 .3rem;
    height: 1rem;
    background: #FFFFFF;
    margin-bottom: .2rem;
  }

  .header-aside {
    width: .3rem;
  }

  .header-aside img {
    height: .4rem;
  }

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 2.7rem;
  }

  .header-text {
    font-size: .28rem;
    color: #272727;

  }

  .header-zi {
    color: #FF8190;
    border-bottom: 4px solid #FF8190;
    width: .7rem;
    white-space: nowrap;
    text-indent: -.2rem;
    text-align: center;
    line-height: .6rem;
    border-radius: .04rem;
  }

  .main {
    height: calc(100% - 1rem);
    overflow-x: hidden;
    overflow-y: scroll;
    background: #FFFFFF;
  }

  .main-one {
    height: .8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .24rem;
    color: #979797;
    border-bottom: 1px solid #E4E4E6;
    margin: 0 .2rem;
  }

  .main-two {
    height: 2.7rem;
    background: #FFFFFF;
    border-bottom: 1px solid #E4E4E6;
    padding: 0 .3rem;
    margin: 0 .2rem;
  }

  .two-top {
    height: 1rem;
    font-size: .3rem;
    color: #000000;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .two-bottom {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .two-box {
    width: 3.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .two-text {
    font-size: .55rem;
    color: #FF8190;
    margin-bottom: .1rem;
  }

  .two-news {
    font-size: .28rem;
    color: #B8B8B8;
  }

  .main-h {
    display: flex;
    justify-content: flex-start;
    padding: .3rem;
  }

  .h-box {
    width: 5.9rem;
    flex: 1;
  }

  .h-text {
    font-size: .24rem;
    color: #FFFFFF;
    background: #FF8190;
    width: .4rem;
    height: .4rem;
    border-radius: .64rem;
    margin-right: .3rem;
    text-align: center;
    line-height: .4rem;
  }

  .h-news {
    font-size: .36rem;
    color: #272727;
    margin-right: .3rem;
    font-weight: 600;
    margin-bottom: .1rem;
  }

  .h-zi {
    font-size: .28rem;
    color: #979797;
  }

  .main-three {
    height: 1.3rem;
    display: flex;
    justify-content: flex-start;
    padding: 0 .3rem;
  }

  .three-box {
    width: 5.9rem;
    flex: 1;
  }

  .three-text {
    font-size: .24rem;
    color: #FFFFFF;
    background: #FF8190;
    width: .4rem;
    height: .4rem;
    border-radius: .72rem;
    margin-right: .3rem;
    text-align: center;
    line-height: .4rem;
  }

  .three-news {
    font-size: .36rem;
    color: #272727;
    word-break: break-all;
    height: .8rem;
    line-height: .4rem;
    flex: 1;
    overflow: hidden;
    font-weight: 600;
    margin-bottom: .1rem;
  }

  .three-zi {
    font-size: .28rem;
    color: #979797;
  }

  .main-four {
    height: 1rem;
    border-bottom: 1px solid #E4E4E6;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 .3rem;
  }

  .four-text {
    font-size: .24rem;
    color: #FFFFFF;
    background: #FF8190;
    width: .4rem;
    height: .4rem;
    border-radius: .72rem;
    margin-right: .3rem;
    text-align: center;
    line-height: .4rem;
  }

  .four-news {
    width: 4.9rem;
    height: .6rem;
    padding: 0 .2rem;
    border: 0;
    border: 1px dashed #D8D8D8;
    line-height: .6rem;
  }

  textarea::-webkit-input-placeholder {
    color: #FF8190;
  }

  .main-five {
    height: 2rem;
    padding: 0 .3rem;
  }

  .five-top {
    height: .8rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .five-text {
    font-size: .2rem;
    color: #1698FF;
    border: 1px solid #1698FF;
    padding: .04rem .1rem;
    border-radius: .08rem;
    margin-right: .2rem;
  }

  .five-content {

    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: .2rem;
    color: #000000;
    margin-bottom: .4rem;
  }

  .five-bottom {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .five-news {
    width: 2.2rem;
    height: .6rem;
    background: #1698FF;
    border-radius: .06rem;
    font-size: .22rem;
    color: #FFFFFF;
    text-align: center;
    line-height: .6rem;
    margin-right: .2rem;
  }
</style>
