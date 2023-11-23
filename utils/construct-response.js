const error = (res, status, title, body) => {
  return res.status(status).send(
    {
      message: title,
      error: {
        message: body,
      },
      response: null
    }
  );
}

const success = (res, status, title, body) => {
  return res.status(status).json(
    {
      message: title,
      ...body,
    }
  );
}

let paginate = (total, offset, limit, page) => {
  const nextOffset = parseInt(limit) + parseInt(offset);
  const pagination = {};
  if (total - limit > 0) {
    pagination["show_more"] = true;
    pagination["next_offset"] = nextOffset;
  } else {
    pagination["show_more"] = false;
  }
  pagination["count"] = total;
  pagination["page"] = page;
  return pagination;
};

module.exports = {
  error,
  success,
  paginate
};