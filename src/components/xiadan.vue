<template>
	<div class="wrapper">		
		
		<div class="main">
			<div id="map-container"></div>
			<div class="header">	
				<div class="header-aside">
					<img src="../../static/fanhui.png">
				</div>
				<div class="header-text">使用须知</div>
			</div>
			<img src="../../static/shuaxxx.png" class="shua">
			<div class="main-one">
				<div class="one-box">
					<div class="one-left">发</div>
					<div class="one-right">
						<div class="right-left">
							<div class="one-text">城置花园</div>
							<div class="one-news">(枫林晚酒店)</div>
						</div>
						<div class="right-right">
							<div class="one-word">17489787998</div>
							<img src="../../static/huiyou.png">
						</div>						
					</div>
				</div>
				<div class="one-box">
					<div class="one-left one-zi">收</div>
					<div class="one-right">
						<div class="right-left">
							<div class="one-text">城置花园</div>
							<div class="one-news">具体楼号、楼层和门牌号</div>
						</div>
						<div class="right-right">
							<div class="one-word">17489787998</div>
							<img src="../../static/huiyou.png">
						</div>						
					</div>
				</div>
				<img src="../../static/fen.png" class="fufu">
			</div>
			<div class="main-two">
				<div class="two-one">
					<div class="two-left">
						<div class="two-text">物品类型:</div>
						<div class="two-text two-news">蛋糕</div>
					</div>
					<div class="two-right">
						<img src="../../static/huiyou.png">
					</div>
				</div>
				<div class="two-one">
					<div class="two-left">
						<div class="two-text">发货时间:</div>
						<div class="two-text">立即发货</div>
					</div>
					<div class="two-right">
						<img src="../../static/huiyou.png">
					</div>
				</div>
				<div class="two-one">
					<div class="two-left">
						<div class="two-text liang">优惠</div>
						<div class="two-word two-zi">暂无可用优惠券</div>
					</div>
				</div>
				<div class="two-one">
					<div class="two-left">
						<div class="two-text">订单备注:</div>
						<div class="two-word two-zi">点击这里输入订单备注信息</div>
					</div>
				</div>
				<div class="two-two">
					<div class="two-text liang">服务</div>
					<div class="t-text">保温箱配送</div>
					<div class="t-text">保价</div>
				</div>
				<div class="two-two">
					<div class="two-text">货款代收:</div>
					<div class="t-text">需要</div>
					<div class="t-text">不需要</div>
				</div>
				<div class="two-one">
					<div class="two-left">
						<div class="two-text">货款价值:</div>
						<div class="two-word two-zi">请输入货款金额</div>
					</div>
				</div>
			</div>
			<div class="main-three">温馨提示:根据相关法律法规要求，跑客在取货时对您所寄物品进行检查，请不要将物品外包装封口。谢谢您的配合。</div>			
		</div>
		<div class="bottom">
			<div class="bottom-left">¥0</div>
			<div class="bottom-content">
				<div class="bottom-text">费用明细</div>
				<img src="../../static/huiyou.png">
			</div>
			<div class="bottom-right">下单</div>
		</div>
	</div>
</template>

<script>
	import AMap from 'AMap'
	export default {
		name: 'xiadan',
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
			var map = new AMap.Map('map-container', {
				zoom: 5,
				center: [117, 32]
			})
			var marker = new AMap.Marker({
				position: new AMap.LngLat(116.39, 39.9),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
				title: '北京'
			});
			
			// 将创建的点标记添加到已有的地图实例：
			map.add(marker);
						
		},
			computed: {
				myurl() {
					return this.$store.state.myurl
				}
			}
	}
</script>

