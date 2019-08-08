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
          <div class="top-text" @click="opennew('renwu')">外卖订单</div>
          <div class="top-text top-news">跑腿订单</div>
        </div>
        <div class="one-bottom">
          <div class="one-text" :class="myindex==1?'one-news':''" @click="bian(1)">全部</div>
          <div class="one-text" :class="myindex==2?'one-news':''" @click="bian(2)">待取货</div>
          <div class="one-text" :class="myindex==3?'one-news':''" @click="bian(3)">待送达</div>
        </div>
      </div>
      <div class="box">
        <div class="main-two" v-for="i in tabdata" @click="jump(i.usReplaceTakeId)">
          <div class="two-top">
            <div class="top-one">{{i.usRtIsType | txianshi}}</div>
            <div class="top-two" v-if="i.minute!=null">剩余收件时间：{{i.minute}}分钟</div>
             <div class="top-two" v-if="i.minute==null">订单已完成</div>
            <div class="top-three">
              <div class="top-zi">起</div>
              <div class="top-a">... ...</div>
              <div class="top-word">{{i.usRtWarm}}km</div>
              <div class="top-a">... ...</div>
              <div class="top-zi">终</div>
            </div>
          </div>
          <div class="two-bottom">
            <div class="bottom-one">
              <div class="bottom-text">起</div>
              <div class="bottom-news">{{i.usRtProvince}}{{i.usRtDetails}}</div>
            </div>
            <div class="bottom-two">
              <div class="bottom-zi">终</div>
              <div class="bottom-word">{{i.usAdsProvince}}{{i.usAdsDetailed}}</div>
            </div>
            <div class="bottom-three">查看详情</div>
            <!-- 						<div class="bottom-three" v-if="i.usRtStatus==3" @click.stop="dian(i.usReplaceTakeId,4)">确认取货</div>
      						<div class="bottom-three" v-if="i.usRtStatus==4" @click.stop="dian(i.usReplaceTakeId,6)">确认完成</div> -->
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
        myindex: 1
      };
    },
    methods: {
      jump: function(id) {
        this.$store.state.dingdanid = id
        this.$router.push({
          name: 'dingdanxiangqing'
        })
      },
      dian: function(id, type) {
        var that = this
        //	修改订单状态
        $.ajax({
          type: 'post',
          url: that.myurl + '/rider/upadteUsReplaceTakes',
          data: {
            usReplaceTakeId: id,
            usRtClassify: type,
            tupe: 2
          },
          success: function(res) {
            if (res.status == 200) {

            } else {
              alert(res.msg)
            }
          },
          error: function(res) {
            alert('网络连接失败，请检查网络后再试！')
          }
        })
      },
      bian: function(id) {
        this.myindex = id
        this.myajax()
      },
      myajax: function() {
        var that = this
        //		我的订单-跑腿订单
        $.ajax({
          type: 'post',
          url: that.myurl + '/rider/queryReplaceTakePojo',
          data: {
            id: localStorage.getItem('myid'),
            type: that.myindex,
            long1: that.jing,
            lat1: that.wei
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
        return this.$store.state.myurl
      },
      jing() {
        return this.$store.state.jing
      },
      wei() {
        return this.$store.state.wei
      }
    },
    filters: {
      txianshi: function(id) {
        if (id == 1) {
          return '代购订单'
        } else if (id == 2) {
          return '帮我取  '
        } else if (id == 3) {
          return '帮我送  '
        }
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
    color: #979797;
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
.box{
		height: calc(100% - 2rem);
		overflow-x: hidden;
		overflow-y: scroll;
	}
	.main-one{
		height: 1.7rem;
		background: #FFFFFF;
		padding-top: .2rem;
	}
	.one-top{
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #FF8190;
		border-radius: .12rem;
		overflow: hidden;
		width: 4rem;
		margin:  auto;
	}
	.top-text{
		font-size: .28rem;
		color: #FF8190 ;
		background: #FFFFFF;
		padding: .1rem .2rem;
		flex: 1;
		text-align: center;
	}
	.top-news{
		color: #FFFFFF ;
		background: #FF8190;

	}
	.one-bottom{
		display: flex;
		align-items: center;
		justify-content: space-around;
		height: .8rem;
		margin-top: .3rem;
	}
	.one-text{
		font-size: .28rem;
		color: #000000;
	}
	.one-news{
		font-size: .28rem;
		color: #FF8190;
		border-bottom: 2px solid #FF8190;
		width: .4rem;
		white-space: nowrap;
		line-height: .8rem;
		text-indent: -.2rem;
	}
	.main-two{
		height: 7.8rem;
		background: #FFFFFF;
		margin: .2rem;
		padding: 0 .3rem;
		border-radius: .12rem;
	}
	.two-top{
		height: 3.4rem;
		border-bottom: 1px solid #EEEEEE;
	}
	.top-one{
		height: 1rem;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		font-size: .3rem;
		color: #000000;
	}
	.top-two{
		height: 1.2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: .45rem;
		color: #000000;
	}
	.top-three{
		height: 1.2rem;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	.top-zi{
		font-size: .22rem;
		color: #FF8190;
		border: 1px solid #FF8190;
		width: .36rem;
		height: .36rem;
		border-radius: 1rem;
		text-align: center;
		line-height: .36rem;
	}
	.top-a{
		margin: 0 .83rem;
	}
	.top-word{
		font-size: .36rem;
		color: #000000;
	}
	.two-bottom{
		height: 4.4rem;
	}
	.bottom-one{
		height: 1rem;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-top: .4rem;
	}
	.bottom-text{
		width: 4.6rem;
		font-size: .22rem;
		color: #FFFFFF;
		background: #FF8190;
		width: .36rem;
		height: .36rem;
		border-radius: 1rem;
		margin-right: .3rem;
		text-align: center;
		line-height: .36rem;
	}
	.bottom-news{
		font-size: .34rem;
		color: #000000;
		width: 6rem;
		flex: 1;
	}
	.bottom-two{
		height: 1.2rem;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	.bottom-zi{
		font-size: .22rem;
		color: #FFFFFF;
		background: #FF8190;
		width: .36rem;
		height: .36rem;
		border-radius: 1rem;
		margin-right: .3rem;
		text-align: center;
		line-height: .36rem;
	}
	.bottom-word{
		width: 4.6rem;
		font-size: .32rem;
		color: #000000;
		height: 1rem;
		line-height: .5rem;
		word-break: break-all;
		overflow: hidden;
		width: 6rem;
		flex: 1;
	}
	.bottom-three{
		height: .9rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #FF8190;
		border-radius: .12rem;
		width: 6.2rem;
		margin-top: .4rem;
		font-size: .3rem;
		color: #FFFFFF;
	}
</style>
