// Import Like model
Like = require("../models/Like");
// Import Post model
Post = require("../models/Post");

// let handleLikeNumbers= (likeNumber) => {

// }

exports.add = function(req, res) {
  const likeBody = req.body;
  Like.find(
    { post_id: likeBody.post_id, username: likeBody.username },
    function(err, response) {
      // If user is find
      if (response[0]) {
        // Search by username
        console.log("this is like", response[0]);
        Post.find({ _id: likeBody.post_id }, function(error, result) {
          console.log("this id post", result);
          if (response[0].is_liked) {
            result[0].likes--;
            result[0].likeStatus = "https://i.ibb.co/jbbLLYM/like-toggle.png";
            response[0].is_liked = false;
            response[0].save(function(err) {
              if (err) res.json(err);
              res.json({
                message: "disliked",
                data: response[0]
              });
            });
            result[0].save(function(err) {
              if (err) res.json(err);
              // res.json({
              //   message: "like number",
              //   data: result[0]
              // });
            });
          } else {
            result[0].likes++;
            result[0].likeStatus = "https://i.ibb.co/yq9Xb5L/like.png";
            response[0].is_liked = true;

            response[0].save(function(err) {
              if (err) res.json(err);
              res.json({
                message: "liked",
                data: response[0]
              });
            });
            result[0].save(function(err) {
              if (err) res.json(err);
              // res.json({
              //   message: "like number",
              //   data: result[0]
              // });
            });
          }
        });
      } else {
        console.log("response.username not found");
        // If user isn't find
        // We will add user like into collection Likes
        Post.find({ _id: likeBody.post_id }, function(error, result) {
          result[0].likes++;
          result[0].likeStatus = "https://i.ibb.co/yq9Xb5L/like.png";
          result[0].save(function(err) {
            if (err) res.json(err);
            // res.json({
            //   message: "like number",
            //   data: result[0]
            // });
          });
        });
        let like = new Like();
        like.post_id = likeBody.post_id;
        like.username = likeBody.username;
        // Changed status
        like.is_liked = true;
        like.save(function(err) {
          if (err) res.json(err);
          res.json({
            message: "Like added",
            data: like
          });
        });
      }
    }
  );
};

exports.get = function(req, res) {
  Like.count({ post_id: req.params.post_id, is_liked: true }, function(
    err,
    count
  ) {
    if (err) {
      res.json(err);
    } else {
      // Here is count of like's for post
      console.log(count);
      // TO DO
      // Write down count into Post.likes model
    }
  });
};
