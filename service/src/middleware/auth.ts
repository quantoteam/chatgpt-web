import fs from 'fs/promises'

import path from 'path'

const auth = async (req, res, next) => {
  const tokensJson = JSON.parse(await fs.readFile(path.resolve(process.env.TOKENS_DIR, 'tokens.json'), 'utf8'))
  const tokenKeys = Object.keys(tokensJson)
  if (tokenKeys.length) {
    try {
      const Authorization = req.header('Authorization')
      if (!tokenKeys.includes(Authorization.replace('Bearer ', '').trim()))
        throw new Error('Error: 无访问权限 | No access rights')
      next()
    }
    catch (error) {
      res.send({ status: 'Unauthorized', message: error.message ?? 'Please authenticate.', data: null })
    }
  }
  else {
    next()
  }
}

export { auth }
