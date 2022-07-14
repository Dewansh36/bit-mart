module.exports=function (fn) {
   return function (req, res, next) {
      fn(req, res, next)
         .catch((err) => {
            console.log('catch async');
            return next(err);
         });
   }
}