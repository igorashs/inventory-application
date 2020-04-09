// home page (shows total data) on GET
exports.index = (req, res) => {
  res.send('/ not Implemented');
};

// list all categories on GET
exports.categoryList = (req, res) => {
  res.send('/categories not Implemented');
};

// display all items for a specific category GET
exports.categoryItems = (req, res) => {
  res.send('/category/:id not Implemented');
};

// display category create form on GET
exports.categoryCreateGet = (req, res) => {
  res.send('/category/create GET not Implemented');
};

// handle category create on POST
exports.categoryCreatePost = (req, res) => {
  res.send('/category/create POST not Implemented');
};

// display category update form on GET
exports.categoryUpdateGet = (req, res) => {
  res.send('/category/:id/update GET not Implemented');
};

// handle category update on POST
exports.categoryUpdatePost = (req, res) => {
  res.send('/category/:id/update POST not Implemented');
};

// display category delete form on GET
exports.categoryDeleteGet = (req, res) => {
  res.send('/category/:id/delete GET not Implemented');
};

// handle category delete on POST
exports.categoryDeletePost = (req, res) => {
  res.send('/category/:id/delete POST not Implemented');
};
