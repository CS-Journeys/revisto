import app from "../app.js";
import supertest from "supertest";
import mongoose from "mongoose";
import "babel-polyfill";
import dotenv from "dotenv";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import { createJWT } from "../auth/jwtAuth.js";

const { parsed: env } = dotenv.config();
let token;
let userId;
beforeAll((done) => {
  mongoose.connect(
    env.ATLAS_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      User.findOne({ username: "test@test.com" }, (err, user) => {
        if (err) {
          done();
        } else {
          token = createJWT(user._id);
          userId = user._id;
          done();
        }
      });
    }
  );
});

describe("Front Page (Available to Anyone)", () => {
  test("should GET posts at /api/posts", async () => {
    await supertest(app)
      .get("/api/posts")
      .expect(200)
      .then((res) => {
        expect(res.body.posts).toBeDefined();
        expect(Array.isArray(res.body.posts)).toBeTruthy();
      });
  });
});

describe("Unathorized Interactions", () => {
  test("should deny unauthorized GET", async () => {
    await supertest(app).get("/api/posts/user").expect(401);
  });

  test("should deny unauthorized POST", async () => {
    await supertest(app).post("/api/posts").expect(401);
  });

  test("should deny unauthorized DELETE", async () => {
    await supertest(app)
      .delete("/api/posts/id/61b517baa5ef68156885298f")
      .expect(401);
  });

  test("should deny unauthorized PATCH", async () => {
    await supertest(app)
      .patch("/api/posts/id/61b517baa5ef68156885298f")
      .expect(401);
  });
});

describe("User Interactions", () => {
  let created;
  var postId;

  test("should GET user's posts", (done) => {
    supertest(app)
      .get("/api/posts/user")
      .auth(token, { type: "bearer" })
      .expect(200)
      .then((res) => {
        expect(res.body.err).not.toBeDefined();
        expect(res.body.posts).toBeDefined();
        expect(Array.isArray(res.body.posts)).toBeTruthy();
        done();
      });
  });
  test("should create new post", (done) => {
    supertest(app)
      .post("/api/posts")
      .auth(token, { type: "bearer" })
      .send({
        title: "test_post_deleteme",
        content: "test content",
      })
      .expect(200)
      .then((res) => {
        expect(res.body.err).not.toBeDefined();
        expect(res.body.status).toBe("Success");
        expect(res.body.id).toBeDefined();
        Post.findByIdAndRemove(res.body.id).then(() => {
          done();
        });
      });
  });
  test("should update post", (done) => {
    Post.create({
      title: "Test Post",
      content: "Test Content",
      user: userId,
    }).then((post) => {
      post.save((err, spost) => {
        if (err) {
          done();
        } else {
          postId = spost._id;
          supertest(app)
            .patch(`/api/posts/id/${postId.toString()}`)
            .auth(token, { type: "bearer" })
            .send({
              title: "Updated Title",
              content: "Updated Content",
            })
            .expect(200)
            .then((res) => {
              expect(res.body.err).not.toBeDefined();
              expect(res.body.post).toBeDefined();
              expect(res.body.post.title).toBe("Updated Title");
              expect(res.body.post.content).toBe("Updated Content");
              Post.findByIdAndDelete(postId).then((post) => {
                expect(post).toBeDefined();
                expect(post.title).toBe("Updated Title");
                expect(post.content).toBe("Updated Content");
                done();
              });
            });
        }
      });
    });
  });

  test("should delete post", (done) => {
    Post.create({
      title: "Test Post",
      content: "Test Content",
      user: userId,
    }).then((post) => {
      post.save((err, spost) => {
        if (err) {
          done("Couldn't Create a Post");
        } else {
          postId = spost._id;
          supertest(app)
            .delete(`/api/posts/id/${postId.toString()}`)
            .auth(token, { type: "bearer" })
            .expect(200)
            .then((res) => {
              expect(res.body.err).not.toBeDefined();
              expect(res.body.status).toBe("Success");
              Post.findById(postId).then((post) => {
                expect(post).toBeNull();
                done();
              });
            });
        }
      });
    });
  });

  describe("Error Handling", () => {
    let otherPostId;
    beforeAll(done => {
      Post.findOne({ user: { $ne: userId } }).then(post => {
        otherPostId = post._id;
        done();
      });
    });

    test("Can't PATCH nonexsistent post", (done) => {
      supertest(app)
        .patch("/api/posts/id/61b9277be352a2b2ebecc336")
        .auth(token, { type: "bearer" })
        .expect(200)
        .then((res) => {
          expect(res.body.err).toBeDefined();
          expect(res.body.err).toBe("NOTAPOST");
          done();
        });
    });

    test("Can't DELETE nonexsistent post", (done) => {
      supertest(app)
        .delete("/api/posts/id/61b9277be352a2b2ebecc336")
        .auth(token, { type: "bearer" })
        .expect(200)
        .then((res) => {
          expect(res.body.err).toBeDefined();
          expect(res.body.err).toBe("NOTAPOST");
          done();
        });
    });

    test("Can't PATCH other user's post", (done) => {
      supertest(app)
        .patch(`/api/posts/id/${otherPostId.toString()}`)
        .auth(token, { type: "bearer" })
        .expect(200)
        .then((res) => {
          expect(res.body.err).toBeDefined();
          expect(res.body.err).toBe("NOTAUTHOR");
          done();
        });
    });

    test("Can't DELETE other user's post", (done) => {
      supertest(app)
        .delete(`/api/posts/id/${otherPostId.toString()}`)
        .auth(token, { type: "bearer" })
        .expect(200)
        .then((res) => {
          expect(res.body.err).toBeDefined();
          expect(res.body.err).toBe("NOTAUTHOR");
          done();
        });
    });

  });
});

afterAll((done) => {
  mongoose.disconnect(done);
});
