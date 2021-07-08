const pluralize = require('pluralize')

const getPlural = (word) => {
  if (pluralize.isPlural(word)) {
    return word;
  } else if (pluralize.isSingular(word)) {
    return pluralize.plural(word)
  }
}

const getSingular = (word) => {
  if (pluralize.isSingular(word)) {
    return word;
  } else if (pluralize.isPlural(word)) {
    return pluralize.singular(word)
  }
}

module.exports = {
  getSingular,
  getPlural
}