import jwt from "jsonwebtoken";
import {User,Blog} from "../models/models.js"; 

export const requireRole = (...roles) => {
	return (req, res, next) => {
		if (!req.User || !roles.includes(req.User.role)) {
			return res.status(403).json({ message: `Access denied`});
		}
		next();
	};
};

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
		req.user = decoded;
    	next();
	}
	catch (err) {
		return res.status(401).json({ message: 'invalid token' });
	}
};

/* used to input validation
export const validate = (req, res, next , error)=>{
	if(!error.isEmpty()){
		return res.status(400).json({errors:error.array()});
	}
	next();
};
*/

export const blogownership = async (req, res, next) => {
  try {
	const id = req.params(id)
	const blog = await Blog.findById(req.params.id);

	if (!blog) {
	  return res.status(404).json({ message: "Blog not found" });
	}

	if (blog.author.toString() !== req._id.toString()) {
	  return res.status(403).json({ message: "Not authorized" });
	}
	next();
     }catch (error) {
	return res.status(500).json({ message: "Server error" });
  }
};