<style scoped>
	.liang{
		letter-spacing: .35rem;
	}
	.wrapper{
		background: #F1F1F1 ;
	}
	#map-container{
		height: 4.6rem;
		width: 100%;
		position: relative;
	}
	.header{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 1rem;
		padding: 0 .3rem;
		position: absolute;
		top: .1rem;
		box-sizing: border-box;
	}
	.header-aside img{
		height: .6rem;
		border-radius: 50%;
		box-shadow: 0 1px 2px 1px #D4D4D4;
	}
	.header-text{
		width: 1.6rem;
		height: .6rem;
		font-size: .28rem;
		color: #000000;
		background: #FFFFFF;
		border-radius: .24rem;
		box-shadow: 0 1px 2px 1px #D4D4D4;
		text-align: center;
		line-height: .6rem;
	}
	.main{
		height: calc(100% - 1rem);
		overflow-x: hidden;
		overflow-y: scroll;
	}
	.shua{
		border-radius: 50%;
		box-shadow: 0 1px 2px 1px #D4D4D4;
		position: fixed;
		left: .2rem;
		top: 2.8rem;
		z-index: 1000;
		height: .6rem;
	}
	.main-one{
		height: 2.6rem;
		background: #FFFFFF;
		border-radius: .18rem;
		margin: 0 .2rem;
		padding: 0 .3rem;
		margin-top: -1rem;
		position: relative;
		z-index: 9999;
		box-shadow: 0 1px 2px 1px #D4D4D4;
	}
	.one-box{
		display: flex;
		align-items: center;
		justify-content: flex-start;
		height: 1.3rem;
	}
	.one-left{
		width: .4rem;
		height: .4rem;
		font-size: .22rem;
		color: #000000;
		border: 1px solid #000000;
		text-align: center;
		line-height: .4rem;
		margin-right: .3rem;
		border-radius: 50%;
	}
	.one-zi{
		color: #FF8190;
		border: 1px solid #FF8190;
	}
	.one-right{
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: 6rem;		
		border-bottom: 1px solid #F1F1F1 ;
		height: 1.3rem;
	}
	.right-left{
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 1;
	}
	.one-text{
		font-size: .28rem;
		color: #131313 ;
		margin-bottom: .1rem;
	}
	.one-news{
		font-size: .22rem;
		color: #ACACAC ;
	}
	.right-right{
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.right-right img{
		height: .3rem;
	}
	.one-word{
		font-size: .22rem;
		color: #131313 ;
		margin-right: .6rem;
	}
	.fufu{
		height: .6rem;
		position: absolute;
		left: .2rem;
		top: 1rem;
	}
	.main-two{
		height: 6.7rem;
		background: #FFFFFF;
		border-radius: .18rem;
		margin: .1rem .2rem;		
		box-shadow: 0 1px 2px 1px #D4D4D4;
		padding: 0 .3rem;
	}
	.two-one{
		height: .9rem;
		display: flex;
		align-items: center;
		justify-content: space-between;		
		border-bottom: 1px solid #F1F1F1 ;
	}
	.two-left{
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex: 1;
	}
	.two-text{
		font-size: .28rem;
		color: #131313 ;
		margin-right: .3rem;
		width: 1.3rem;
	}
	.two-news{
		color: #FF8190;
	}
	.two-right{
		
	}
	.two-right img{
		height: .3rem;
	}
	.two-zi{
		color: #ACACAC;
	}
	.two-word{
		font-size: .28rem;
		color: #ACACAC ;
	}
	.two-two{
		height: .9rem;
		display: flex;
		align-items: center;
		justify-content: flex-start;		
		border-bottom: 1px solid #F1F1F1 ;
		margin: .1rem 0;
	}
	.t-text{
		font-size: .22rem;
		color: #ACACAC ;
		padding: .1rem .2rem;
		background: #F1F1F1 ;
		border-radius: .06rem;
		text-align: center;
		line-height: .34rem;
		margin-right: .2rem;
	}
	.main-three{
		height: .5rem;
		display: flex;
		align-items: center;
		padding: 0 .3rem;
		font-size: .2rem;
		color: #ACACAC ;
		line-height: .25rem;
		word-break: break-all;
		overflow: hidden;
		margin: .2rem 0;
	}
	.bottom{
		height: 1rem;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	.bottom-left{
		width: 1.6rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: .32rem;
		color: #FF8190;
	}
	.bottom-content{
		display: flex;
		align-items: center;
		flex: 1;
	}
	.bottom-content img{
		height: .3rem;
	}
	.bottom-text{
		font-size: .24rem;
		color: #131313 ;
		margin-right: .2rem;
	}
	.bottom-right{
		width: 2rem;
		height: 1rem;
		background: #000000;
		font-size: .28rem;
		color: #FFFFFF ;
		text-align: center;
		line-height: 1rem;
	}
</style>
