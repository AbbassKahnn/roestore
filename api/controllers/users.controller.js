const { StatusCodes } = require("http-status-codes");
const { ReasonPhrases } = require("http-status-codes");
const { QueryTypes } = require("sequelize");
const ErrorKey = require("../constants/errorKeys");
const ResponseModel = require("../constants/response.constant");
const sequelize = require("../sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getAllUsers = async (req, res, next) => {
  const response = new ResponseModel();
  try {
    const users = await sequelize.query(
      `
		select * from users
		`,
      {
        type: QueryTypes.SELECT,
      }
    );
    console.info("All records fetched from db");
    response.setData(users);
    response.setStatus(ReasonPhrases.OK);
    return res.status(StatusCodes.OK).send(response);
  } catch (err) {
    console.error(`Get all user error! ${err}`);
    if (
      err.ValidationError ||
      err.SyntaxError ||
      err.ForeignKeyConstraintError
    ) {
      req.body = {
        errorKey: ErrorKey.BAD_REQUEST,
      };
      return next();
    }
    req.body = {
      errorKey: ErrorKey.PARTIAL_CONTENT,
    };
    return next();
  }
};

exports.creatUser = async (req, res, next) => {
  const response = new ResponseModel();
  try {
	const isExist = await sequelize.query(
		`
			select * from users where email=$1 limit 1
			`,
		{
		  bind: [`${req.body.email}`],
		  type: QueryTypes.SELECT,
		}
	  );
	  if(isExist.length > 0) {
		req.body = {
			errorKey: ErrorKey.BAD_REQUEST,
		  };
		  return next();
	  }
    const encyptPassword = await bcrypt.hash(req.body.password, 10);
    await sequelize.query(
      `
    insert into users (user_name, first_name , last_name, email, phone_number, password)
    values ($1,$2,$3,$4,$5,$6) 
    `,
      {
        bind: [
          `${req.body.user_name}`,
          `${req.body.first_name}`,
          `${req.body.last_name}`,
          `${req.body.email}`,
          `${req.body.phone_number}`,
          `${encyptPassword}`,
        ],
        type: QueryTypes.INSERT,
      }
    );
    const user = await sequelize.query(
      `
		  select * from users where email=$1
		  `,
      {
        bind: [`${req.body.email}`],
        type: QueryTypes.SELECT,
      }
    );
    console.info("All records fetched from db");
    response.setData(user);
    response.setStatus(ReasonPhrases.OK);
    return res.status(StatusCodes.OK).send(response);
  } catch (err) {
    console.error(`Get all user error! ${err}`);
    if (
      err.ValidationError ||
      err.SyntaxError ||
      err.ForeignKeyConstraintError
    ) {
      req.body = {
        errorKey: ErrorKey.BAD_REQUEST,
      };
      return next();
    }
    req.body = {
      errorKey: ErrorKey.PARTIAL_CONTENT,
    };
    return next();
  }
};


exports.login = async (req, res, next) => {
	const response = new ResponseModel();
	try {
		let answer = null;
		let token = null;
	  const user = await sequelize.query(
		  `
			  select * from users where email=$1 OR user_name=$1 limit 1
			  `,
		  {
			bind: [`${req.body.user_name}`],
			type: QueryTypes.SELECT,
		  }
		);

		if(user.length <= 0){
			req.body = {
				errorKey: ErrorKey.UNAUTHORIZED,
			  };
			  return next();
		}

		const resoponse_compare = await bcrypt.compare(req.body.password, user[0].password);
        if (resoponse_compare) {
          //if password compared successfully, mean users logged in. 
		  //We will assign him a JWT token that user will use to access protected end points
           token = jwt.sign(
            {
              user_id: user[0].user_id,
              user_name: user[0].user_name,
              first_name: user[0].first_name,
              last_name: user[0].last_name,
              email: user[0].email,
              created_at: user[0].created_at,
			  updated_at: user[0].updated_at,
              phone_number: user[0].phone_number,
            },
            process.env.SECRET, //env secret is picked from env file
            {
              expiresIn: "24h",
            }
          );
           answer = {
            user_id: user[0].user_id,
              user_name: user[0].user_name,
              first_name: user[0].first_name,
              last_name: user[0].last_name,
              email: user[0].email,
              created_at: user[0].created_at,
			  updated_at: user[0].updated_at,
              phone_number: user[0].phone_number,
          };          
        } else {
			req.body = {
				errorKey: ErrorKey.UNAUTHORIZED,
			  };
			  return next();
        }
		
	  
	  console.info("All records fetched from db");
	  response.setData({
		message: "logged in successfully",
		user: answer,
		token: token,
	  });
	  response.setStatus(ReasonPhrases.OK);
	  return res.status(StatusCodes.OK).send(response);
	} catch (err) {
	  console.error(`Get all user error! ${err}`);
	  if (
		err.ValidationError ||
		err.SyntaxError ||
		err.ForeignKeyConstraintError
	  ) {
		req.body = {
		  errorKey: ErrorKey.BAD_REQUEST,
		};
		return next();
	  }
	  req.body = {
		errorKey: ErrorKey.PARTIAL_CONTENT,
	  };
	  return next();
	}
  };
