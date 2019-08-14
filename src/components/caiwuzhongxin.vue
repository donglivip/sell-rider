<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-top">
				<div class="header-aside" @click="back()">
					<img src="../../static/youjian.png">
				</div>
				<div class="header-content">财务中心</div>
				<div class="header-aside"></div>
			</div>
			<div class="header-bottom">
				<div class="header-text">总余额 (元)</div>
				<div class="header-news">{{jinedata.usRwPrice}}</div>
			</div>
		</div>
		<div class="main">
			<div class="main-one">
				<div class="one-box">
					<div class="one-top">
						<div class="one-text">{{tabdata.Allcount}}</div>
						<div class="one-news">本月订单总数</div>
					</div>
					<div class="one-top">
						<div class="one-text">{{tabdata.count}}</div>
						<div class="one-news">本月完成接单量</div>
					</div>
					<div class="one-top">
						<div class="one-text">0</div>
						<div class="one-news">本月迟送订单数</div>
					</div>
				</div>
				<div class="one-box">
					<div class="one-top">
						<div class="one-text">{{tabdata.Upcount}}</div>
						<div class="one-news">上月接单总数</div>
					</div>
					<div class="one-top">
						<div class="one-text">{{tabdata.price}}</div>
						<div class="one-news">本月收入</div>
					</div>
					<div class="one-top">
						<div class="one-text">{{tabdata.Upprice}}</div>
						<div class="one-news">上月收入</div>
					</div>
				</div>
			</div>
			<div class="main-two" @click="opennew('shouzhijilu')">
				<div class="two-text">收支记录</div>
				<img src="../../static/huiyou.png">
			</div>
		</div>
		<div class="bottom" @click="opennew('tixian')">提现</div>
	</div>
</template>

<script>
	export default {
		name: 'caiwuzhongxin',
		data() {
			return {
				tabdata:'',
				jinedata:''
			}
		},
		methods: {
			myajax: function() {
				var that = this
				//		骑手财务中心
				$.ajax({
					type: 'post',
					url: that.myurl + '/rider/queryAllOrderMonth',
					data: {
						id: localStorage.getItem('myid')
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
				//		个人版骑手金额
				$.ajax({
					type: 'post',
					url: that.myurl + '/rider/riderMoney',
					data: {
						usRiderId: localStorage.getItem('myid')
					},
					success: function(res) {
						if(res.status == 200) {
							that.jinedata = res.data
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
			this.myajax()
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
		background: #F7F7F9 ;
	}
	.header{
		height: 3.2rem;
		padding: 0 .3rem;
    background: #FFFFFF;
	}
	.header-top{
		height: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.header-aside{
		width: .3rem;
	}
	.header-aside img{
		height: .35rem;
	}
	.header-content{
		font-size: .32rem;
	}
	.header-bottom{
		height: 2.2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
    border-bottom: 1px solid gainsboro;
	}
	.header-text{
		font-size: .24rem;
		margin-bottom: .2rem;
	}
	.header-news{
		font-size: .5rem;
	}
	.main-one{
		height: 3.2rem;
		color: #FFFFFF;
		background: #FFFFFF;
		margin-bottom: .2rem;
	}
	.one-box{
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	.one-top{
		width: 33%;
		height: 1.6rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.one-text{
		font-size: .3rem;
		color: #000000;
		margin-bottom: .1rem;
	}
	.one-news{
		font-size: .24rem;
		color: #000000;
	}
	.main-two{
		height: .9rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 .3rem;
		background: #FFFFFF;
	}
	.main-two img{
		height: .3rem;
	}
	.two-text{
		font-size: .28rem ;
		color: #021A13;
	}
	.bottom{
		display: flex;
		align-items: center;
		justify-content: center;
		height: .9rem;
		width: 6rem;
		font-size: .3rem ;
		color: #666666;
		background: #ffffff;
		position: fixed;
		bottom: .8rem;
		left: .55rem;
		border-radius: .12rem;
	}


</style>
