function(doc) {
  if (doc.type == 'validcheck') {
      emit(doc.source,{text:doc.text, link:doc.link, status:doc.status,pname:doc.pname});
  }
};