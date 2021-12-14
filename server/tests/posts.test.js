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
  
  let postId;

  test("should GET user's posts", done => {
    supertest(app)
      .get("/api/posts/user")
      .auth(token, { type: "bearer" })
      .expect(200)
      .then((res) => {
        expect(res.body.posts).toBeDefined();
        expect(Array.isArray(res.body.posts)).toBeTruthy();
        done();
      });
  });
  test('should create new post', async () => {
    await supertest(app)
      .post('/api/posts')
      .auth(token, { type: 'bearer' })
      .send({
        title: 'test post',
        content: 'test content',
      })
      .expect(200)
      .then((res) => {
        expect(res.body.post).toBeDefined();
        expect(res.body.post.title).toBe('test post');
        expect(res.body.post.content).toBe('test content');
        expect(res.body.post.user).toBe(userId);
        postId = res.body.post._id;
      });
  })

  afterAll(async () => {
    //Delete the post created in the CREATE test.
    await Post.findByIdAndDelete(postId);
  });
});

afterAll((done) => {
  mongoose.disconnect(done);
});
