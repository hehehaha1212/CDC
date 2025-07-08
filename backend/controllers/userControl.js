import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Blog } from '../models/blog.js';
// Get all members
export const getAllMember = async (req, res) => {
	try {
		const users = await User.find({ isActive: true })
			.select('-password -email')
			.sort({ username: 1 });
		res.json(users);
	} catch (error) {
		res.status(500).json({ message: 'server error' });
	}
};

export const getUserDashboard = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');

		res.status(200).json({
			success: true,
			user
		});
	} catch (error) {
		res.status(500).json({ success: false, message: 'Server error' });
	}
};
//upload profile
export const updateProfile = async (req, res) => {
	try {
		const id = req.user.id;
		if (req.user.id !== id) {
			return res.status(403).json({
				success: false,
				message: 'Not authorized to update this profile'
			});
		}

		const user = await User.findById(id);

		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found'
			});
		}

		// Update only allowed fields
		const allowedUpdates = ['phone', 'college', 'rollno'];
		allowedUpdates.forEach(field => {
			if (req.body[field] !== undefined) {
				user[field] = req.body[field];
			}
		});
		user.updatedAt = new Date();
		await user.save();
		res.json({
			success: true,
			message: 'Profile updated successfully',
			data: user,
		});

	} catch (error) {
		console.error('Update profile error:', error);
		res.status(500).json({
			success: false,
			message: 'Server error'
		});
	}
};
/*
  //upload profile pic
  export const uploadProfileImage = async (req, res) => {
	try {
	  const { id } = req.params;
  
	  // Check if user is uploading to their own profile
	  if (req.user.id !== id) {
		return res.status(403).json({
		  success: false,
		  message: 'Not authorized to upload to this profile'
		});
	  }
  
	  if (!req.file) {
		return res.status(400).json({
		  success: false,
		  message: 'No image file provided'
		});
	  }
  
	  const user = await User.findById(id);
  
	  if (!user) {
		return res.status(404).json({
		  success: false,
		  message: 'User not found'
		});
	  }
  
	  // Upload to Cloudinary
	  const imageUrl = await uploadToCloudinary(req.file.buffer, {
		folder: 'club-members/avatars',
		public_id: `avatar_${user._id}`,
		transformation: [
		  { width: 400, height: 400, crop: 'fill', gravity: 'face' },
		  { quality: 'auto' }
		]
	  });
  
	  // Update user profile
	  user.profile.profileImage = imageUrl;
	  user.updatedAt = new Date();
	  await user.save();
  
	  res.json({
		success: true,
		message: 'Profile picture uploaded successfully',
		data: {
		  profileImage: imageUrl
		}
	  });
  
	} catch (error) {
	  console.error('Upload avatar error:', error);
	  res.status(500).json({
		success: false,
		message: 'Server error during image upload'
	  });
	}
  }
*/
//get blogs by user
export const getUserBlogs = async (req, res) => {
	try {
		const { id } = req.params;
		const { page = 1, limit = 10, status = 'published' } = req.query;

		let query = { author: id };

		// If user is requesting their own blogs, they can see unpublished ones
		if (req.user && req.user.id === id) {
			if (status === 'all') {
				// No additional filter
			} else if (status === 'draft') {
				query.isPublished = false;
			} else {
				query.isPublished = true;
			}
		} else {
			// Public access - only published blogs
			query.isPublished = true;
		}

		const blogs = await Blog.find(query)
			.populate('author', 'username profile.firstName profile.lastName profile.profileImage')
			.sort({ createdAt: -1 })
			.limit(limit * 1)
			.skip((page - 1) * limit);

		const total = await Blog.countDocuments(query);

		res.json({
			success: true,
			data: blogs,
			pagination: {
				page: parseInt(page),
				limit: parseInt(limit),
				total,
				pages: Math.ceil(total / limit)
			}
		});

	} catch (error) {
		console.error('Get user blogs error:', error);
		res.status(500).json({
			success: false,
			message: 'Server error'
		});
	}
};

//deletes user data
export const deactivateUser = async (req, res) => {
	try {
		const { id } = req.params;
		// Check if user is deleting their own account or is admin
		if (req.user.id !== id && req.user.role !== 'admin') {

			return res.status(403).json({
				success: false,
				message: 'Not authorized to delete this account'
			});
		}
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found'
			});
		}
		// Soft delete - just deactivate
		user.isActive = false;
		user.updatedAt = new Date();

		await user.save();

		res.json({
			success: true,
			message: 'Account deactivated successfully'
		});

	} catch (error) {
		console.error('Delete user error:', error);
		res.status(500).json({
			success: false,
			message: 'Server error'
		});
	}
};

// Team dashboard
export const teamDashboard = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user || !user.teamID) {
			return res.status(404).json({ message: 'User or team not found' });
		}
		const team = await Team.findById(user.teamID);
		if (!team) {
			return res.status(404).json({ message: 'Team not found' });
		}
		res.json({ success: true, data: team });
	} catch (error) {
		res.status(400).json({ message: 'Error loading dashboard' });
	}
};

// User dashboard
export const userDashboard = async (req, res) => {
	try {
		const profile = await User.findById(req.user.id).select('-password');
		if (!profile) {
			return res.status(404).json({ message: 'error getting user data' });
		}
		const { username, email, phone, college, rollno, teamname } = profile;
		res.json({
			success: true,
			username,
			email,
			phone,
			college,
			rollno,
			teamname,
		});
	} catch (error) {
		res.status(400).json({ message: 'error getting user data' });
	}
};