function(doc) {
  if (doc.type == 'pinnochio') {
      emit(doc.name,{avatarurl:doc.avatarurl});
  }
};