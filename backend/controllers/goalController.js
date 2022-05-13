const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");

// @desc  GET GOALS
// @route GET /api/goals
// @access private
const getGoals = asyncHandler(async (req, res) => {
	const goals = await Goal.find();
	res.status(200).json(goals);
});
// @desc  SET GOALS
// @route POST /api/goals
// @access private
const setGoal = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error("Please add goal field");
	}

	const goal = await Goal.create({
		text: req.body.text,
	});
	res.status(200).json(goal);
});
// @desc Update GOALS
// @route PUT /api/goals/:id
// @access private
const updateGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);

	if (!goal) {
		res.status(400);
		throw new Error("Goal not found!");
	}

	const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
	res.status(200).json(updatedGoal);
});
// @desc  DELETE GOALS
// @route DELETE /api/goals/:id
// @access private
const deleteGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findByIdAndDelete(req.params.id);
	if (!goal) {
		res.status(400);
		throw new Error("Goal not found!");
	}
	res.status(200).json({ id: req.params.id });
});
module.exports = {
	getGoals,
	setGoal,
	updateGoal,
	deleteGoal,
};
