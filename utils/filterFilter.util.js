const filterFilter = (filter, validAttr) => {
  const modified = {};
  Object.keys(filter).forEach((key) => {
    if (key in validAttr) {
      modified[key] = filter[key];
    }
  });

  return modified;
};

module.exports = filterFilter;
