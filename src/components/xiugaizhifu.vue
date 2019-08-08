<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-aside" @click="back()"><img src="../../static/youjian.png" /></div>
			<div class="header-text">修改支付宝</div>
			<div class="header-aside"></div>
		</div>
		<div class="main">
			<div class="main-one">
				<div class="one-text">支付宝姓名:</div>
				<input type="text" class="one-news" placeholder="请输入支付宝姓名" v-model="name">
			</div>
			<div class="main-one">
				<div class="one-text">支付宝账号:</div>
				<input type="number" class="one-news" placeholder="请输入支付宝账号" v-model="zhanghao">
			</div>
		</div>
		<div class="bottom" @click="myajax()">确认修改</div>		
	</div>
</template>

<script>
	export default {
		name: 'xiugaizhifu',
		data() {
			return {
				tabdata:[],
				name:'',
				zhanghao:''
			}
		},
		methods: {
			myajax: function() {
				var that = this
				//			修改支付宝
				$.ajax({
					type: 'post',
					url: that.myurl + '/rider/updateRiderRealIsApi',
					data: {
						maCaUserId: localStorage.getItem('myid'),
						maCaAliCode:that.zhanghao,
						maCaAliName:that.name
					},
					success: function(res) {
						if(res.status == 200) {
							alert('修改成功')
							that.$router.back()   
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
	.wrapper {
		background: #f7f7f9;
	}
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #ffffff;
		padding: 0 0.3rem;
		height: 1rem;
		margin-bottom: 0.2rem;
	}
	.header-aside {
		width: 0.3rem;
	}
	.header-aside img {
		height: 0.4rem;
	}
	.header-text {
		font-size: 0.32rem;
		color: #000000;
	}
	.main {
		height: calc(100% - 1rem);
		overflow-x: hidden;
		overflow-y: scroll;
	}
	.main-one{
		height: 1rem;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 0 .3rem;
		margin-bottom: .1rem;
	}
	.one-text{
		font-size: 0.32rem;
		color: #000000;
		margin-right: .3rem;
	}
	.one-news{
		border: 0;
		height: .8rem;
		width: 4rem;
		font-size: 0.32rem;
		color: #000000;
	}
	.bottom{
		display: flex;
		align-items: center;
		justify-content: center;
		height: .9rem;
		width: 6rem;
		font-size: .3rem ;
		color: #FFFFFF;
		background: #FF8190;
		position: fixed;
		bottom: .8rem;
		left: .55rem;
		border-radius: .12rem;
	}
	
</style>
