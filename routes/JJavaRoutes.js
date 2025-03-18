<<<<<<< Updated upstream
// import express from "express";
// import { getJProgress, updateJProgress, markJAsRead } from "../controllers/JProgressController.js";
=======
import express from "express";
import { getJavaProgress, updateJavaProgress, markAsReadJava } from "../controllers/JProgressController.js";
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

// const router = express.Router();

<<<<<<< Updated upstream
<<<<<<< Updated upstream
// router.get("/api/progress/jget-progress/:userId", getJProgress);
// router.post("/api/progress/jupdate-progress", updateJProgress);
// router.post("/api/progress/jmark-as-read", markJAsRead);
=======
router.get("/api/progress/jget-progress/:userId", getJavaProgress);
router.post("/api/progress/jupdate-progress", updateJavaProgress);
router.post("/api/progress/jmark-as-read", markAsReadJava);
>>>>>>> Stashed changes
=======
router.get("/api/progress/jget-progress/:userId", getJavaProgress);
router.post("/api/progress/jupdate-progress", updateJavaProgress);
router.post("/api/progress/jmark-as-read", markAsReadJava);
>>>>>>> Stashed changes

// export default router;


