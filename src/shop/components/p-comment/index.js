'use strict'
module.exports = {
	template:require("./template.html"),
	components:{
		'c-comment':function(resolve){
			  require(['../c-comment'], resolve)
		}
	}
}