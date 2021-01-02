const notFound = (req, res, next) => {
  const error = new Error(`Not Found: ${req.originalUrl}`)
  res.status(404)
  next(error)
}

const asyncErrorHandler = (err, req, res, next) => {
  if (String(err.message).substring(0, 23) === 'Cast to ObjectId failed') {
    res.status(404)
    err.message = `Not Found: ${req.originalUrl}`
  } else {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
  }
  res.json({
    message: err.message,
  })
  next()
}

export { notFound, asyncErrorHandler }

//consider more detailed error stack in dev environment
//stack: process.env.NODE_ENV === 'production' ? null : err.stack,
