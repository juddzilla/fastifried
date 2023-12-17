const data = (req, res, done) => {
  req.data = {
    ...req.params,
    ...req.query,
  };

  done();
};

export default data;
