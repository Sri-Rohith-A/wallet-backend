const dataLengthCheck = (data) => {
  if (!data || data.length === 0) {
    return false;
  } else {
    return true;
  }
};

module.exports = { dataLengthCheck };
