<template>
  <div id="wrapper" class="about">
    <div class="header">
      <div class="header-aside" @click="back()"><img src="../../static/youjian.png" /></div>
      <div class="header-content">关于我们</div>
      <div class="header-aside">
        <!-- <img src="../../static/sou-suo.png" /> -->
      </div>
    </div>
    <div id="main">
      <img src="../../static/234564.jpg"></img>
      <div class="name">外卖</div>
      <div class="num">
        版本号: 1.3.0
      </div>
      <div class="group">
        <div class="title">
          邮箱
        </div>
        <div class="text">
          1076454380@qq.com
        </div>
      </div>
      <div class="group">
        <div class="title">
          官方公众号
        </div>
        <div class="text">
          1076454380@qq.com
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  name: 'aboutus',
  data () {
    return {

    }
  },
  mounted(){

  },
  methods:{
    back: function() {
      this.$router.back();
    },
		opennew:function(target){
			this.$router.push({
				name:target
			})
		}
  },
  computed:{

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
