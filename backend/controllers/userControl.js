/*
get all members
get user profile
update profile
upload profile image??
get all blogs 
delete user
teamdashboard
userdashboard
verify for membership
*/
import { User, Blog} from '../models/models.js'


export const getAllMember = async (req,res)=> {
try {
	const users= await  User.find({isactive:true})
	.select('=password -email')
	.sort({'profile.name':1});
	res.json(users); 
	}
	catch(error){
	res.status(500).json({message:'server error'});	
	}
    
};

export const getUserProfile = async(req,res)=>{
	try{
	const user= await usermodel.findById(req.params.id).select('-password');
	const blogs = await blogmodel.find({
		author:req.params.id,
		isPublised:true
		}).sort({publishedAt:-1});

	res.json({
		body:user.blogs
	});
	} catch(error){
	res.status(500).json({message:'server error'})
	}
};

//upload profile
export const updateprofile = async (req, res) => {
	try {

	  const { id } = req.params;
	  // Check if user is updating their own profile
	  if (req.user._id !== id) {
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
	  const allowedUpdates = ['profile'];
	  const updates = {};
  
	  Object.keys(req.body).forEach(key => {
		if (allowedUpdates.includes(key)) {
		  updates[key] = req.body[key];
		}
	  });
  
	  // Merge profile updates
	  if (updates.profile) {
		user.profile = { ...user.profile.toObject(), ...updates.profile };
	  }
  
	  user.updatedAt = new Date();
	  await user.save();
  
	  res.json({
		success: true,
		message: 'Profile updated successfully',
		data: {
		  id: user._id,
		  username: user.username,
		  profile: user.profile,
		  updatedAt: user.updatedAt
		}
	  });
  
	} catch (error) {
	  console.error('Update profile error:', error);
	  res.status(500).json({
		success: false,
		message: 'Server error'
	  });
	}
  };

  //upload profile pic
  export const uploadprofileimage = async (req, res) => {
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

  //get blogs by user
  export const getuserblogs = async (req, res) => {
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
  export const deleteuserblog = async (req, res) => {
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

  export const teamdashboard =  async (req,res)=>{
	try{
		const id= req.params;
		const user= await user.findById(id);
		const teamid = user.teamID;
		const team= await team.findById(teamid);
		if(team==null){
			return res.status(400).json({
				message:error
			});
		}
		res.json({
			success: true,
			data:team,
		  });
	}catch(error){
		console.error("cant load dashboard",error);
		res.status(400).json({
			message:'idk bhai'
		});
	}
  };

  export const userDashboard = async(req,res)=>{
	try{
		const id= req.params;
		const  profile =await user.findById(id);
		if(profile==null){
			return res.status(404).json({
				message:'error getting user data'
			});
		}
		const {username, email,phone,college,rollno,teamname}=profile;
		res.json({
			success:true,
			username,    
			email,            
			phone,     
			college,       
			rollno ,       
			teamname,
		});

	}catch(error){
		console.error(error);
		res.status(400).json({
			message:'error getting user data'
		})
	}
  };