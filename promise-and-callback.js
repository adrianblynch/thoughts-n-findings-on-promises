require('es6-promise').polyfill()

function asyncWork(name, callback) {
	setTimeout(function() {
		callback(name)
	}, 3000 * Math.random())
}

function both(firstName, lastName, callback) {

	var name = firstName + ' ' + lastName

	function generateAsyncWork() {
		return function(callback) {
			asyncWork(name, callback)
		}
	}

	if (callback) {

		work()(callback)

	} else {

		return new Promise(function(resolve) {
			work()(resolve)
		})

	}

}

// Callback
both('Adrian', 'Lynch', function(name) {
	console.log('Got "' + name + '" via a callback')
})

// Promise
var p = both('Adrian', 'Lynch').then(function(name) {
	console.log('Got "' + name + '" via a promise')
})