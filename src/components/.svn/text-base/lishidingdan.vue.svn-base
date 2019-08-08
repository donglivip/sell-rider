<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-aside">
				<img src="../../static/youjian.png">
			</div>
			<div class="header-content">历史订单</div>
			<div class="header-aside"></div>
		</div>
		<div class="main">
			<div class="main-box">
				<div class="box-top">
					<div class="top-left">
						<img src="../../static/dingdan.png">
					</div>
					<div class="top-content">
						<div class="top-text">01-12 14:12 完成一笔帮我取订单</div>
						<div class="top-news">订单编号 xxxxxxxxxxxxxxx</div>
					</div>
				</div>
				<div class="box-bottom">
					<div class="bottom-text">订单收入18.00元</div>
					<div class="bottom-news">递送距离8.23km,用时88分钟</div>
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
	export default {
		name: 'lishidingdan',
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
	.wrapper{
		background:#F7F7F9;
	}
	.header{
		height: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 .3rem;
		margin-bottom: .2rem;
		background: #FFFFFF;
	}
	.header-aside{
		width: .3rem;
	}
	.header-aside img{
		height: .36rem;
	}
	.header-content{
		font-size: .36rem;
		color: #000000;
	}
	.main{
		height: calc(100% - 1.2rem);
		overflow-x: hidden;
		overflow-y: scroll;
	}
	.main-box{
		height: 2.7rem;
		background: #FFFFFF;
		padding: 0 .3rem;
		margin-bottom: .2rem;
	}
	.box-top{
		height: 1.2rem;
		border-bottom: 1px solid #D8D8D8;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	.top-left{
		
	}
	.top-left img{
		height: .6rem;
	}
	.top-content{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		margin-left: .3rem;
	}
	.top-text{
		font-size: .24rem;
		color: #979797;
		margin-bottom: .1rem;
	}
	.top-news{
		font-size: .2rem;
		color: #979797;
	}
	.box-bottom{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}
	.bottom-text{
		font-size: .32rem;
		color: #000000;
		margin: .2rem 0 .1rem 0;
	}
	.bottom-news{
		font-size: .3rem;
		color: #979797;
	}
	.{
		
	}
	.{
		
	}
	.{
		
	}
	.{
		
	}
	.{
		
	}
	.{
		
	}
	.{
		
	}
	.{
		
	}
	
	
</style>
