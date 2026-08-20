document.addEventListener(
    "DOMContentLoaded",
    function () {
  
      const menus =
        document.querySelectorAll(
          ".sidenav"
        );
  
      M.Sidenav.init(
        menus
      );
  
    }
  );