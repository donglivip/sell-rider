<template>
  <div id="wrapper" class="about">
    <div class="header">
      <div class="header-aside" @click="back()"><img src="../../static/youjian.png" /></div>
      <div class="header-content">服务标准</div>
      <div class="header-aside">
        <!-- <img src="../../static/sou-suo.png" /> -->
      </div>
    </div>
    <div id="main">
      <div class="group" v-html="workstate[0].maPcContent" v-if="workstate.length!=0">

      </div>
    </div>
  </div>
</template>

<script>
  export default {
  name: 'rule',
  data () {
    return {
      workstate:''
    }
  },
  mounted(){
    this.myajax()
  },
  methods:{
    back: function() {
      this.$router.back();
    },
		opennew:function(target){
			this.$router.push({
				name:target
			})
		},
    myajax:function(){
      var that=this
       $.ajax({
        type: 'post',
        url: that.myurl + '/user/selectMaProtocolsName',
        dataType: 'json',
        data: {
          title: '服务标准'
        },
        success: function(res) {
            that.workstate=res.data
        },
        error: function(res) {
          alert('网络连接失败，请检查网络后再试！')
        }
      })
    }
  },
  computed:{
 myurl() {
        return this.$store.state.myurl
      },
  },
  components:{

  }
}
</script>

<style type="text/css" scoped="scoped">
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.3rem;
    height: 1rem;
    background: #ffffff;
  }

  .header-aside {
    width: 0.3rem;
  }

  .header-aside img {
    height: 0.4rem;
  }

  #main img {
    width: .6rem;
    height: .6rem;
    border-radius: .1rem;
    display: block;
    margin: 1.4rem auto 0;
  }

  .name {
    text-align: center;
    line-height: .7rem;
    font-weight: 600;
  }

  .num {
    text-align: center;
    color: #969696;
    margin-bottom: .2rem;
  }

  .group {
    background: white;
    display: flex;
    align-items: center;
    height: .7rem;
  }

  .title {
    margin: 0 .2rem;
  }

  .text {
    color: #969696;
    font-size: .2rem;
  }
</style>
