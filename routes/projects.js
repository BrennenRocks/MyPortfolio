var express = require("express"),
    router  = express.Router(),
    Project = require("../models/project"),
    middleware = require("../middleware");
    
    
//Index 
router.get("/", function(req, res){
    Project.find({}, function(err, projects){
        if(err){
            req.flash("error", "Something went wrong, try again!");
            res.redirect("back");
            console.log(err);
        }else{
            res.render("projects/index", {projects: projects, page: "projects"});
        }
    });
});

//Create 
router.post("/", middleware.isAdmin, function(req, res){
    var title = req.body.title,
        image = req.body.image,
        category = req.body.category,
        desc = req.body.description;
    
    var newProject = {title: title, image: image, category: category, description: desc};
    Project.create(newProject, function(err, project){
        if(err){
            req.flash("error", "There was a problem creating the project");
            res.redirect("/projects/new");
        }else{
            //Todo: Once I get enough projects, create a projects page
            res.redirect("/");    
        }
    });
});

//New
router.get("/new", middleware.isAdmin, function(req, res){
    res.render("projects/new", {page: "projects"});
});

//Show
router.get("/:id", function(req, res){
    Project.findById(req.params.id, function(err, project){
        if(err){
            req.flash("error", "Could not find the project, try again soon");
            res.redirect("back");
            console.log(err);
        }else{
            res.render("projects/show", {project: project, page: "projects"});
        }
    });
});

//Edit
router.get("/:id/edit", middleware.isAdmin, function(req, res){
    Project.findById(req.params.id, function(err, project){
        if(err){
            req.flash("error", "Could not find the project");
            res.redirect("back");
            console.log(err);
        }else{
            res.render("/projects/edit", {project: project, page: "projects"});
        }
    });
});

//Update
router.put("/:id", middleware.isAdmin, function(req, res){
    var title = req.body.title,
        image = req.body.image,
        category = req.body.category,
        desc = req.body.description;
        
    var newData = {title: title, image: image, category: category, description: desc};
    Project.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, project){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
            console.log(err);
        }else{
            req.flash("success", "Successfully editted " + project.title);
            res.redirect("/projects/" + project._id);
        }
    });
});

//Delete
router.delete("/:id", middleware.isAdmin, function(req, res){
    Project.findByIdAndRemove(req.params.id, function(err){
        if(err){
            req.flash("error", "Could not delete Project");
            res.redirect("back");
        }else{
            res.redirect("/projects");
        }
    });
});

module.exports = router;