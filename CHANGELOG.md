# Changelog


### [0.26.20] (2024-02-06)


### Features

* add disableBFCache.js
  * it should reload the page if the pageshow event is persisted

* import disableBFCache.js to session.js
  * it should prevent the page from just hanging if the user goes back to it using the browser


### Bug Fixes

* fix forward/back cache causing pages to hang


### Code Refactoring

* remove meta tag that prevented browser caching



### [0.26.19] (2024-02-06)


### Bug Fixes

* disable browser caching
  * experimental change


---


### [0.26.18] (2024-02-05)


### Test Changes

* test changelog
  * testing how the changelog will display ths contents.


---


### [0.26.17] (2024-02-05)


### Code Refactoring

* remove standard-version
  * will manually write the changelog file moving forward


---


### [0.26.16] (2024-02-05)


### Features

* add standard-version to generate changelog


### Code Refactoring

* remove JSON response for endpoints not specified in API
