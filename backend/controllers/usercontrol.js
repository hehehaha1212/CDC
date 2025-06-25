import usermodel from "../model/model"
import blogmodel from "../model/model"

export const getAllMember = async (req,res)=> {
try {
	const users= await  usermodel.find({isactive:true})
	.select('=password -email')
	.sort({'profile.name':1});
	res.json(users); 
	}
	catch(error){
	res.status(500).json({message:'server error'});	
	}
    
};

export const getUserProfile = async(req,req)=>{
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

//create blog
router.post('/', [
    protect,
    body('title').trim().islength({ min: 3, max: 50 }).withMessage("title length btwn 3 t 50 chars"),
    body('content').trim().islength({ min: 1 }).withMessage('content is required'),
    body('isPublished').optional().isBoolean().withMessage('ispublishedmustbebool'),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
            });
        }

        const { title, content, isPublished = false } = req.body;

        const blog = new Blog({
            title,
            content,
            author: req.user.id,
            isPublished,
            publishedAt: isPublished ? new Date() : null,
            views: 0,
            likes: []
        });

        await blog.save();

        await blog.populate('author', 'username profile.firstName profile.lastName profile.profileImage');

        res.status(201).json({
            success: true,
            message: 'Blog created successfully',
            data: blog
        });
    } catch (error) {

        console.error('Create blog error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

//upload profile
export const updateprofile = async (req, res) => {
	try {
	  // Check validation errors
	  const errors = validationResult(req);
	  if (!errors.isEmpty()) {
		return res.status(400).json({
		  success: false,
		  message: 'Validation failed',
		  errors: errors.array()
		});
	  }
  
	  const { id } = req.params;
  
	  // Check if user is updating their own profile
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
		const team= await team.findById(id);
		if(team==null){
			return res.status(400).json({
				message:error
			});
		}
		res.json

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
	  
	}
  };