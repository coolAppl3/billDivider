class LoadingModal {
  
  static display() {
    const loadingModalElement = document.createElement('div');
    loadingModalElement.className = 'loading-modal';

    const spinner = document.createElement('span');
    spinner.className = 'spinner';

    loadingModalElement.appendChild(spinner);
    
    if(document.querySelector('.loading-modal')) {
      return ;
    };
    
    document.querySelector('body').appendChild(loadingModalElement);
  };

  static remove() {
    if(document.querySelector('.loading-modal')) {
      document.querySelector('.loading-modal').remove();
    };
    
  };

};

export default LoadingModal;