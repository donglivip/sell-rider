<template>
  <div class="wrapper">
    <div class="header">
      <div class="header-aside" @click="back()"><img src="../../static/youjian.png" /></div>
      <div class="header-content">登录</div>
      <div class="header-aside"></div>
    </div>
    <div class="main">
      <div class="main-one">
        <div class="one-text">手机快捷登录</div>
        <div class="one-news">未注册的手机号将自动创建账号</div>
      </div>
      <div class="main-two">
        <input type="text" placeholder="请输入手机号" class="shouji" v-model="shouji" />
        <div class="two-text" @click="huoqu()">{{time==60?'获取验证码':time}}</div>
      </div>
      <div class="main-two"><input type="text" placeholder="请输入短信验证码" class="shouji" v-model="yanzheng" /></div>
      <div class="main-three" @click="myajax()">登录</div>
      <div class="main-four">
        <input type="checkbox" v-model="xieyi">
        <span @click="opennew('xieyi')">登陆即视为同意注册协议</span>
      </div>
    </div>
  </div>
</template>

<script>
  import weizhi from '../vuex/dingwei.js'
  export default {
    name: 'denglu',
    data() {
      return {
        tabdata: [],
        shouji: '',
        yanzheng: '',
        fasongdata: '',
        time: 60,
        xieyi: true
      };
    },
    methods: {
      timedata: function() {
        var that = this
        var shijian = setInterval(function() {
          if (that.time > 0) {
            that.time--
          } else {
            that.time = 60
            clearInterval(shijian)
          }
        }, 1000)
      },
      huoqu: function() {
        var that = this;
        if (that.shouji == '') {
          alert('手机号不能为空');
          return;
        }
        //			获取验证码
        $.ajax({
          type: 'post',
          url: that.myurl + '/user/usCityGetShortCode',
          data: {
            usCpPhone: that.shouji
          },
          success: function(res) {
            if (res.status == 200) {
              that.fasongdata = res.data
              that.timedata()
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
        if (that.shouji == '') {
          alert('手机号不能为空');
          return;
        }
        if(!(/^1[3456789]\d{9}$/.test(that.shouji))){
         alert("手机号格式错误")
         return false;
        }
        // if(that.yanzheng==''){
        // 	alert("验证码不能为空")
        // 	return
        // }
        // if(that.yanzheng!=that.fasongdata){
        // 	alert("验证码错误")
        // 	return
        // }
        if(that.xieyi==false){
          alert("请同意注册协议")
          return
        }
        //			骑手登录
        $.ajax({
          type: 'post',
          url: that.myurl + '/rider/login',
          data: {
            phone: that.shouji,
            usRiProvince: that.sheng,
            usRiCity: that.shi
          },
          success: function(res) {
            if (res.status == 200) {
              localStorage.setItem('name', res.data.usRiName) //姓名
              localStorage.setItem('myid', res.data.usRiderId) //骑手id
              localStorage.setItem('shouji', res.data.usRiPhone) //手机号
              localStorage.setItem('xingbie', res.data.usRiSex) //性别
              localStorage.setItem('touxiang', res.data.usRiHeadImgUrl) //头像
              localStorage.setItem('sheng', res.data.usRiProvince) //省
              localStorage.setItem('xiangxi', res.data.usRiDetailed) //详细地址
              localStorage.setItem('shenfen', res.data.usRiCardId) //身份证
              localStorage.setItem('shenfenzheng', res.data.usRiCardFrontImgUrl) //身份证正面照
              localStorage.setItem('shenfenfan', res.data.usRiCardBackImgUrl) //身份证背面照
              localStorage.setItem('shouchi', res.data.usRiCardHandheldImgUrl) //手持身份证照
              localStorage.setItem('peisongsheng', res.data.usRiServingProvince) //配送城市省
              localStorage.setItem('peisongshi', res.data.usRiServingCity) //配送城市
              localStorage.setItem('peisongqu', res.data.usRiServingArea) //配送区域
              localStorage.setItem('qishou', res.data.usRiBelong) //骑手所属
              localStorage.setItem('qishoulei', res.data.usRiStyle) //	骑手类型
              localStorage.setItem('cheng', res.data.usRiCity) //城市
              localStorage.setItem('qu', res.data.usRiArea) //区/县
              that.$router.push({
                name: 'index'
              })
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
      }
    },
    mounted() {},
    computed: {
      myurl() {
        return this.$store.state.myurl;
      },
      sheng() {
        return this.$store.state.sheng;
      },
      shi() {
        return this.$store.state.shi;
      }
    }
  };
</script>

<style scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.3rem;
    height: 1rem;
    border-bottom: 1px solid #979797;
  }
  .main-four{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: -.2rem .6rem 0 0  ;
  }
  .header-aside {
    width: 0.3rem;
  }

  .header-aside img {
    height: 0.4rem;
  }

  .header-content {
    font-size: 0.32rem;
    color: #000000;
  }

  .main-one {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 1.4rem;
    padding: 0 0.6rem;
  }

  .one-text {
    font-size: 0.34rem;
    color: #021a13;
    margin: 0.4rem 0 0.2rem 0;
  }

  .one-news {
    font-size: 0.24rem;
    color: #021a13;
  }

  .main-two {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0.4rem 0.6rem 0 0.6rem;
    border-bottom: 1px solid #eeeeee;
    padding: 0.1rem 0;
  }

  .shouji {
    border: 0;
    padding: 0 0.2rem;
    width: 3.8rem;
    border-left: 1px solid #eeeeee;
    font-size: .35rem;
  }

  input {
    outline: none;
  }
  input::-webkit-input-placeholder{
     font-size: .32rem!important;
  }
  .two-text {
    font-size: 0.24rem;
    color: #b8b8b8;
    padding: 0.1rem 0.2rem;
    border: 1px solid #d8d8d8;
    border-radius: 1rem;
    width: 2rem;
    box-sizing: border-box;
    text-align: center;
    white-space: nowrap;
  }

  input::-webkit-input-placeholder {
    font-size: 0.24rem;
    color: #b8b8b8;
  }

  .main-three {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.6rem;
    font-size: 0.34rem;
    color: #ffffff;
    background: #ff8190;
    height: 1rem;
    border-radius: 1rem;
  }
</style>
