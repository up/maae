# Minimalistic AMD API Example
HTML5 Editor Basics


### AMD Loader (client library): amdlite.js
[https://github.com/abadc0de/amdlite](https://github.com/abadc0de/amdlite)

### AMD Optimizer (build tool): gulp-amd-optimize
[https://github.com/mariusGundersen/gulp-amd-optimize](https://github.com/mariusGundersen/gulp-amd-optimize)

### Install dev dependencies

---
* gulp-amd-optimizer
* gulp-concat
* gulp-concat-sourcemap
* gulp-csso
* gulp-jscs
* gulp-jshint
* jshint-stylish
* gulp-uglify
* gulp-header
* node-static

---

    $ npm install
		
### Run all tasks

    $ gulp

__Output directory__: *'public'*

### Start simple http server

    $ node ./server

### View results

[http://localhost:3000/](http://localhost:3000/)

### TODO

* Add gulp watch task (a little bit tricky
* Add tests and coverage tool
* Fix sourcemap bugs

