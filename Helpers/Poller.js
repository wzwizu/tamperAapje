const Poll = (callback, timeout, interval) => {
  let endTime = Number(new Date()) + (timeout || 5000);
  interval = interval || 100;

  const checkCondition = (resolve, reject) => {
    const result = callback();
    if (result) {
      resolve(result);
    }
    else if (Number(new Date()) < endTime) {
      setTimeout(checkCondition, interval, resolve, reject);
    }
    else {
      reject(new Error(`timed out for ${callback}: ${arguments}`));
    }
  };
  return new Promise(checkCondition);
};
