'strict'
require("../style/c-button.css")
var Core = require("../c-core")
module.exports = {
	mixins:[Core],
	template:require("./template.html"),
	data:function(){
		return {
			label:"",
			type:"c-button"
		}
	}
}