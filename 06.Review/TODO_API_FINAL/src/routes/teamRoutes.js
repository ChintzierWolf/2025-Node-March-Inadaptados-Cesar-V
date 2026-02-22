import express from 'express';

import { getTeams, getTeamById, updateTeam, deleteTeamMember, deleteTeam, createTeam } from '../controllers/teamController.js';
import isAuth from '../middlewares/isAuth.js';
import isLeader from '../middlewares/isLeader.js';

const router = express.Router();

router.get('/', isAuth, getTeams);

router.get('/:teamId', isAuth, getTeamById);

router.post('/', isAuth, isLeader, createTeam);

router.put('/:teamId', isAuth, isLeader, updateTeam);

router.delete('/remove/:teamId/member/:userId', isAuth, isLeader, deleteTeamMember);

router.delete('/:teamId', isAuth, isLeader, deleteTeam);

export default router;