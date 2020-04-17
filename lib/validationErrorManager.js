const { checkForFileErr } = require('./fileManager');

exports.findAllValidationErrors = (fileErr, body, schema) => {
  let errors = [];

  const foundFileErr = checkForFileErr(fileErr);

  if (foundFileErr) {
    errors.push(foundFileErr);
  }

  const { error } = schema.validate(body, {
    abortEarly: false
  });

  if (error) {
    errors = errors.concat(error.details);
  }

  return errors;
};
