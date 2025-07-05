import { User , Team} from '../models/models'


export const getAllUsers= async (req, res) => {
        try {
            const users = await User.find().populate('teamId', 'name ranking');
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching users', error: err.message });
        }};

