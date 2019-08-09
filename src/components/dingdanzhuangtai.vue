<template>
  <div class="wrapper">
    <div class="header">
      <div class="header-aside" @click="opennew('paotui-mai')"><img src="../../static/youjian.png" /></div>
      <div class="header-content">
        <div class="header-text header-zi">订单状态</div>
        <div class="header-text" @click="opennew('dingdanxiangqing')">订单详情</div>
      </div>
      <div class="header-aside"></div>
    </div>
    <div class="main">
      <div class="main-one">
        <div class="one-box">
          <img src="../../static/xuanse.png" v-if="tabdata.usRtClassify < 3" />
          <img src="../../static/xxxx.png" v-if="tabdata.usRtClassify >= 3" />
          <div class="one-news" :class="tabdata.usRtClassify >= 3 ? 'one-zi' : ''">取货</div>
        </div>
        <div class="one-text"></div>
        <div class="one-box">
          <img src="../../static/xuanse.png" v-if="tabdata.usRtClassify < 4" />
          <img src="../../static/xxxx.png" v-if="tabdata.usRtClassify >= 4" />
          <div class="one-news" :class="tabdata.usRtClassify >= 4 ? 'one-zi' : ''">送货</div>
        </div>
        <div class="one-text"></div>
        <div class="one-box">
          <img src="../../static/xuanse.png" v-if="tabdata.usRtClassify < 7" />
          <img src="../../static/xxxx.png" v-if="tabdata.usRtClassify >= 7" />
          <div class="one-news" :class="tabdata.usRtClassify >= 7 ? 'one-zi' : ''">完成</div>
        </div>
      </div>
      <div class="main-two">
        <div class="two-top">
          <div class="top-left">请前往:</div>
          <div class="top-right" v-if="tabdata.usRtClassify < 3">
            <div class="two-text">{{ tabdata.usRtProvince }}</div>
            <div class="two-news">{{ tabdata.usRtDetails }}</div>
          </div>
          <div class="top-right" v-if="tabdata.usRtClassify >= 3">
            <div class="two-text">{{ tabdata.usAdsProvince }}</div>
            <div class="two-text">{{ tabdata.usAdsDetailed }}</div>
            <div class="two-news"></div>
          </div>
        </div>
        <!-- 	<div class="two-bottom">请在<span>{{tabdata.minute}}分钟</span>内到达取货地点<span></span></div>	 -->
      </div>
      <div class="main-three" :class="tabdata.usRtClassify >= 1 ? 'bianse' : ''" @click="xiugai(2)">
        <div class="three-left">
          <img src="../../static/xuanze.png" v-if="tabdata.usRtClassify >= 1" />
          <img src="../../static/xuanse.png" v-if="tabdata.usRtClassify < 1" />
        </div>
        <div class="three-content">
          <h3 class="three-text">致电发货人(第一步)</h3>
          <p class="three-news">请先致电发货人确定地址和时间</p>
          <!-- <span class="fense">TA还未注册美邦跑腿用户，推荐有奖。</span> -->
        </div>
        <a class="three-right" :href="'tel:' + tabdata.usRtPhone">联系发货人</a>
      </div>
      <div class="main-three" :class="tabdata.usRtClassify >= 2 ? 'bianse' : ''" @click="xiugai(3)">
        <div class="three-left">
          <img src="../../static/xuanze.png" v-if="tabdata.usRtClassify >= 2" />
          <img src="../../static/xuanse.png" v-if="tabdata.usRtClassify < 2" />
        </div>
        <div class="three-content">
          <h3 class="three-text">我已到达(第二步)</h3>
          <p class="three-news">到达取货地点后点击</p>
        </div>
        <div class="three-right">我已到达</div>
      </div>
      <div class="main-three" :class="tabdata.usRtClassify >= 3 ? 'bianse' : ''">
        <div class="three-left">
          <img src="../../static/xuanze.png" v-if="tabdata.usRtClassify >= 3" />
          <img src="../../static/xuanse.png" v-if="tabdata.usRtClassify < 3" />
        </div>
        <div class="three-content">
          <h3 class="three-text">拍照取货(第三步)</h3>
          <span class="fense">为了避免货物纠纷，请在取货时进行检查并拍照存证。</span>
        </div>
        <div class="three-right" @click="upload()">拍照取货</div>
      </div>
      <div class="main-three" :class="tabdata.usRtClassify >= 4 ? 'bianse' : ''" @click="xiugai(5)">
        <div class="three-left">
          <img src="../../static/xuanze.png" v-if="tabdata.usRtClassify >= 4" />
          <img src="../../static/xuanse.png" v-if="tabdata.usRtClassify < 4" />
        </div>
        <div class="three-content">
          <h3 class="three-text">我已取货(第四步)</h3>
          <p class="three-news">取货后点击我已取货</p>
        </div>
        <div class="three-right">我已取货</div>
      </div>
      <div class="main-three" :class="tabdata.usRtClassify >= 5 ? 'bianse' : ''" @click="xiugai(6)">
        <div class="three-left">
          <img src="../../static/xuanze.png" v-if="tabdata.usRtClassify >= 5" />
          <img src="../../static/xuanse.png" v-if="tabdata.usRtClassify < 5" />
        </div>
        <div class="three-content">
          <h3 class="three-text">致电收货人(第五步)</h3>
          <p class="three-news">请先致电收货人确定地址和时间</p>
          <!-- <span class="fense">TA还未注册美邦跑腿用户，推荐有奖。</span> -->
        </div>
        <a class="three-right" :href="'tel:' + tabdata.usAdsPhone">联系收货人</a>
      </div>
      <div class="main-three" :class="tabdata.usRtClassify >= 6 ? 'bianse' : ''" @click="xiugai(7)">
        <div class="three-left">
          <img src="../../static/xuanze.png" v-if="tabdata.usRtClassify >= 6" />
          <img src="../../static/xuanse.png" v-if="tabdata.usRtClassify < 6" />
        </div>
        <div class="three-content">
          <h3 class="three-text">我已送达(第六步)</h3>
          <p class="three-news">到达收货地点后点击我已送达向用户发送验证码</p>
        </div>
        <div class="three-right">我已送达</div>
      </div>
      <div class="main-three" :class="tabdata.usRtClassify >= 7 ? 'bianse' : ''">
        <div class="three-left">
          <img src="../../static/xuanze.png" v-if="tabdata.usRtClassify >= 7" />
          <img src="../../static/xuanse.png" v-if="tabdata.usRtClassify < 7" />
        </div>
        <div class="three-content">
          <h3 class="three-text">输入验证码(第七步)</h3>
          <p class="three-news">请向收货人要取短信验证码</p>
        </div>
        <div class="three-right" @click="yanzheng()">收货验证码</div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-box" @click="daohang">
        <img src="../../static/daohang.png" />
        <div class="bottom-text">查看导航</div>
      </div>
    </div>
  </div>
