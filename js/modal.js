window.onload = () =>{
    const registrobtn = document.getElementById("registro");
    const dialog = document.getElementById("modal");

    registrobtn.addEventListener("click", () => {
        const dialogRegistro = document.getElementById("regModule");
        dialogRegistro.showModal();
        dialog.close();
    });

    dialog.showModal();

}