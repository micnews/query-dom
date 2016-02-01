import Set from 'es6-set';

function ClassList (className) {
  this._className = className;
  if (className) {
    this._classes = new Set(
      this._className.trim().split(' ').filter(Boolean)
    );
  }
}

ClassList.prototype.contains = function (name) {
  return this.className && this._classes.has(name);
};

export default ClassList;
