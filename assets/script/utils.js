'use strict';
  
  function select(selector, scope = document) {
    return scope.querySelector(selector);
  }
  
  function listen(event, selector, callback) {
    return selector.addEventListener(event, callback);
  }
  
  function create(element) {
    return document.createElement(element);
  }
export { select, listen, create };