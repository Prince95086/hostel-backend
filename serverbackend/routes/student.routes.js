import express from "express";

import {
  checkRollNoAvailability,
  registerStudent,
  getStudentById,
  getAllStudents,
  deleteStudent,
  getMyAccount,
} from "../controllers/student.controller.js";

import { upload } from "../middleware/upload.middleware.js";
// import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

/* ======================================================
   CHECK ROLL NUMBER AVAILABILITY
   GET /api/students/check-availability/:rollNo
====================================================== */

router.get(
  "/check-availability/:rollNo",
  checkRollNoAvailability
);

/* ======================================================
   REGISTER STUDENT
   POST /api/students/register

   Photo + Signature are stored in memory by Multer
   and then uploaded to Cloudinary in controller.
====================================================== */

router.post(
  "/register",
  upload.fields([
    {
      name: "photo",
      maxCount: 1,
    },
    {
      name: "signature",
      maxCount: 1,
    },
  ]),
  registerStudent
);

/* ======================================================
   GET MY ACCOUNT
   GET /api/students/my-account
====================================================== */

// Uncomment these when authentication is required
// router.get(
//   "/my-account",
//   verifyToken,
//   getMyAccount
// );

/* ======================================================
   GET ALL STUDENTS
   GET /api/students
====================================================== */

router.get(
  "/",
  getAllStudents
);

/* ======================================================
   GET STUDENT BY ID
   GET /api/students/:id
====================================================== */

router.get(
  "/:id",
  getStudentById
);

/* ======================================================
   DELETE STUDENT BY ID
   DELETE /api/students/:id
====================================================== */

router.delete(
  "/:id",
  deleteStudent
);

export default router;