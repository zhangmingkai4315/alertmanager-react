import React from 'react';
import Style from './style.css';
const ModalBox = ({onConfirm,onClose,show,content,title}) => {
  const showHideClassName =show ?
      `${Style.modal} ${Style.display_block}`:
      `${Style.modal} ${Style.display_none}`;
  return (
    <div className={showHideClassName}>
      <div className={Style.modal_main}>
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button type="button" className="close" onClick={onClose} data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <p>{content}</p>
        </div>
        <div className="modal-footer">
          {onConfirm && <button className="btn btn-primary" onClick={onConfirm}>确认</button>}
          <button className="btn btn-secondary" onClick={onClose}>关闭</button>
        </div>
      </div>
    </div>
  );
};

export default ModalBox;