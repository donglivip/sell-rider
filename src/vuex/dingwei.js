import store from './store'
document.addEventListener('plusready', onPlusReady, false);
// 扩展API加载完毕，现在可以正常调用扩展API
function onPlusReady(){
	plus.geolocation.getCurrentPosition(function(p){
		store.state.jing=p.coords.longitude
		store.state.wei=p.coords.latitude
		store.state.sheng=p.address.province
		store.state.shi=p.address.city
		store.state.qu=p.address.district
		store.state.wanzheng=p.addresses
	}, function(e){
		plus.nativeUI.toast('定位失败,请检查网络和GPS后重试。');
	} );
	setTimeout(function(){
		onPlusReady()
	},10000)
}
