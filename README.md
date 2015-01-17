#Promises

##What?

An abstraction generally used to make working with async code more pleasant.

Changing this:

```
myAsyncMethod(input, function(err, results) {
	// Work on results
})
```

To this:

`aPromise = myAsyncMethodPromise(input)`

Or thought of another way, this:

`myAsyncMethod(input, output)`

To this:

`promisedOutput = myAsyncMethodPromise(input)`

Why `promisedOutput` and not just `output`? Because that line is executed before the real work is done.

They provide "a direct correspondence between synchronous functions and asynchronous functions." - https://gist.github.com/domenic/3889970#what-is-the-point-of-promises

Syncronous functions return values and they throw exceptions.

Asyncronous functions can't return values. They can, but they take a looooong time. They can't throw exceptions because there's nothing in place to catch those exceptions:

```
try {

	var doSomethingAsync(input, function(err, results) {
		// [1] Deal with the results, or if there's a problem, the err
	})

} catch (e) {
	// You'll be waiting a long time if you think this will pick up problems anywhere around [1]
}
```

Promises give you back a nicer way to compose async functions.

An exercise for you. Write some code to talk to an API over HTTP in JavaScript. Here's the API:

POST /a {name: 'a'}
POST /b {name: 'b'}
POST /c {name: 'c'}
POST /d {name: 'd'}
POST /e {name: 'e'}

Your test must create resources 'a' through to 'e' by posting the respective payload to the corresponding route, /a through to /e.

You can't post to /b until you've received the response from posting to /a, you can't post to /c until you've receieved the response from posting to /b, etc.

With callbacks:

post('a', function(err, result) {
		post('b', function(err, result) {
				post('c', function(err, result) {
						post('d', function(err, result) {
								post('e', function(err, result) {
								})
						})
				})
		})
})

Nice!

The test needs to change. Reverse the posts to /d and /e.

The test needs to change again. /a comes last.

How was that for you?

With promises however:

```
function postPromise(route) {
	return new Promise(function(resolve, reject) {
		post(route, function(err, result) {
			if (err) reject(err)
			else resolve(result)
		})
	})
}

Promise
.then(function() {
	return post('a')
})
.then(function() {
	return post('b')
})
.then(function() {
	return post('c')
})
.then(function() {
	return post('d')
})
.then(function() {
	return post('e')
})
.catch(function() {

})
```

Now change the tests as mentioned above. No so bad eh?
