import httpStatus from "http-status";
import { User } from "../model/user.model.js";
import bcrypt, { hash } from "bcrypt";
import router from "../routes/user.routes.js";
import crypto from "crypto";
import { Meeting } from "../model/meeting.model.js";

const login = async(req,res)=>{

    const {username,password}=req.body;

    if(!username || !password){
        return res.status(400).json({message:"Please enter username or password"})
    }


    try{
        const user=await User.findOne({username});
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({message:"User Not Found"});
        }

        let isPass=await bcrypt.compare(password,user.password);

        if(isPass){
            let token=crypto.randomBytes(20).toString("hex");

            user.token=token;
            await user.save();
            return res.status(httpStatus.OK).json({token:token})
        }else{
            return res.status(httpStatus.UNAUTHORIZED).json({message:"Invalid Username or Password"});
        }


    } catch(err){
        return res.status(500).json({message:`Something went wrong${err}`})
    }
}

const register = async (req, res) => {
    const { name, username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(httpStatus.FOUND).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword
        })

        await newUser.save();

        res.status(httpStatus.CREATED).json({ message: "User Registered" });

    } catch (err) {
        res.json({ message: `Something went wrong ${err}` });
    }
}

const getUserHistory=async(req,res)=>{
    const {token}=req.query;
    console.log(token);

    try{
        const user=await User.findOne({token:token});
        const meetings=await Meeting.find({user_id:user.username});
        res.json(meetings);
    }catch(e){
        res.json({message:"Something went wrong"})
    }
}

const addToHistory=async (req,res)=>{
    const {token,meeting_code}=req.body;

    try{
        const user=await User.findOne({token:token});

        const newMeeting=new Meeting({
            user_id:user.username,
            meetingCode:meeting_code
        })

        await newMeeting.save();

        res.status(httpStatus.CREATED).json({message:"Added code in history"})
    }catch(e){
        res.json({message:"Something Went Wrong"})
    }
}

export {login,register,getUserHistory,addToHistory}