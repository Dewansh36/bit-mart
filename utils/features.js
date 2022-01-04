// const Product=require('../models/productModel');
class Features {
  constructor(query, queryStr) {
    ; (this.query=query), (this.queryStr=queryStr)
  }
  search() {
    const keyword=this.queryStr.keyword
      ? {
        name: {
          $regex: this.queryStr.keyword,
          $options: 'i',
        },
      }
      :{}

    this.query=this.query.find({ ...keyword })
    return this
  }
  filter() {
    let max=Number(this.queryStr.lte||10000);
    let min=Number(this.queryStr.gte||0);
    // console.log(max)
    let category=this.queryStr.category;
    let type=this.queryStr.type
    let keyword=this.queryStr.keyword
    ? {
      name: {
        $regex: this.queryStr.keyword,
        $options: 'i',
      },
    }
    :{}
    if(category==''){
      category=undefined;
    }
    if(type==''){
      type=undefined;
    }
    // console.log(keyword);
    // console.log(max);
    // console.log(category);
    if(category!=undefined && type!=undefined){
      this.query=this.query.find({ $and: [{ price: { $gte: min } }, { price: { $lte: max } },{type: type},{ category: category },{...keyword}] });
    }
    else if(category!=undefined){
      this.query=this.query.find({ $and: [{ price: { $gte: min } }, { price: { $lte: max } }, { category: category },{...keyword}] });
    }
    else if(type!=undefined){
      this.query=this.query.find({ $and: [{ price: { $gte: min } }, { price: { $lte: max } }, { type: type },{...keyword}] });
    }
    // if (max==undefined && category==undefined) {
    //   this.query=this.query.find().limit(6);
    // }
    // else if (max==undefined) {
    //   this.query=this.query.find({ $and: [{ category: category }] });
    // }
    // else if (category==undefined) {
    //   this.query=this.query.find({ $and: [{ price: { $gte: min } }, { price: { $lte: max } }] });
    // }
    // else {
    //   this.query=this.query.find({ $and: [{ price: { $gte: min } }, { price: { $lte: max } }, { category: category }] });
    //   // this.query=this.query.find({ $and: [{ category: category }] });
    // }
    return this;
  }
  pagination(resultperpage) {
    let currentpage;
    if(this.queryStr.page==undefined || this.queryStr.page==''){
      currentpage=Number(1);
    }
    else{
      currentpage=Number(this.queryStr.page);
    }
    // console.log(currentpage);
    let skip=resultperpage*(currentpage-1);

    this.query=this.query.limit(resultperpage).skip(skip)

    return this;
  }
}

module.exports=Features
