import app from "../app.js";
import supertest from "supertest";
import mongoose from "mongoose";
import "babel-polyfill";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import { createJWT } from "../auth/jwtAuth.js";
import { isTypedArray } from "util/types";

const { parsed: env } = dotenv.config();
let token;
let userId;
let lan;
beforeAll((done) => {
  mongoose.connect(
    env.ATLAS_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      User.findOne({ email: "test@test.com" }, (err, user) => {
        if (err) {
          done();
        } else {
          token = createJWT(user._id);
          lan = user.language;
          userId = user._id;
          done();
        }
      });
    }
  );
});

describe("User", () => {
  test("should register", done => {
    User.findOneAndDelete({ email: "TESTUSER" }, () => {
      supertest(app)
        .post("/api/users/register")
        .send({
          email: "TESTUSER",
          password: "TESTPASS",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.err).toBeUndefined();
          expect(res.body.status).toBe("Success");
          User.findOneAndDelete({ email: "TESTUSER" }, (err, user) => {
            done();
          });
        });
    });
  });
  test("should login", async () => {
    await supertest(app)
      .post("/api/users/login")
      .send({
        email: "test@test.com",
        password: "INTERNALDONTDELETE",
      })
      .expect(200)
      .then((res) => {
        expect(res.body.token).toBeDefined();
      });
  });

  test("should GET current user", done => {
    supertest(app)
      .get("/api/users/")
      .auth(token, { type: "bearer" })
      .expect(200)
      .then((res) => {
        expect(res.body.user).toBeDefined();
        expect(res.body.user.email).toBe("test@test.com");
        done();
      });
  });

  test("should PATCH user", done => {
    let newLan = "EN";
    if (lan === "EN") {
      newLan = "MA";
    }
    supertest(app)
      .patch("/api/users/")
      .auth(token, { type: "bearer" })
      .send({
        language: newLan
      })
      .expect(200)
      .then((res) => {
        expect(res.body.err).toBeUndefined();
        expect(res.body.status).toBe("Success");
        User.findById(userId, (err, user) => {
          if (!err) {
            expect(user.language).toBe(newLan);
          }
          done();
        });
      });
  });
  test("should DELETE user", done => {
    User.create({
      email: "TESTUSER",
    }, (err, user) => {
      if (user) {
        user.save((err, user) => {
          if (user) {
            userId = user._id;
            let userToken = createJWT(user._id);
            supertest(app)
              .delete("/api/users/")
              .auth(userToken, { type: "bearer" })
              .expect(200)
              .then((res) => {
                expect(res.body.err).toBeUndefined();
                expect(res.body.status).toBe("Success");
                User.findById(userId, (err, user) => {
                  if (!err) {
                    expect(user).toBeNull();
                  }
                  done();
                });
              });
          }
          else {
            done();
          }
        });
      }
      else {
        done();
      }
    });
  });

  describe('Error Handling', () => {
    test("can't register with existing email", done => { 
      supertest(app)
        .post("/api/users/register")
        .send({
          email: "test@test.com",
          password: "TESTPASS",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.err).toBe("USERTAKEN");
          done();
        });
    });

    test("can't login with non-existent email", done => { 
      supertest(app)
        .post("/api/users/login")
        .send({
          email: "hciuoicnwon@ncownoc.coi",
          password: "TESTPASS",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.err).toBe("INCORRECTLOGIN");
          done();
        });
    });

    test("can't use malformed bearer token", done => {
      supertest(app)
        .get("/api/users/")
        .auth("malformed", { type: "bearer" })
        .expect(401).then(res => {
          expect(res.body.err).toBe("BADTOKEN");
          done();
        });
    });
  });
});

afterAll((done) => {
  mongoose.disconnect(done);
});
