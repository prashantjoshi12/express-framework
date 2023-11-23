const { Op } = require("sequelize");

class APIFeatures {
  constructor(queryStr, model) {
    this.query = {};
    this.queryStr = queryStr;
    this.model = model;
  }
  sort(sortby = "id") {
    const sortColumn = this.queryStr.sortColumn || sortby;
    const sortOrder = this.queryStr.sortOrder || "DESC";
    const sortList = { order: [[sortColumn, sortOrder]] };
    this.query = { ...this.query, ...sortList };
    return this;
  }

  search(val) {
    const keyword = this.queryStr.keyword
      ? {
          [val ? val : "name"]: {
            [Op.iLike]: "%" + this.queryStr.keyword + "%",
          },
        }
      : {};
    this.query["where"] = { ...this.query["where"], ...keyword };
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    // Removing fields from the query
    const removeFields = [
      "keyword",
      "limit",
      "page",
      "sortColumn",
      "sortOrder",
    ];
    removeFields.forEach((el) => delete queryCopy[el]);

    // Advance filter for price, ratings etc
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    const filters = {};
    for (const i in queryCopy) {
      filters[i] = queryCopy[i].split(",");
    }
    this.query = { where: filters };
    return this;
  }

  pagination() {
    const currentPage = Number(this.queryStr.page) || 1;
    const resPerPage = Number(this.queryStr.limit) || 20;
    const offset = resPerPage * (currentPage - 1);
    

    this.query = { ...this.query, ...{ limit: resPerPage, offset: offset } };

    this.query.meta = {
      limit: resPerPage,
      offset: offset,
      previousPage: currentPage - 1,
      currentPage: currentPage,
    };
    return this;
  }

  getMeta(meta , count){
    const currentPage = meta.currentPage;
    const limit = meta.limit;
    const totalPages = Math.ceil(count / limit);
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    meta.total = count;
    meta.nextPage = nextPage;
    meta.totalPages = totalPages;
    return meta
  }

  //   pagination() {
  //     const currentPage = Number(this.queryStr.page) || 1;
  //     const resPerPage = Number(this.queryStr.limit) || 20;
  //     const offset = resPerPage * (currentPage - 1);
  //     this.query = {...this.query,...{limit: resPerPage, offset:offset}};
  //     return this;
  // }
}

module.exports = APIFeatures;
