function(doc) {
  if (doc.type == 'source' && doc.pname) {
      emit([doc.pname,doc.status],{id:doc._id, pname:doc.pname, text:doc.text, link:doc.link, status:doc.status});
  }
};