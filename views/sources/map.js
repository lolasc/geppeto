function(doc) {
  if (doc.type == 'source') {
      emit(doc.pname,{id:doc._id, text:doc.text, pname:doc.pname, link:doc.link, status:doc.status});
  }
};