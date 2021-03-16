const router = require("express").Router();
const { Workout } = require("../models");

router.get("/api/workouts", async (req, res) => {
    try {
      const workouts = await Workout.aggregate([
        {
          $addFields: {
            totalDuration: { $sum: "$exercises.duration" }
          }
        }
      ]).exec();
  
      res.json(workouts);
    } catch(error) {
      res.sendStatus(500);
  
      throw error;
    }
  });
  