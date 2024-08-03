if (typeof performance === 'undefined') {
    global.performance = {
      now: () => Date.now()
    };
  }
  