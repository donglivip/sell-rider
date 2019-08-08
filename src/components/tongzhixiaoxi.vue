<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-aside" @click="back()">
				<img src="../../static/youjian.png">
			</div>
			<div class="header-text">通知消息</div>
			<div class="header-aside"></div>
		</div>
		<div class="main">
			<div class="main-one" v-for="i in tabdata">
				<div class="one-left">
					<img src="../../static/xiaoxi.png">
				</div>
				<div class="one-right">
					<div class="right-top">
						<div class="top-text">{{i.cmessageTitle}}</div>
						<div class="top-news">{{i.createTimeString}}</div>
					</div>
					<div class="right-bottom">{{i.cmessageContent}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'tongzhixiaoxi',
		data() {
			return {
				tabdata:[]
			}
		},
		methods: {
			myajax: function() {
				var that = this
				//			通知消息
				$.ajax({
					type: 'post',
					url: that.myurl + '/rider/selectCuserCmessageManage',
					data: {
						cuserId: localStorage.getItem('myid')
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
		background: #F7F7F9;
	}
	.header{
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #FFFFFF;
		padding: 0 .3rem;
		height: 1rem;
		margin-bottom: .2rem;
	}
	.header-aside{
		width: .3rem;
	}
	.header-aside img{
		height: .4rem;
	}
	.header-text{
		font-size: .32rem;
		color: #000000;
	}
	.main{
		height: calc(100% - 1rem) ;
		overflow-x: hidden;
		overflow-y: scroll;
	}
	.main-one{
		height: 1.3rem;
		background: #FFFFFF;
		margin-bottom: .2rem;
		padding: .3rem;
		display: flex;		
		justify-content: flex-start;
	}
	
	.one-left img{
		height: .44rem;
	}
	.one-right{
		margin-left: .3rem;
	}
	.right-top{
		display: flex;
		align-items: center;
		justify-content: space-between;	
		margin-bottom: .14rem;
		width: 5.8rem;
	}
	.top-text{
		font-size: .28rem;
		color: #272727;
		height: .45rem;
		line-height: .45rem;
		width: 3rem;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.top-news{
		font-size: .24rem;
		color: #B8B8B8;
	}
	.right-bottom{
		font-size: .22rem;
		color: #929292;
		word-break: break-all;
		height: .8rem;
		line-height: .4rem;
		overflow: hidden;
	}
	
	
</style>
