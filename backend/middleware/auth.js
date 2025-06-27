import jwt from "jwt"
import user from "../models/models"
import blog from "../models/models.js"; 
import validationResult from "validation"
import { member } from "../models/models";
 
export const protect = async (req, res, next) => {
	let token;
	if (req.headers.authorization && req.headers.authorization.startWith('bearer')) {
		token = req.headers.authorization.split(' ')[1];
	}
	if (!token) {
		return res.status(401).json({ message: 'not authorized' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = await user.findById(decoded.id).select('-password');
		next();
	}
	catch (err) {
		return res.status(401).json({ message: 'not authorized' });
	}
};


export const validate = (req, res, next)=>{
	const error = validationResult(req);
	if(!error.isEmpty()){
		return res.status(400).json({errors:error.array()});
	}
	next();
};

export const profileownsership = async(req, res, next) => {
	try {
	  const profile = await member.findById(req.params.id);
  
	  if (!profile) {
		return res.status(404).json({ message: "profile not found" });
	  }
	
	
	
	  req.blog = blog;
	  next();
	} catch (error) {
	  return res.status(500).json({ message: "Server error" });
	}i
  };




export const blogownership = async (req, res, next) => {
  try {
	const blog = await blog.findById(req.params.id);

	if (!blog) {
	  return res.status(404).json({ message: "Blog not found" });
	}

	if (blog.author.toString() !== req.member.role.toString()) {
	  return res.status(403).json({ message: "Not authorized" });
	}

	req.blog = blog;
	next();
  } catch (error) {
	return res.status(500).json({ message: "Server error" });
  }i
};
