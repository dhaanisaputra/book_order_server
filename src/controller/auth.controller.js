const { User } = require("../models");
const {
  createError,
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  CONFLICT,
} = require("../helpers/error.helper");

const postRegister = async (req, res, next) => {
  const props = req.body.user;

  if (
    !props.email ||
    !props.password ||
    !props.first_name ||
    !props.last_name ||
    !props.role
  ) {
    return next(
      createError({
        status: BAD_REQUEST,
        message:
          "Email, Password, First Name, Last Name and Role required field",
      })
    );
  }

  if (!props.password || !props.password.length < 6) {
    return next(
      createError({
        status: BAD_REQUEST,
        message: "Password must be at least 6 characters",
      })
    );
  }

  try {
    let user = await User.findOne({ email: props.email });
    if (user) {
      return next(
        createError({
          status: CONFLICT,
          message: "Username already exist",
        })
      );
    }
    user = await User.create(props);
    res.json({
      ok: true,
      message: "Registered Succesfully",
      user,
    });
  } catch (e) {
    next(e);
  }
};

const postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      createError({
        status: BAD_REQUEST,
        message: "Email and Password required field.",
      })
    );
  }

  try {
    const user = await User.verify(email.trim(), password);
    if (!user) {
      return next(
        createError({
          status: NOT_FOUND,
          message: "User Not Found",
        })
      );
    }
    return res.json({
      ok: true,
      message: "Login Successfully",
      token: user.token,
    });
  } catch (e) {
    return next(
      createError({
        status: UNAUTHORIZED,
        message: e,
      })
    );
  }
};

module.exports = {
  postLogin,
  postRegister,
};
