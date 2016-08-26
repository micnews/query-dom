function ClassList (className) {
  this._classes = {};
  if (className) {
    const list = className.split(' ');
    for (let index = 0; index < list.length; ++index) {
      if (list[index]) {
        this._classes[list[index]] = true;
      }
    }
  }
}

ClassList.prototype.contains = function (name) {
  return this._classes[name] || false;
};

export default ClassList;
