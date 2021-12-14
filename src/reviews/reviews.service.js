const knex = require("../db/connection");
const addCritics = require("../utils/addCritics");
const reformat = require("../utils/reformat")

function list(movieId) {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.", "c.")
    .where({ "r.movie_id": movieId })
    .then((data) => data.map((i) => addCritics(i)));
};

function read(review_id) {
  return knex("reviews").select("*").where({ review_id }).first();
}

function readReviewCritic(reviewId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ "r.review_id": reviewId })
    .then(reformat);
}

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
    .then((updatedReview) => updatedReview[0])
}

function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}


module.exports = {
  list,
  read,
  readReviewCritic,
  update,
  delete: destroy,
};