const checkLogin=(req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log(req.originalUrl) // '/admin/new?sort=desc'
    console.log(req.baseUrl) // '/admin'
    console.log(req.path) // '/new'
    req.flash('error', 'You Must Be Logged In!');
    res.redirect('/signin');
}

module.exports=checkLogin;