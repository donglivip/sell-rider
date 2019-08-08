<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-aside">
				<img src="../../static/youjian.png">
			</div>
			<div class="header-content">
				<div class="header-text header-zi">订单状态</div>
				<div class="header-text">订单详情</div>
			</div>
			<div class="header-aside"></div>
		</div>
		<div class="main">
			<div class="main-one">
				<div class="one-box">
					<img src="../../static/xxxx.png">
					<div class="one-news one-zi">取货</div>
				</div>
				<div class="one-text"></div>
				<div class="one-box">
					<img src="../../static/xuanse.png">
					<div class="one-news">送货</div>
				</div>
				<div class="one-text"></div>
				<div class="one-box">
					<img src="../../static/xuanse.png">
					<div class="one-news">完成</div>
				</div>
			</div>
			<div class="main-two">
				<div class="two-top">
					<div class="top-left">请前往:</div>
					<div class="top-right">
						<div class="two-text">郑州市中原区玉兰街79号升龙又一期-2期</div>
						<div class="two-news">A区12栋1213室</div>
					</div>
				</div>
				<div class="two-bottom">请在<span>18分钟</span>内到达取货地点<span>(剩余时间00:12:23)</span></div>				
			</div>
			<div class="main-three bianse">
				<div class="three-left">
					<img src="../../static/xuanze.png">
				</div>
				<div class="three-content">
					<h3 class="three-text three-back">致电发货人(第一步)</h3>
					<p class="three-news three-xiao">请先致电发货人确定地址和时间</p>
					<span class="fense">TA还未注册美邦跑腿用户，推荐有奖。</span>
				</div>
				<div class="three-right three-bian">联系发货人</div>
			</div>
			<div class="main-three">
				<div class="three-left">
					<img src="../../static/xuanse.png">
				</div>
				<div class="three-content">
					<h3 class="three-text">我已到达(第二步)</h3>
					<p class="three-news">到达取货地点后点击</p>				
				</div>
				<div class="three-right">我已到达</div>
			</div>
			<div class="main-three">
				<div class="three-left">
					<img src="../../static/xuanse.png">
				</div>
				<div class="three-content">
					<h3 class="three-text">拍照取货(第三步)</h3>
					<span class="fense">为了避免货物纠纷，请在取货时进行检查并拍照存证。</span>			
				</div>
				<div class="three-right">拍照取货</div>
			</div>
			<div class="main-three">
				<div class="three-left">
					<img src="../../static/xuanse.png">
				</div>
				<div class="three-content">
					<h3 class="three-text">我已取货(第四步)</h3>
					<p class="three-news">取货后点击我已取货</p>				
				</div>
				<div class="three-right">我已取货</div>
			</div>
			<div class="main-three">
				<div class="three-left">
					<img src="../../static/xuanse.png">
				</div>
				<div class="three-content">
					<h3 class="three-text">致电收货人(第五步)</h3>
					<p class="three-news">请先致电收货人确定地址和时间</p>	
					<span class="fense">TA还未注册美邦跑腿用户，推荐有奖。</span>		
				</div>
				<div class="three-right">联系收货人</div>
			</div>
			<div class="main-three">
				<div class="three-left">
					<img src="../../static/xuanse.png">
				</div>
				<div class="three-content">
					<h3 class="three-text">我已送达(第六步)</h3>
					<p class="three-news">到达收货地点后点击我已送达</p>				
				</div>
				<div class="three-right">我已送达</div>
			</div>
			<div class="main-three">
				<div class="three-left">
					<img src="../../static/xuanse.png">
				</div>
				<div class="three-content">
					<h3 class="three-text">输入验证码(第七步)</h3>
					<p class="three-news">请向收货人要取短信验证码</p>				
				</div>
				<div class="three-right">收货验证码</div>
			</div>
		</div>
		<div class="bottom">
			<div class="bottom-box">
				<img src="../../static/daohang.png">
				<div class="bottom-text">查看导航</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'quzhuangtai',
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
		justify-content: space-between;
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
		height: calc(100% - 2.6rem);
		overflow-x: hidden;
		overflow-y: scroll;
	}
	.main-one{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 1.6rem ;
		background: #FFFFFF;
		margin-bottom: .2rem;
	}
	.one-box{
		width: .3rem;
		height: .3rem;
	}
	.one-box img{
		height: .3rem;
		margin-bottom: .04rem;
	}
	.one-news{
		font-size: .24rem;
		color: #CACACA ;
		white-space: nowrap;		
		text-indent: -.1rem;
	}
	.one-zi{
		color: #FF8190;
	}
	.one-text{
		width: 2rem;
		height: .02rem;
		background: #CACACA ;
		margin: 0 .04rem;
	}
	.main-two{
		height: 2.8rem;
		background: #FFFFFF;
		margin-bottom: .2rem;
		padding: 0 .2rem;
	}
	.two-top{
		display: flex;		
		justify-content: flex-start;
		height: 1rem;
		border-bottom: 1px solid #CACACA;
		padding-top: .3rem ;
	}
	.top-left{
		font-size: .24rem;
		color: #CACACA ;
		width: 1rem;
	}
	
	.two-text{
		font-size: .28rem;
		color: #272727 ;
		margin-bottom: .1rem;
	}
	.two-news{
		font-size: .28rem;
		color: #929292 ;
	}
	.two-bottom{
		height: 1rem;
		width: 6.7rem;
		background: #FAEAEA;
		border: 1px dashed #FF8190;
		font-size: .28rem;
		color: #000000;
		text-align: center;
		line-height: 1rem;
		margin-top: .2rem;
		border-radius: .06rem;
	}
	span{
		color: #FF8190;
	}
	.main-three{
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 0 .2rem;
		background: #FFFFFF;
		margin: 0 .08rem;
	}
	.three-left img{
		height: .3rem;
		margin-right: .2rem;
	}
	.three-content{
		display: flex;
		flex-direction: column;		
		justify-content: center;
		flex: 1;
	}
	.three-text{
		font-size: .32rem;
		color: #CACACA ;
		margin-bottom: .2rem;
	}
	.three-news{
		font-size: .24rem;
		color: #CACACA ;
		margin-bottom: .1rem;
	}
	.fense{
		font-size: .24rem;
		color: #FF8190 ;
		word-break: break-all;
		line-height: .4rem;
		overflow: hidden;
	}
	.three-right{
		font-size: .24rem;
		color: #CACACA  ;
		border: 1px solid #979797;
		border-radius: .06rem;
		width: 1.8rem;
		height: .7rem;
		text-align: center;
		line-height: .7rem;
	}
	.bianse{
		background: #fffafa;
		border: 1px solid #FF8190;
		margin: 0 .08rem;
		border-radius: .06rem;
	}
	.three-back{
		color: #000000;
	}
	.three-xiao{
		color: #000000;
	}
	.three-bian{
		color: #FF8190;
		border: 1px solid #FF8190;
	}
	.bottom{
		height: 1.2rem;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding: 0 .3rem;
		margin-top: .2rem;
	}
	.bottom-box{
		width: 1.4rem;
		height: .7rem;
		border: 1px solid #FF8190;
		border-radius: .06rem;
		padding: 0 .3rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.bottom img{
		height: .3rem;
	}
	.bottom-text{
		font-size: .24rem;
		color: #FF8190 ;
	}
	
</style>
