const Joi = require("joi");

const user_schema = Joi.object({
  name: Joi.string().trim().min(4).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    maxDomainSegments: 2,
    tlds: { allow: ["com", "net", "in"] },
  }).min(5).max(50).required(),
  password: Joi.string().trim().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(8).max(30).required(),
});


module.exports.isRegisterFormValid = (params) => {
  return new Promise(async (resolve, reject) => {
    const { error, value } = await user_schema.validate(params, { abortEarly: false })
    if(error) {
      console.error("error : ", error.details)
      reject(error.details)
    }else{
      console.log("validation successful : ", value)
      resolve(value)
    }
  })
}