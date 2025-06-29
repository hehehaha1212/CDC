//create, update. delete, like, getbyid, getbyuser
import  {Blog, User} from "../models/models.js";
import { uploadToCloudinary } from "../configs/configs.js";


export const createBlog = async (req, res) => {
  const {title, content,image}=req.body
  try {
    let imagedata={}
    if(image){
      const imageurl= await uploadToCloudinary(image,"Blogs")
      imagedata=imageurl;
    };

    const blog = new Blog({
      title,
      content,
      author: req.user.id,
      isPublished: req.body.isPublished || false,
      publishedAt: req.body.isPublished ? new Date() : null,
      images:imagedata,
    });

    await blog.save();
    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog
    });

  }catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getblogdata = async(req,res,next)=> {
  try{
    const blog= await Blog.findById(req.params.id);
    if(!blog){
      return res.status(404).json({message:'error'})
    }
     res.json({
      success:true,
      data:blog,
     });
    next();
  }catch(error){
    res.status(500).json({message:'server error'});
  }
};


export const updateBlog = async (req, res) => {
  const { title, content, isPublished ,image} = req.body;
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog){
      return res.status(404).json({ success: false, message: 'Blog not found' })
    };

    if (title   !== undefined) blog.title = title;
    if (content !== undefined) blog.content = content;
    if (isPublished !== undefined){
      blog.isPublished = isPublished;
      if (isPublished && !blog.publishedAt) blog.publishedAt = new Date();
    }
    if(image){
      const imageurl= await uploadToCloudinary(image,"Blogs")
      imagedata=imageurl;
    };
    await blog.save();

    res.json({ success: true, message: 'Blog updated successfully', data: blog });
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteBlog = async (req, res) => {
  try {

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    await blog.remove();

    res.json({ 
      success: true,
      message: 'Blog deleted successfully'
     });

  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


//deletes user data
  export const deleteuserblog = async (req, res) => {
  try {
    const { id } = req.params;
  
    // Check if user is deleting their own account or is admin
    if (req.user.id !== id || req.user.role !== 'admin') {
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


export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)

    res.json({ 
      success: true, 
      data: blog 
    });

  } catch (error) {
    console.error('Get blog error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};



export const getBlogsByUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const blogs = await Blog.find({ author: userId, isPublished: true })
      .sort({ publishedAt: -1 }) // latest first
      .populate();

    res.json({
      success: true,
      data: blogs
    });

  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
