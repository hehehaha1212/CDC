//create, update. delete, like, getbyid, getbyuser
import { checkownership } from "../middleware/auth.js";
import { Blog } from "../models/models.js";

export const createBlog = async (req, res) => {
  try {
    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id,
      isPublished: req.body.isPublished || false,
      publishedAt: req.body.isPublished ? new Date() : null,
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
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    if (blog.author.toString() !== req.user.id)
      return res.status(403).json({ success: false, message: 'Not authorized to update this blog' });

    const { title, content, tags, isPublished } = req.body;
    if (title !== undefined) blog.title = title;
    if (content !== undefined) blog.content = content;
    if (isPublished !== undefined) {
      blog.isPublished = isPublished;
      if (isPublished && !blog.publishedAt) blog.publishedAt = new Date();
    }
    blog.updatedAt = new Date();

    await blog.save();
    await blog.populate('author', 'username profile.firstName profile.lastName profile.profileImage');

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
    if (blog.author.toString() !== req.user.id)
      return res.status(403).json({ success: false, message: 'Not authorized to delete this blog' });

    await blog.remove();
    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'username profile.name profile.profileimage')
      .populate('likes', 'username profile.name');

    if (!blog || (!blog.isPublished && req.user?.id !== blog.author._id.toString())) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.json({ success: true, data: blog });
  } catch (error) {
    console.error('Get blog error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  } new Blog({
    title: req.body.title,
    content: req.body.content,
    author: req.user.id,
    isPublished: req.body.isPublished || false,
    publishedAt: req.body.isPublished ? new Date() : null,
  });
};

export const getBlogsByUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const blogs = await Blog.find({ author: userId, isPublished: true })
      .sort({ publishedAt: -1 }) // latest first
      .populate('author', 'username profile.name profile.profileImage');

    res.json({
      success: true,
      data: blogs
    });
  } catch (error) {
    console.error('Get blogs by user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
