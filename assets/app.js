(function () {
  'use strict';

  var createApp = function () {
    // ---------------------
    // Начало кода приложения
    // ---------------------

    // Необходимо вернуть основной экземпляр Vue, а у корневого элемента должен быть id "app",
    // чтобы клиентская версия смогла подхватить работу после загрузки
    return new Vue({
      template: '<div id="app">Вы были здесь {{ counter }} секунд.</div>',
      data: {
        counter: 0
      },
      created: function () {
        var vm = this;
        setInterval(function () {
          vm.counter += 1;
        }, 1000);
      }
    });

    // -------------------
    // Конец кода приложения
    // -------------------
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = createApp;
  } else {
    this.app = createApp();
  }

}).call(this);
