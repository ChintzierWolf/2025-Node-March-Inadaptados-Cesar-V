import mongoose from "mongoose";

const Schema = mongoose.Schema;


const teamSchema = new Schema(
    {
        users: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                }
            }
        ],
        teamName: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const Team = mongoose.model('Team', teamSchema);

export default Team;