'strict'
module.exports = {
	data:function(){
		return {
			type:"",
			name:""
		}
	},
	props:["name"],
	events:{
		"hook:created":function(){
			var _s = this
			_s.$on(_s.name + ".update",function(a){
				_.assign(_s.$data,a)
			})
		},
		"hook:ready":function(){
			if(!this.name){
				throw this.type + " name is undefined"
			}
		}
	}
}