</template>

<script>
  import AMap from 'AMap';
  import weizhi from '../vuex/dingwei';
  export default {
    name: 'dingdanzhuangtai',
    data() {
      return {
        tabdata: [],
        imgurl: '',
        uploadtarget: ''
      };
    },
    methods: {
      // 导航
      daohang: function() {
        var that = this,
          qi = '',
          zhong = ''
        if (that.tabdata.usRtClassify <= 4) {
          // 起点经纬度
          AMap.service('AMap.Geocoder', function() {
            //回调函数
            //			实例化Geocoder
            var geocoder = new AMap.Geocoder({
              city: '' //城市，默认：“全国”
            });
            //						根据地址查经纬度
            geocoder.getLocation(that.tabdata.usRtProvince + that.tabdata.usRtDetails, function(status, result) {
              if (status === 'complete' && result.info === 'OK') {
                console.log(result.geocodes[0].location);
                var dst = new plus.maps.Point(that.jing, that.wei); // 天安门
                var src = new plus.maps.Point(result.geocodes[0].location.O, result.geocodes[0].location.P); // 大钟寺
                // 调用系统地图显示
                plus.maps.openSysMap( src, that.tabdata.usRtProvince +that.tabdata.usRtDetails, dst);
              } else {
                //获取经纬度失败
              }
            });
          });
        } else {
          // 终点经纬度
          AMap.service('AMap.Geocoder', function() {
            //回调函数
            //			实例化Geocoder
            var geocoder = new AMap.Geocoder({
              city: '' //城市，默认：“全国”
            });
            //						根据地址查经纬度
            geocoder.getLocation(that.tabdata.usAdsProvince + that.tabdata.usAdsDetailed, function(status, result) {
              if (status === 'complete' && result.info === 'OK') {
                console.log(result.geocodes[0].location);
                var dst = new plus.maps.Point(that.jing, that.wei); // 天安门
                var src = new plus.maps.Point(result.geocodes[0].location.O, result.geocodes[0].location.P); // 大钟寺
                // 调用系统地图显示
                plus.maps.openSysMap(src, that.tabdata.usAdsProvince + that.tabdata.usAdsDetailed, dst);
              } else {
                //获取经纬度失败
              }
            });
          });
        }
      },

      //---base64上传图片------
      upload: function() {
        document.addEventListener('plusready', function() {
          plus.nativeUI.showWaiting();
        });
        var that = this;
        var btnArray = [{
            title: '照相机'
          },
          {
            title: '相册'
          }
        ]; //选择按钮  1 2 3
        plus.nativeUI.actionSheet({
            title: '请选择',
            cancel: '取消',
            buttons: btnArray
          },
          function(e) {
            var index = e.index;
            switch (index) {
              case 1:
                that.camera();
                break;
              case 2:
                that.album();
                break;
            }
          }
        );
      },
      camera: function() {
        var that = this;
        var cmr = plus.camera.getCamera();
        cmr.captureImage(
          function(p) {
            //成功
            plus.io.resolveLocalFileSystemURL(
              p,
              function(entry) {
                var img_name = entry.name;
                var img_path = entry.toLocalURL();
                that.upload_img(img_path);
              },
              function(e) {
                alert('读取拍照文件错误：' + e.message);
              }
            );
          },
          function(e) {
            alert('失败：' + e.message);
          }, {
            filename: '_doc/camera/',
            index: 1
          }
        );
      },
      album: function() {
        var that = this;
        plus.gallery.pick(
          function(path) {
            that.upload_img(path);
          },
          function(e) {
            alert('取消选择图片');
          }, {
            filter: 'image'
          }
        );
      },
      upload_img: function(p) {
        var thats = this;
        var img = new Image();
        img.src = p; // 传过来的图片路径在这里用。
        img.onload = function() {
          var that = this;
          //生成比例
          var w = that.width,
            h = that.height,
            scale = w / h;
          w = 280 || w; //480  你想压缩到多大，改这里
          h = w / scale;
          //生成canvas
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          $(canvas).attr({
            width: w,
            height: h
          });
          ctx.drawImage(that, 0, 0, w, h);
          $.ajax({
            type: 'post',
            url: thats.myurl + '/user/uploadImage',
            dataType: 'json',
            data: {
              imgStr: canvas.toDataURL('image/jpeg', 1 || 0.8)
            },
            success: function(res) {
              console.log('shangchuan');
              thats.imgurl = res.data;
              $.ajax({
                type: 'post',
                url: thats.myurl + '/rider/updateReplaceTakeDetailPhone',
                dataType: 'json',
                data: {
                  usReplaceTakeId: thats.dingdanid,
                  usRtdItemImgUrl: thats.imgurl
                },
                success: function(res) {
                  document.addEventListener('plusready', function() {
                    plus.nativeUI.closeWaiting();
                  });
                  thats.xiugai(4);
                }
              });
            },
            error: function() {
              console.log('err');
            }
          });
        };
      },

      xiugai: function(type) {
        var that = this,
          myphone=''
        //	修改订单状态
        if (type - that.tabdata.usRtClassify != 1&&type!=7) {
          return false;
        }
        // if (type!=5) {
        //   delete ajaxjson.usRtStatus
        // }
        if(that.tabdata.usRtIsType==1||that.tabdata.usRtIsType==2){
          myphone=that.tabdata.usAdsPhone
        }else{
          myphone=that.tabdata.usRtPhone
        }
        var ajaxjson= {
            usReplaceTakeId: that.dingdanid,
            usRtClassify: type,
            phone:myphone,
            usRtStatus:4
          }
        $.ajax({
          type: 'post',
          url: that.myurl + '/rider/upadteUsReplaceTakes',
          data:ajaxjson,
          success: function(res) {
            if (res.status == 200) {
              that.myajax();
              if(type==7){
                alert('验证码已发送')
              }
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
        //		查看订单状态
        $.ajax({
          type: 'post',
          url: that.myurl + '/rider/selectUsReplaceTakeAddressPojo',
          data: {
            long1: that.jing,
            lat1: that.wei,
            usReplaceTakeId: that.dingdanid
          },
          success: function(res) {
            if (res.status == 200) {
              if (res.data.length == 0) {
                alert('您未接单，不可查询订单状态');
                that.$router.back();
              }
              that.tabdata = res.data[0];
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
      yanzheng: function() {
        var that = this;
        var code = prompt('请输入验证码');
        if(that.tabdata.usRtClassify >= 7){
            return false
        }
        if (code == '' || code == null) {
          alert('验证码错误');
        } else {
          if (code == that.tabdata.maRtCompletionCode) {
            plus.nativeUI.showWaiting('完成中')
            // 完成订单
            $.ajax({
              type: 'post',
              url: that.myurl + '/purchase/updatePurchaseTakeDetailStatusCompleted',
              data: {
                usRiderId:localStorage.getItem('myid'),
                usReplaceTakeId : that.dingdanid
              },
              success: function(res) {
                plus.nativeUI.closeWaiting()
                if (res.status == 200) {
                  alert('订单已完成')
                  that.myajax()
                } else {
                  alert(res.msg);
                }
              },
              error: function(res) {
                plus.nativeUI.closeWaiting()
                alert('网络连接失败，请检查网络后再试！');
              }
            });
          } else {
            alert('验证码错误');
          }
        }
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
  a {
    text-decoration: none;
  }

  .wrapper {
    background: #f7f7f9;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.3rem;
    height: 1rem;
    background: #ffffff;
    margin-bottom: 0.2rem;
  }

  .header-aside {
    width: 0.3rem;
  }

  .header-aside img {
    height: 0.4rem;
  }

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 2.7rem;
  }

  .header-text {
    font-size: 0.28rem;
    color: #272727;
  }

  .header-zi {
    color: #ff8190;
    border-bottom: 4px solid #ff8190;
    width: 0.7rem;
    white-space: nowrap;
    text-indent: -0.2rem;
    text-align: center;
    line-height: 0.6rem;
    border-radius: 0.04rem;
  }

  .main {
    height: calc(100% - 2.6rem);
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .main-one {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.6rem;
    background: #ffffff;
    margin-bottom: 0.2rem;
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
    background: #ffffff;
    margin-bottom: 0.2rem;
    padding: 0 0.2rem;
  }

  .two-top {
    display: flex;
    justify-content: flex-start;
    height: 1.3rem;
    padding-top: 0.3rem;
  }

  .top-left {
    font-size: 0.24rem;
    color: #cacaca;
    width: 1rem;
  }

  .two-text {
    font-size: 0.28rem;
    color: #272727;
    margin-bottom: 0.1rem;
  }

  .two-news {
    font-size: 0.28rem;
    color: #929292;
  }

  .two-bottom {
    height: 1rem;
    width: 6.7rem;
    background: #faeaea;
    border: 1px dashed #ff8190;
    font-size: 0.28rem;
    color: #000000;
    text-align: center;
    line-height: 1rem;
    margin-top: 0.2rem;
    border-radius: 0.06rem;
  }

  span {
    color: #ff8190;
  }

  .main-three {
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 0.2rem;
    background: #ffffff;
    margin: 0 0.08rem;
  }

  .three-left img {
    height: 0.3rem;
    margin-right: 0.2rem;
  }

  .three-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
  }

  .three-text {
    font-size: 0.32rem;
    color: #cacaca;
    margin-bottom: 0.2rem;
  }

  .three-news {
    font-size: 0.24rem;
    color: #cacaca;
    margin-bottom: 0.1rem;
  }

  .fense {
    font-size: 0.24rem;
    color: #ff8190;
    word-break: break-all;
    line-height: 0.4rem;
    overflow: hidden;
  }

  .three-right {
    font-size: 0.24rem;
    color: #cacaca;
    border: 1px solid #979797;
    border-radius: 0.06rem;
    width: 1.8rem;
    height: 0.7rem;
    text-align: center;
    line-height: 0.7rem;
  }

  .bianse {
    background: #fffafa;
    border: 1px solid #ff8190;
    margin: 0 0.08rem;
    border-radius: 0.06rem;
  }

  .bianse .three-text {
    color: #000000;
  }

  .bianse .three-news {
    color: #000000;
  }

  .bianse .three-right {
    color: #ff8190;
    border: 1px solid #ff8190;
  }

  .bottom {
    height: 1.2rem;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 0.3rem;
    margin-top: 0.2rem;
  }

  .bottom-box {
    width: 1.4rem;
    height: 0.7rem;
    border: 1px solid #ff8190;
    border-radius: 0.06rem;
    padding: 0 0.3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .bottom img {
    height: 0.3rem;
  }

  .bottom-text {
    font-size: 0.24rem;
    color: #ff8190;
  }
</style>
