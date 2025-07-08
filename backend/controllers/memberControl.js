import  {Blog} from "../models/blog.js";
import {Member} from "../models/member.js";
import { uploadToCloudinary } from "../configs/configs.js";

export const listMembers = async (req, res) => {
  try {
    const { year } = req.query;          
    const query = year ? { year } : {}; 

    const members = await Member.find(query);

    return res.status(200).json({
      success: true,
      count: members.length,
      body: members,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'server error',
    });
  }
};

export const  getMember = async(req,res)=>{
  try{
    const id= req.params(id);
    const member= Member.findById(id);

    if(!member){
    res.status(404).json({
      success:false,
      message:'count not load member',
    })};

     return res.status(200).json({
      success:true,
      message:'',
      body:member,
  });
  }catch(error){
    res.status(404).json({
      success:false,
      message:'could not get member'
    })};
};

export const createBlog = async (req, res) => {
  const memberid= req.params.id;
  const userid= req.user.id;
  if(memberid!==userid){
    res.status(400).json({
      success:true,
      message:'not authorised'
    });
  }
  const {title, content,image, description,}=req.body
  try {
    let imagedata={}
    if(image){
      const imageurl= await uploadToCloudinary(image,"Blogs")
      imagedata=imageurl;
    };

    const blog = new Blog({
      title,
      content,
      description,
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


export const getMemberBlogs = async (req, res) => {
  try {
    const memberid = req.params.id;
    const userid = req.user.id;
    if(userid!==memberid){
    const blogs = await Blog.find({ author: memberid, isPublished: true }).select('Title').sort({ publishedAt: -1 }) // latest first
  }
    else if(userid===memberid){
     const blogs= await Blog.find({author:memberid}).sort({publishedAt:-1}); 
  }


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


export const getBlog = async(req,res,next)=> {
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

//update option will be inside the blog, or maybe in the card too with the button having id in it
export const updateBlog = async (req, res) => {
  const { Title, Content, IsPublished ,Image, Description} = req.body;
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog){
      return res.status(404).json({ success: false, message: 'Blog not found' })
    };

    if (Title   !== undefined) blog.title = Title;
    if (Content !== undefined) blog.content = Content;
    if (Description !== undefined) blog.description= Description
    if (IsPublished !== undefined){
      blog.isPublished = IsPublished;
      if (IsPublished && !blog.publishedAt) {
        blog.publishedAt = new Date();
        }
    }
    if(Image){
      const imageurl= await uploadToCloudinary(Image,"Blogs")
      blog.images=imageurl
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
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' })};

    await blog.remove();

    res.json({ 
      success: true,
      message: 'Blog deleted successfully'
     });

  }catch (error){
    console.error('Delete error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
