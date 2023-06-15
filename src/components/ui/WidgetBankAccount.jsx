import React from 'react';

const WidgetBankAccount = () => {
  return (
    <>
      <div className="col-4 mt-2">
        <div className="list-group" id="list-tab" role="tablist">
          <div
            className="list-group-item list-group-item-action active"
            id="list-home-list"
            data-bs-toggle="list"
            href="#list-home"
            role="tab"
            aria-controls="list-home">
            Текущий
          </div>
          <a
            className="list-group-item list-group-item-action"
            id="list-profile-list"
            data-bs-toggle="list"
            href="#list-profile"
            role="tab"
            aria-controls="list-profile">
            Кредитный
          </a>
          <a
            className="list-group-item list-group-item-action"
            id="list-messages-list"
            data-bs-toggle="list"
            href="#list-messages"
            role="tab"
            aria-controls="list-messages">
            Расчётный (для ИП)
          </a>
          <a
            className="list-group-item list-group-item-action"
            id="list-settings-list"
            data-bs-toggle="list"
            href="#list-settings"
            role="tab"
            aria-controls="list-settings">
            Settings
          </a>
        </div>
      </div>
      <div className="col-8">
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="list-home"
            role="tabpanel"
            aria-labelledby="list-home-list"></div>
          <div
            className="tab-pane fade"
            id="list-profile"
            role="tabpanel"
            aria-labelledby="list-profile-list">
            ...
          </div>
          <div
            className="tab-pane fade"
            id="list-messages"
            role="tabpanel"
            aria-labelledby="list-messages-list">
            ...
          </div>

          <div
            className="tab-pane fade"
            id="list-settings"
            role="tabpanel"
            aria-labelledby="list-settings-list"></div>
        </div>
      </div>
    </>
  );
};

export default WidgetBankAccount;
