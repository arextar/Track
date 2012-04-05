# Track
Simple but powerful routing in JavaScript


## API
### .**init**(*string* methods...)
Initiates track choosing the first supported method in the list. Call this **after** binding callbacks with .on

````js
// Use HTML5 history API, falling back to hash when not available
track.init('history', 'hash')
````

### .**on**(*string* path, *function* callback(*string* path))
Binds callback to a given path. See the 'Routing' section below for more details on how the paths are formatted.

````js
// When a path such as "/user/12" is triggered, show an alert
track.on('/user/:id', function(){
  alert("Welcome to user #" + this.id + "'s profile!")
})
````

### .**go**(*string* path)
Triggers callbacks for and takes the action defined by the current method (such as setting the hash) for the given path.

````js
// Triggers any callbacks associated with the path (if hash or history methods are present, the url is set for example).
track.go('/user/12')
````

### .**clean**(*string* path)
Normalizes the path by putting a '/' at the start and end (used internally)


## Routing
Use `:word` to indicate a wild-card.

* `user/:id` triggers on:
 * user/12
 * user/abc
* `:action/user/:id` triggers on:
 * friend/user/1
 * poke/user/foobar

Use `:word?` for optional wild-cards.

* `user/:id/:edit?` triggers on:
 * `user/foo`
 * `user/foo/e`