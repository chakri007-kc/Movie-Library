const router = require('express').Router();
const List = require('../models/listModel');
const verify = require('../routes/verifyToken');
const {v4 : uuidv4} = require('uuid');

router.get('/all',verify,async(req, res) => {
    const lists = await List.find({public:true});
    res.json(lists);
})


router.get('/mylists',verify,async(req, res) => {
    const lists = await List.find({postedBy:req.user._id});
    res.json(lists);
})

router.get('/mylistnames',verify,async(req, res) => {
    const lists = await List.find({postedBy:req.user._id});
    let mylists = [];
    for(let i=0;i<lists.length;i++){
        mylists.push(lists[i].listName);
    }
    res.json(mylists);
})

router.post('/createlist',verify,async(req, res) => {
    const {list,Public} = req.body;
    console.log(list,Public)
    if(!list) {
        return res.json({error: 'Please enter all the fields'})
    }

    let f = await List.findOne({listName:list,postedBy:req.user._id});
    if(f){
        return res.json({error: 'List already exists'})
    }

    const newlist = new List({
        listName: list,
        postedBy:req.user,
        public: Public,
        movieList:[],
    })
    await newlist.save();  
    res.json({status:'ok'});
})

router.post('/addmovie',verify,async(req,res)=>{
    const {listName,newMovie,public} = req.body;
    let listname = await List.findOne({listName});
    newMovie.postedBy = await req.user;
    newMovie.id = uuidv4();

    if(!listname){
        // console.log('hii')
        const list = new List({
            listName,
            movieList:[newMovie],
            postedBy:req.user,
            public
        })
        await list.save();
        listname = await List.findOne({listName});
        return res.json({status:'ok',listname})
        // console.log(listname)
    }
    else{
        try{
            // console.log(listname._id)
            const newObj = await List.findOneAndUpdate(
                {_id:listname._id},
                {$push :{movieList:newMovie}}
            )
            listname = await List.findOne({listName});
            return res.json({status:'ok',listname})
        }
        catch(err){
        return res.json({status:'error',error:err})
        }
    }
})

router.delete('/deletemovie/:list_id/:id',verify,async(req,res)=>{
    const {id,list_id} = req.params;
    console.log(id,list_id)
    try{
        const user = await List.findOneAndUpdate(
            {_id:list_id},
            {$pull:{movieList:{id:id}}},
            {new:true},
        );
        return res.json({status:'ok',user})
    }
    catch(err){
        return res.json({status:'error',error:err})
    }
})

router.delete('/deletelist/:id',verify,async(req,res)=>{
    const {id} = req.params;
    await List.findByIdAndDelete(id);
    return res.json({status:'ok'})
})

router.get('/getlist/:id',async(req,res)=>{
    const {id} = req.params;
    const list = await List.findById(id);
    if(list.public){
        return res.json({status:'ok',list});
    }
    else{
        verify(req,res,async()=>{
            if(list.postedBy.toString() === req.user._id.toString()){
                return res.json({status:'ok',list});
            }
            else{
                return res.json({status:'error'})
            }
        })
    }
})

module.exports = router