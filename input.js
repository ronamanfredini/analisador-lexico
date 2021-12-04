const addWords = palavra => {
	if (words.indexOf(palavra) < 0 && palavra.length > 0) {
		$('#input-field').append(`<p class='addedWord'>${palavra}</p>`);
		words.push(palavra);
		$('#input_palavras').val('');
	} generateTables();
};

const mountWordState = () => {
	words.forEach(arrayWords => {
		let actualState = 0;
		actualState = createSingleWordState(arrayWords, actualState);
	})
};


const generateTableLines = () => {
	let estadosArray = [];
	states.forEach((state, idx) => {
		estadosArray.push(manageState(state,idx));
	});

	return estadosArray;
};

const createSingleWordState = (arrayWords, actualState) => {
	for (let j = 0; j < arrayWords.length; j++) {
		if (typeof states[actualState][arrayWords[j]] === 'undefined') {
			let nextState = globalState + 1;
			states[actualState][arrayWords[j]] = nextState;
			states[nextState] = [];
			globalState = actualState = nextState;

		} else {
			actualState = states[actualState][arrayWords[j]];
		}

		if (j == arrayWords.length - 1) {
			states[actualState]['final'] = true;
		}
	}

	return actualState;
}


const manageState = (state, idx) => {
	let aux = [];
	aux['estado'] = idx;
	let primChar = 'a';
	let ultiChar = 'z';
	for (let j = primChar.charCodeAt(0); j <= ultiChar.charCodeAt(0); j++) {
		let letra = String.fromCharCode(j);
		if (typeof state[letra] === 'undefined') {
			aux[letra] = '-';
		} else {
			aux[letra] = state[letra];
		}
	}
	if (typeof state['final'] !== 'undefined') {
		aux['final'] = true;
	}
	return aux;
}

const generateTables = () => {
	mountWordState();
	table = generateTableLines();
	mountTable(table);
}