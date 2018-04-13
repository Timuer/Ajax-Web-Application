var e = function(sel) {
	return document.querySelector(sel)
}

var getTimeStamp = function(timeMillis) {
	var d = new Date(timeMillis)
	return d.toLocaleString()
}

var ajax = function(method, path, data, callback) {
	r = new XMLHttpRequest()
	r.open(method, path, true)
	r.setRequestHeader("Content-Type", "application/json")
	r.onreadystatechange = function() {
		if (r.readyState === 4) {
			console.log(r.responseText)
			callback(r.responseText)
		}
	}
	if (data !== null) {
		var sentData = JSON.stringify(data)
		console.log(sentData)
		r.send(sentData)
	} else {
		r.send()
	}
}