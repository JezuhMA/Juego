window.onload = ()=> {
	const pixel_tam = 10;
	const TABLERO_TAM = 40;
	const tablero = document.querySelector("#tablero");
	const frag = document.createDocumentFragment();
	const array_Juego = [];

	// AQUI RELLENO EL ARRAY_JUEGO PARA QUE TENGA EL TAMAÑO DEL TABLERO
 	for (let i = 0; i < TABLERO_TAM; i++) {
		array_Juego[i] = [0];
		for (let j = 0; j < TABLERO_TAM; j++) {
			array_Juego[i][j] = 0;
		}
	}
	 array_Juego[0][0] = 1;
	// AQUI RECORRO EL ARRAY Y PINTO LOS PIXELES
	for (let x = 0; x < TABLERO_TAM; x++) {
		for (let y = 0; y < TABLERO_TAM; y++) {
			const pixel = document.createElement("div");
			pixel.style.left = `${x * pixel_tam}px`;
			pixel.style.top = `${y * pixel_tam}px`;
			pixel.style.width = `${pixel_tam}px`;
			pixel.style.height = `${pixel_tam}px`;
			pixel.style.position = "absolute";
			const estado = array_Juego[x][y];
			console.log(estado);
			if (estado === 0) {
				pixel.style.backgroundColor = "black";
			}else{
				pixel.style.backgroundColor = "green";
			}
			frag.appendChild(pixel);
		}
	}
	tablero.appendChild(frag);
}