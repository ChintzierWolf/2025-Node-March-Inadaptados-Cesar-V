import Team from '../models/team.js';

async function getTeams(req, res) {
    try {
        const teams = await Team.find().populate('users.userId');

        if (!teams || teams.length === 0) {
            return res.status(404).json({ message: 'No teams found' });
        }
        res.status(200).json({ teams });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Unable to get teams, Internal Server Error' });
    }
}

async function getTeamById(req, res) {
    try {
        const { teamId } = req.params;
        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).json({ message: 'Team not found' })
        }

        await team.populate('users.userId');
        res.status(200).json({ team });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Unable to get team, Internal Server Error' });
    }
}

async function createTeam(req, res) {
    try {
        const { users, teamName, description } = req.body;

        if (!user || !teamName || !description || !Array.isArray(users)) {
            return res.status(400).json({ message: 'Users, teamName and description are required' });
        }

        const newTeam = await Team.create({
            users,
            teamName,
            description
        });

        await newTeam.populate('users.userId');

        res.status(201).json({ newTeam });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Unable to create team, Internal Server Error' });
    }
}

async function updateTeam(req, res) {
    try {
        const { teamId } = req.params;
        const { users, teamName, description } = req.body;
        const userId = req.user.userId;

        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).json({ message: 'No team found' });
        }

        const leaderIndex = team.users.findIndex(leader => leader.userId.toString() === userId);

        if (leaderIndex === -1) {
            return res.status(404).json({ error: 'Leader does not exists or is not in this team' });
        }

        const updatedTeam = {
            users,
            teamName,
            description
        }

        const newUpdatedTeam = await Team.findByIdAndUpdate(teamId, updatedTeam);

        res.status(200).json({ message: 'Team updated succesfully', team: newUpdatedTeam });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Unable to update team, Internal Server Error' });
    }
}

async function deleteTeamMember(req, res) {
    try {
        const { teamId, userId } = req.params;

        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }

        const memberIndex = team.users.findIndex(member => member.userId.toString() === userId);

        if (memberIndex === -1) {
            return res.status(404).json({ error: 'Member not found' });
        }

        team.users.splice(memberIndex, 1);

        await team.save();
        await team.populate('users.userId');

        return res.status(200).json({ message: 'Member removed from team succesfully', team });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Unable to delete team member, Internal Server Error' })
    }
}

async function deleteTeam(req, res) {
    const { teamId } = req.params;

    const team = await Team.findById(teamId);

    if (!team) {
        return res.status(404).json({ error: 'Team not found' });
    }

    await Team.findByIdAndDelete(teamId);

    res.status(204).json();
}

export { getTeams, getTeamById, createTeam, updateTeam, deleteTeamMember, deleteTeam };