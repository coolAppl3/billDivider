function disableBFCache() {
  window.onpageshow = function(e) {
    if(e.persisted) {
      window.location.reload();
    };
  };
};

export default disableBFCache;