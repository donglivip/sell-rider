<template>
	<div class="wrapper">
		<!-- 主页 -->
		<div class="header">
			<div class="header-aside">
				<img src="../../static/youjian.png">
			</div>
			<div class="header-content">
				<div class="header-text header-zi">订单详情</div>
			</div>
			<div class="header-aside">
				<img src="../../static/gengduo.png" style="height: .4rem;">
			</div>
		</div>
		<div class="main">
			<div class="main-one">订单编号:xxxxxxxxxxxxxxx</div>
			<div class="main-two">
				<div class="two-top">帮我买</div>
				<div class="two-bottom">
					<div class="two-box">
						<div class="two-text">15.6公里</div>
						<div class="two-news">距离</div>
					</div>
					<div class="two-box">
						<div class="two-text">16.80元</div>
						<div class="two-news">本单收入</div>
					</div>
				</div>
			</div>
			<div class="main-h">
				<div class="h-text">起</div>
				<div class="h-box">
					<div class="h-news">淮海环球港科技大厦</div>
					<div class="h-zi">店面</div>
				</div>
			</div>
			<div class="main-three">
				<div class="three-text">终</div>
				<div class="three-box">
					<div class="three-news">贾汪区金龙湖大道淮海路淮海环球港奥特莱斯</div>
					<div class="three-zi">二楼西餐厅</div>
					<img src="../../static/dianhua.png" class="dianhua">
				</div>
			</div>	
			<div class="main-four">
				<div class="four-text">物品名称：香烟</div>
			</div>
			<div class="main-four">
				<div class="four-text">购买时间：2018.9.20  20:00</div>
			</div>
			<div class="main-four">
				<div class="four-text">优惠卷：-3</div>
			</div>
			<div class="main-four">
				<div class="four-text">小费：+3</div>
			</div>
			<div class="main-four">
				<div class="four-text">其他服务：</div>
				<div class="four-news">保温箱</div>
			</div>
			<div class="main-five">
				<div class="five-bottom">
					<div class="five-news">转单</div>
					<div class="five-news">导航过去</div>
					<div class="five-news">完成订单</div>
				</div>
			</div>			
		</div>		
		<!-- 悬浮 -->
		<div class="dingdan">
			<div class="d-box">
				<div class="d-top">
					<img src="../../static/ssss.png">
				</div>
				<div class="d-bottom">
					<div class="bottom-box">
						<img src="../../static/zhuanrang.png" style="height: .4rem;">
						<div class="d-text">转让订单</div>
					</div>
					<div class="bottom-box">
						<img src="../../static/quxiao.png">
						<div class="d-text">取消订单</div>
					</div>
				</div>			
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'quxiangqing',
		data() {
			return {
				tabdata:[]
			}
		},
		methods: {
			myajax: function() {
				var that = this
				//				获取店铺列表
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/selectNewsId',
					data: {
						msdNewsId: that.msdNewsId
					},
					success: function(res) {
						if(res.status == 200) {
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
		mounted(){
			
		},
			computed: {
				myurl() {
					return this.$store.state.myurl
				}
			}
	}
</script>

<style scoped>
	/* 悬浮 */
	.dingdan{
		width: 100%;
		height: 100%;
	}
	.d-box{
		width: 2.5rem;		
		position: fixed;
		top: .8rem;
		left: 4.5rem;
		z-index: 100;
	}
	.d-top{
		position: relative;
		top: .1rem;
		left: 1.9rem;
	}
	.d-top img{
		height: .3rem;
	}
	.d-bottom{
		height: 1.8rem;
		padding: 0 .3rem;
		border-radius: .06rem;
		background: #FFFFFF;	
		box-shadow: 2px 1px 5px 1px #D4D4D4;
	}
	.bottom-box{
		display: flex;
		align-items: content;
		justify-content: space-between;
		border-bottom: 1px solid #F7F7F9 ;
		padding: .2rem 0;
	}
	.bottom-box img{
		height: .3rem;
		margin-right: .2rem;
	}
	.d-text{
		font-size: .3rem;
		color: #021A13;
	}
	
	/* 主页 */
	.wrapper{
		background: #F7F7F9;
	}
	.header{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 .3rem;
		height: 1rem;
		background: #FFFFFF;
		margin-bottom: .2rem;
	}
	.header-aside{
		width: .3rem;
	}
	.header-aside img{
		height: .4rem;
	}
	.header-content{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.7rem;
	}
	.header-text{
		font-size: .28rem;
		color: #272727 ;
		
	}
	.header-zi{
		color: #FF8190;
		border-bottom: 4px solid #FF8190;
		width: .7rem;
		white-space: nowrap;
		text-indent: -.2rem;
		text-align: center;
		line-height: .6rem;
		border-radius: .04rem;
	}
	.main{
		height: calc(100% - 1rem);
		overflow-x: hidden;
		overflow-y: scroll;
		background: #FFFFFF;
	}
	.main-one{
		height: .8rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: .24rem;
		color: #979797;
		border-bottom: 1px solid #E4E4E6 ;		
		margin: 0 .2rem;
	}
	.main-two{
		height: 2.7rem;
		background: #FFFFFF;
		border-bottom: 1px solid #E4E4E6 ;
		padding: 0 .3rem;
		margin: 0 .2rem;
	}
	.two-top{
		height: 1rem;
		font-size: .3rem;
		color: #000000;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	.two-bottom{
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	.two-box{
		width: 3.2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.two-text{
		font-size: .55rem;
		color: #FF8190;
		margin-bottom: .1rem;
	}
	.two-news{
		font-size: .28rem;
		color: #B8B8B8;
	}
	.main-h{
		height: 1rem;
		display: flex;		
		justify-content: flex-start;
		padding: .3rem;		
	}
	.h-text{
		font-size: .24rem;
		color: #FFFFFF  ;
		background: #FF8190;
		width: .4rem;
		height: .4rem;
		border-radius: .64rem;
		margin-right: .3rem;
		text-align: center;
		line-height: .4rem;
	}
	.h-news{
		font-size: .36rem;
		color: #272727 ;
		margin-right: .3rem;
		font-weight: 600;
		margin-bottom: .1rem;
	}
	.h-zi{
		font-size: .28rem;
		color: #979797 ;
	}
	.main-three{
		height: 1.5rem;
		display: flex;		
		justify-content: flex-start;
		padding: 0 .3rem;
		border-bottom: 1px solid #EEEEEE;
	}
	.three-box{
		flex: 1;
		padding-right: .6rem;
	}
	.dianhua{
		position: relative;
		top: -.8rem;
		left: 5.4rem;
		height: .45rem;
	}
	.three-text{
		font-size: .24rem;
		color: #FFFFFF  ;
		background: #FF8190;
		width: .4rem;
		height: .4rem;
		border-radius: .72rem;
		margin-right: .3rem;
		text-align: center;
		line-height: .4rem;
	}
	.three-news{
		font-size: .36rem;
		color: #272727 ;
		word-break: break-all;
		height: .8rem;
		line-height: .4rem;
		overflow: hidden;
		font-weight: 600;
		margin-bottom: .1rem;
		
	}
	.three-zi{
		font-size: .28rem;
		color: #979797 ;
	}
	.main-four{
		height: 1rem;
		border-bottom: 1px solid #E4E4E6;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 0 .3rem;
	}
	.four-text{
		font-size: .34rem;
		color: #272727 ;
	}
	.four-news{
		font-size: .24rem;
		color: #272727 ;
		background: #D8D8D8 ;
		padding: .1rem .2rem;
		border-radius: .08rem;
	}
	.main-five{
		height: 1.4rem;
		padding: 0 .3rem;
		display: flex;
		align-items: center;
	}	
	.five-bottom{
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	.five-news{
		width: 2rem;
		height: .6rem;
		background:#1698FF;
		border-radius: .06rem;
		font-size: .22rem;
		color: #FFFFFF;
		text-align: center;
		line-height: .6rem;
		margin-right: .3rem;
	}
	
	
	
</style>
