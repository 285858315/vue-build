'use strict'
module.exports = {
	data:function(){
		return {
			api_data:{},
			api_task:[],
			api_header:{},
			api_lock:false
		}
	},
	methods:{
		api:function(url,opts,cb){
    		var _s = this
    		_s.api_task.push({url:url,opts:opts,cb:cb})
    		_s.apiDo()
		},
		apiDo:function(){			
    		var _s = this
    		if(_s.api_lock){
    			return
    		}
    		_s.api_lock = true
    		var item = _s.api_task.pop()
    		if(!item){
	    		_s.api_lock = false
	    		return;
    		}
    		var opts = item.opts || {}
			var url = item.url.split(" ")
			var cb = item.cb
			var query
			if(opts.query){
				query = "?"
				_.each(opts.query,function(value,key){
					query += key + "=" + value;
				})
			}
			var body
			if(opts.body){
				if(opts.t == 1){
					body = [];
					_.each(opts.body,function(value,key){
						body.push(key + "=" + value)
					})
					body = body.join("&")
				}else{
					body = opts.body;
				}
			}
			var _op = url[0]
			var a = superagent[_op](url[1] + (query || ""))
			if(_op == 'put'){
                a.set("method","PUT")
			}
			_.each(_s.api_header,function(value,key){
				a.set(key,value)
			})
			if(body){
				if(typeof body == "object"){
					a.set('Content-Type', 'application/json;charset=utf-8')
					a.set('Accept', 'application/json')
				}else{
					a.set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')
				}
				a.send(body)
			}
			a.end(function(err, res){
				_s.api_lock = false
				if(err){
					throw err
				}
				var _body = res.body || res.text
				try{
					_body = typeof _body == "object" ? _body : JSON.parse(_body)
				}catch(e){
					throw e
				}
				if(url[2]){
					_s.api_data[url[2]] = _body
				}
				var key1 = url[1].replace("/","").replace(/\//g,"_").toLocaleLowerCase()
				_s.api_data[key1] = _body.result || _body.data || _body 
				if(typeof cb == "function"){
					cb(null,_body)
				}
			})
		}
	}
}