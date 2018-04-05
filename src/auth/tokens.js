const { createHash } = require('crypto')

module.exports = [
  'FULLSTACK' // 6bccb4ba5ebf15502fd7798c1a73fd66
].map((name) => {
  return createHash('md5').update(name).digest('hex')
})
