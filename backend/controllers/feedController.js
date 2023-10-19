const feedModel = require("../models/feedModel");
const jwt = require("jsonwebtoken");
const jwtSecret = "MynameIsBabithPoojary";

// CREATE A FEEDS CONTROLLER

const createFeeds = async (req, res) => {
  try {
    let feedsData = req.body;

    const userId = req.user.user_id;
    console.log(userId);

    if (Object.keys(feedsData).length === 0) {
      return res.status(400).send({ status: false, msg: "no data provided" });
    }

    // Check if the object has been successfully uploaded
    if (!req.file) {
      return res
        .status(400)
        .send({ status: false, msg: "No project image provided" });
    }

    let saveFeeds = await feedModel.create({
      ...feedsData,
      user: userId,
      image: req.file.location,
    });
    return res.status(201).send({
      status: true,
      msg: "feed upload success",
      data: saveFeeds,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Internal server error", staus: false });
  }
};

//DISPLAY ALL THE FEEDS OF LOGGED IN USER

const getFeeds = async (req, res) => {
  try {
    const userId = req.query.user;

    const userFeeds = await feedModel.find({ user: userId });

    return res.status(200).json({
      status: true,
      msg: "User feeds retrieved successfully",
      data: userFeeds,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Internal server error", status: false });
  }
};

//DELETE A PROJECT

const deleteFeed = async (req, res) => {
  try {
    const feedId = req.query.id;

    // Check if the project exists and is associated with the user
    const feedToDelete = await feedModel.findOne({
      _id: feedId,
    });

    if (!feedToDelete) {
      return res
        .status(404)
        .json({ status: false, msg: "feed not found for the user" });
    }

    await feedModel.findByIdAndDelete(feedId);

    return res.status(200).json({
      status: true,
      msg: "Feed deleted successfully",
      deleted_feed: feedToDelete,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Internal server error", status: false });
  }
};

// UPDATE A PROJECT
const updateFeed = async (req, res) => {
  try {
    const feed_id = req.query.id;
    const feedDataToUpdate = req.body;

    if (!feed_id) {
      return res.status(400).json({
        status: false,
        msg: "No userId or feedId provided",
      });
    }

    // Construct an update object with only provided fields
    const updateObject = {};
    for (const key in feedDataToUpdate) {
      if (feedDataToUpdate[key] !== undefined) {
        updateObject[key] = feedDataToUpdate[key];
      }
    }

    // Assuming projectModel has an update method
    const updatedFeed = await feedModel.findByIdAndUpdate(
      feed_id,
      updateObject,
      { new: true }
    );

    if (!updatedFeed) {
      return res.status(404).json({ status: false, msg: "Feed not found" });
    }

    return res.status(200).json({
      status: true,
      msg: "Feed updated successfully",
      data: updatedFeed,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, msg: "Internal server error" });
  }
};

module.exports = { createFeeds, getFeeds, deleteFeed, updateFeed };
