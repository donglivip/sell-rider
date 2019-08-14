<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-top">
				<div class="header-aside" @click="back()"><img src="../../static/youjian.png" /></div>
				<div class="header-content">缴纳押金</div>
				<div class="header-aside"></div>
			</div>
			<div class="header-bottom">
				<div class="header-text">押金金额</div>
				<div class="header-news">{{ tabdata.price }}</div>
			</div>
		</div>
		<div class="bottom" @click="bian(true)" v-if="tabdata.state==0">缴纳</div>
		<div class="bottom" @click="bian(true)" v-if="tabdata.state!=0">解除</div>
		<!-- 蒙层 -->
		<div class="meng" @click="bian(false)" v-if="bianboo">
			<div class="m-box">
				<div class="m-one" @click="fang(1)">
					<div class="m-text">支付宝</div>
					<!-- <img src="../../static/xxxx.png"/> -->
				</div>
				<div class="m-one" @click="fang(2)">
					<div class="m-text">微信</div>
					<!-- <img src="../../static/xuanse.png" /> -->
				</div>
				<!-- <div class="m-one">
					<div class="m-text">余额</div>
					<!-- <img src="../../static/xuanse.png" /> -->
				<!-- </div> -->
				<!-- <div class="m-two">确认充值</div> -->
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'fuwuzhongxin',
	data() {
		return {
			tabdata: [],
			bianboo:false,
			channel:''
		};
	},
	methods: {
		jiechu:function(){
			var that = this;
			//解除
			$.ajax({
				type: 'post',
				url: that.myurl + '/rider/deleteRiderCashDeposit',
				data: {
					id: localStorage.getItem('myid')
				},
				dataType:'json',
				success: function(res) {
					if(res.status==200){
						alert('解除完成')
						that.myajax()
					}
				},
				error: function(res) {
					alert('网络连接失败，请检查网络后再试！');
				}
			});
		},
		fang:function(type){
			var that = this;
			//骑手充值（支付宝和微信）
			$.ajax({
				type: 'post',
				url: that.myurl + '/rider/payCashDepositApiWx',
				data: {
					id: localStorage.getItem('myid'),
					type:type
				},
				dataType:'json',
				success: function(res) {
					if(type==1){
						// 支付宝
						plus.payment.request(that.channel[0], res.data[0], function(result) {
							alert(' 支付成功')
							that.myajax()
						}, function(error) {
							alert('支付失败')
						});

					}else{
						// 微信
						plus.payment.request(that.channel[1], res, function(result) {
							alert(' 支付成功')
							that.myajax()
						}, function(error) {
							alert('支付失败')
						});
					}
				},
				error: function(res) {
					alert('网络连接失败，请检查网络后再试！');
				}
			});
		},
		//点击隐藏或显示充值页面
		bian:function(type){
			this.bianboo=type
		},
		myajax: function() {
			var that = this;
			//				查询骑手保证金
			$.ajax({
				type: 'post',
				url: that.myurl + '/rider/queryMaRiderCashDeposit',
				data: {
					id: localStorage.getItem('myid')
				},
				success: function(res) {
					if (res.status == 200) {
						that.tabdata = res.data;
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
	mounted() {
		this.myajax()
		var that = this
		// 1. 获取支付通道
		function plusReady() {
			// 获取支付通道
			plus.payment.getChannels(function(channels) {
				that.channel = channels;
			}, function(e) {
				alert("获取支付通道失败：" + e.message);
			});
		}
		if (window.plus) {
			plusReady();
		} else {
			document.addEventListener('plusready', plusReady, false);
		}
	},
	computed: {
		myurl() {
			return this.$store.state.myurl;
		}
	}
};
</script>

<style scoped>
  .wrapper{
    background: #f8f8f8;
  }
	/* 蒙层 */
	.meng{
		background: rgba(0,0,0,.5);
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
	}
	.m-box{
		background: #FFFFFF;
		margin: 0 .2rem;
		position: absolute;
		bottom: .3rem;
		left: .1rem;
		border-radius: .12rem;
	}
	.m-one{
		height: 1rem;
		width: 6rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 .3rem;
		border-bottom: 1px solid #E4E4E6;
	}
	.m-one img{
		height: .4rem;
	}
	.m-text{
		font-size: .28rem;
		color: #000000;
	}
	.m-two{
		background: #FF8190;
		width: 6rem;
		height: .8rem;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 .3rem .3rem .3rem;
		font-size: .28rem;
		color: #FFFFFF;
		border-radius: .08rem;
	}

	/* 主页 */
.header {
	height: 3.2rem;
	padding: 0 0.3rem;
	background: #FFFFFF;
}
.header-top {
	height: 1rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.header-aside {
	width: 0.3rem;
}
.header-aside img {
	height: 0.35rem;
}
.header-content {
	font-size: 0.32rem;
}
.header-bottom {
	height: 2.2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.header-text {
	font-size: 0.24rem;
	margin-bottom: 0.2rem;
}
.header-news {
	font-size: 0.5rem;
}

.bottom {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 0.9rem;
	width: 6rem;
	font-size: 0.3rem;
	color: #666666;
	background: #ffffff;
	position: fixed;
	bottom: 0.8rem;
	left: 0.55rem;
	border-radius: 0.12rem;
}
</style>
