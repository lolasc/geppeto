function(doc) {
  if (doc.type == 'source' && doc.pname) {
      emit(doc.status,{id:doc._id, text:doc.text, pname:doc.pname, link:doc.link, status:doc.status});
  }
};
