function(doc) {
  if (doc.type == 'check') {
      emit(doc.source,{text:doc.text, link:doc.link, status:doc.status,pname:doc.pname});
  }
};