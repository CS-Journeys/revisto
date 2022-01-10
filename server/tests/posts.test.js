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
      User.findOne({ email: "test@test.com" }, (err, user) => {
        if (err) {
          done();
        } else {
          userId = user._id;
          token = createJWT({userId});
          done();
        }
      });
    }
  );
});

describe("Front Page", () => {
  test("should GET all posts", async () => {
    await supertest(app)
      .get("/api/posts")
      .expect(200)
      .then((res) => {
        expect(res.body.posts).toBeDefined();
        expect(Array.isArray(res.body.posts)).toBeTruthy();
      });
  });

  test("should GET a single post", async () => {
    const post = await Post.findOne({});
    await supertest(app)
      .get(`/api/posts/id/${post._id}`)
      .expect(200)
      .then((res) => {
        expect(res.body.post).toBeDefined();
        expect(res.body.post.title).toEqual(post.title);
        expect(res.body.post.content).toEqual(post.content);
      });
  });
  describe("Error Handling", () => {
    test("can't GET nonexsistent post", async () => {
      await supertest(app)
        .get(`/api/posts/id/5e9f8f9f9f9f9f9f9f9f9f9`)
        .expect(200)
        .then((res) => {
          expect(res.body.post).toBeUndefined();
          expect(res.body.err).toEqual("NOTAPOST");
        });
    });
  });
});

describe("Unathorized Interactions", () => {
  test("should deny unauthorized GET", (done) => {
    supertest(app)
      .get("/api/posts/user")
      .expect(401)
      .then((res) => {
        expect(res.body.err).toEqual("NOTOKEN");
        done();
      });
  });

  test("should deny unauthorized POST", (done) => {
    supertest(app)
      .post("/api/posts")
      .expect(401)
      .then((res) => {
        expect(res.body.err).toEqual("NOTOKEN");
        done();
      });
  });

  test("should deny unauthorized DELETE", (done) => {
    supertest(app)
      .delete("/api/posts/id/61b517baa5ef68156885298f")
      .expect(401)
      .then((res) => {
        expect(res.body.err).toEqual("NOTOKEN");
        done();
      });
  });

  test("should deny unauthorized PATCH", (done) => {
    supertest(app)
      .patch("/api/posts/id/61b517baa5ef68156885298f")
      .expect(401)
      .then((res) => {
        expect(res.body.err).toEqual("NOTOKEN");
        done();
      });
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
              expect(res.body.err).toBeUndefined();
              expect(res.body.status).toBe("Success");
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
    beforeAll((done) => {
      Post.findOne({ user: { $ne: userId } }).then((post) => {
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

    test("Can't pass in a bad hash to PATCH", (done) => {
      supertest(app)
        .patch("/api/posts/id/61b9277www352a2b2ebecc336")
        .auth(token, { type: "bearer" })
        .expect(200)
        .then((res) => {
          expect(res.body.err).toBeDefined();
          expect(res.body.err).toBe("BADQUERY");
          done();
        });
    });

    test("Can't pass in a bad hash to DELETE", (done) => {
      supertest(app)
        .delete("/api/posts/id/61b9277www352a2b2ebecc336")
        .auth(token, { type: "bearer" })
        .expect(200)
        .then((res) => {
          expect(res.body.err).toBeDefined();
          expect(res.body.err).toBe("BADQUERY");
          done();
        });
    });
  });
});

afterAll((done) => {
  mongoose.disconnect(done);
});
