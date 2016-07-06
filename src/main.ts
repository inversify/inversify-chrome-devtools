import render from "inversify-devtools";

document.addEventListener("DOMContentLoaded", function() {
    let connectKernel = render("root");
    let win: any = window;
    win.__inversifyDevtools__ = connectKernel;
});
