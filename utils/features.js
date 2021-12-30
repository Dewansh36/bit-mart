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
    let max=this.queryStr.lte;
    let min=this.queryStr.gte;
    let category=this.queryStr.category;
    if (max==undefined&&category==undefined) {
      this.query=this.query.find().limit(6);
    }
    else if (max==undefined) {
      this.query=this.query.find({ $and: [{ category: category }] });
    }
    else if (category==undefined) {
      this.query=this.query.find({ $and: [{ price: { $gte: min } }, { price: { $lte: max } }] });
    }
    else {
      this.query=this.query.find({ $and: [{ price: { $gte: min } }, { price: { $lte: max } }, { category: category }] });
    }
    return this;
  }
  pagination(resultperpage) {
    const currentpage=Number(this.queryStr.page)||1
    const skip=resultperpage*(currentpage-1);

    this.query=this.query.limit(resultperpage).skip(skip)

    return this;
  }
  type() {
    let type=this.queryStr.type;
    if (type==undefined) {
      this.query=this.query.find().limit(6)
    }
    else {
      this.query=this.query.find({ $and: [{ type: type }] })
    }
    return this;
  }
}

module.exports=Features
