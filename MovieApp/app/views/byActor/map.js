function(doc) {
  if(doc.type === 'actor'){
	  emit(doc.movies, doc);
  }
};