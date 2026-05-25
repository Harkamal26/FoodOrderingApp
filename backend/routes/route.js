const express = require('express');
const router = express.Router()

// middle
const auth = function(req,res,next){
    console.log('auth middleware')
    req.user = {userId:1,role:'admin'}
    if(req.user){
        next();
    }else{
        res.json({
            success:false,
            message:'not a valid user'
        })
    }
}
// 
const isStudent = (req,res,next)=>{
    console.log('student middleware')
    if(req.user.role === 'student'){
        next();
    }
    else{
        res.json({
            success:false,
            message:'access denied ,this route is for students only'
        })
    }
}

//
const isAdmin = (req,res,next)=>{
    console.log('admin mdl')
    if(req.user.role==='admin'){
        next();
    }
    else{
        res.json({success:false,
            message:'access denied, this route if for admins only'
        })
    }
}
// routes
router.get('/student',auth,isStudent,(req,res)=>{
    console.log('student route')
    res.send('student page')
})

router.get('/admin',auth,isAdmin,(req,res)=>{
    console.log('admin route handler')
    res.send('admin page')
})

module.exports = router