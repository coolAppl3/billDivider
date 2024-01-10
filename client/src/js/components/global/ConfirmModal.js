class ConfirmModal {
  
  display(message, type = 'cta') {
    if(document.querySelector('.confirm-modal')) {
      return ;
    };
    
    const confirmModal = this._create(message, type);
    document.body.appendChild(confirmModal);

    confirmModal.style.display = 'block';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        confirmModal.style.opacity = '1';
      });
    });
  };
  
  remove() {
    document.querySelector('.confirm-modal').remove();
  };
  
  _create(message, type) {
    const confirmModalElement = document.createElement('div');
    confirmModalElement.className = 'confirm-modal';

    const container = document.createElement('div');
    container.className = 'container';

    const confirmModalElementContainer = document.createElement('div');
    confirmModalElementContainer.className = 'confirm-modal-container';

    const confirmMessage = this._createConfirmMessage(message);
    const btnContainer = this._createBtnContainer(type);

    confirmModalElementContainer.appendChild(confirmMessage);
    confirmModalElementContainer.appendChild(btnContainer);

    container.appendChild(confirmModalElementContainer);
    confirmModalElement.appendChild(container);

    return confirmModalElement;
  };

  _createBtnContainer(type) {
    const btnContainer = document.createElement('div');
    btnContainer.className = 'btn-container';

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn btn-border-light';
    cancelBtn.id = 'confirmModalCancelBtn';
    cancelBtn.appendChild(document.createTextNode('Cancel'));

    const confirmBtn = document.createElement('button');
    confirmBtn.className = `btn btn-${type}`;
    confirmBtn.id = 'confirmModalConfirmBtn';
    confirmBtn.appendChild(document.createTextNode('Confirm'));

    btnContainer.appendChild(cancelBtn);
    btnContainer.appendChild(confirmBtn);

    return btnContainer;
  };

  _createConfirmMessage(message) {
    const confirmMessage = document.createElement('p');
    confirmMessage.appendChild(document.createTextNode(message));

    return confirmMessage;
  };

};

export default ConfirmModal;