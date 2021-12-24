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
    const strcopy={ ...this.queryStr }

    const removeFields=['keyword', 'page', 'limit']

    removeFields.forEach((key) => delete strcopy[key])

    let queryStr=JSON.stringify(strcopy)

    queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

    this.query=this.query.find(JSON.parse(queryStr))

    return this
  }
  pagination(resultperpage) {
    const currentpage=Number(this.queryStr.page)||1
    const skip=resultperpage*(currentpage-1);

    this.query=this.query.limit(resultperpage).skip(skip)

    return this;
  }
}

module.exports=Features
