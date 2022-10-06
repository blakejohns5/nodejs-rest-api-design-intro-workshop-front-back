const db = require("../models");
const { logger } = require("../config/config");

/**
 *
 * @TODO
 * Update the controller to the new Firebase Auth
 */
async function getUsers(req, res, next) {
  try {
    const users = await db.User.find({
      firstName: { $ne: null },
      lastName: { $ne: null },
    })
      .select({
        firstName: 1,
        lastName: 1,
      })
      .limit(10)
      .lean()
      .exec();

    res.status(200).send({
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

/**
 *
 * @TODO
 * Update the controller to the new Firebase Auth
 */
async function getUserDetails(req, res, next) {
  const { userId } = req.params;

  try {
    const user = await db.User.findOne({
      _id: userId,
    })
      .select("-password -__v -createdAt -updatedAt")
      .lean()
      .exec();

    res.status(200).send({
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

/**
 *
 * @TODO
 * Update the controller to the new Firebase Auth
 */
async function createUser(req, res, next) {
  const { firstName, lastName, email, password, speaks } = req.body;

  try {
    const user = await db.User.create({
      firstName,
      lastName,
      email,
      password,
      speaks,
    });

    res.status(200).send({
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        speaks: user.speaks,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 *
 * @TODO
 * Update the controller to the new Firebase Auth
 */
async function updateUser(req, res, next) {
  const { userId } = req.params;
  const { firstName, lastName } = req.body;

  try {
    const updatedUser = await db.User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
        },
      },
      {
        new: true,
      },
    ).select({
      firstName: 1,
      lastName: 1,
    });

    res.status(200).send({
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
}

/**
 *
 * @TODO
 * Update the controller to the new Firebase Auth
 *
 * @TODO
 *
 * use admin.auth().deleteUser()
 */
async function deleteUser(req, res, next) {
  const { userId } = req.params;

  try {
    const result = await db.User.deleteOne({
      _id: userId,
    }).lean();

    if (result.ok === 1 && result.deletedCount === 1) {
      res.status(200).send({
        data: "User removed",
      });
    } else {
      res.status(500).send({
        data: "User not removed",
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUsers: getUsers,
  getUserDetails: getUserDetails,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
};
