let words = [];
let stateInteractions = [0];
let globalState = 0;
let states = [[]];
let table = [];

$(document).ready(function () {
	$('#insere_palavras').click(() => {
		let word = ($('#input_palavras').val()).toLowerCase();
		if (word) {
			addWords(word);
		}
	});

	$('#buscar_palavras').keyup(() => {
		if (table.length > 0) {
			validateWord();
		}
	});

	$('#input_palavras').on('keypress', function (e) {
		let word = ($('#input_palavras').val()).toLowerCase();
		let regularExpression = /([^A-Za-z_])/;
		if (regularExpression.test(word)) {
			$('#insere_palavras').addClass('disabled');
			$('#input_palavras').val(word.replace(word.slice(-1), ''));
		} else {
			$('#insere_palavras').removeClass('disabled');
		}

		if (e.which == 13) {
			if (word) {
				addWords(word);
			}
		}
	});

});

const addWords = palavra => {
	if (words.indexOf(palavra) < 0 && palavra.length > 0) {
		$('#input-field').append(`<p class='addedWord'>${palavra}
								<i onclick=\"removeWords('${palavra}')\" style="color: red" class='far fa-times-circle'></i> </p>`);
		words.push(palavra);
		$('#input_palavras').val('');
	}
	mountWordState();
	table = geraLinhasTabela();
	mountTable(table);
};

const removeWords = palavra => {
	let index = words.indexOf(palavra);
	if (index >= 0 && palavra.length > 0) {
		words.splice(index, 1);
		$(".addedWord").each(function () {
			if ($(this).text().trim() == palavra.trim()) {
				$(this).remove();
				$(this).find("i").hide();
			}
		});
	}
	clearApp();
};

function clearApp() {
	$('#tabela_tbody').html('');
	$('#palavras_encontradas').html('');
	stateInteractions = [0];
	globalState = 0;
	states = [[]];
	table = [];
	mountWordState();
	table = geraLinhasTabela();
	mountTable(table);
};

const mountWordState = () => {
	for (const arrayWords of words) {
		let actualState = 0;

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
	}
};

const geraLinhasTabela = () => {
	let estadosArray = [];
	for (let i = 0; i < states.length; i++) {
		let aux = [];
		aux['estado'] = i;
		let primChar = 'a';
		let ultiChar = 'z';
		for (let j = primChar.charCodeAt(0); j <= ultiChar.charCodeAt(0); j++) {
			let letra = String.fromCharCode(j);
			if (typeof states[i][letra] === 'undefined') {
				aux[letra] = '-';
			} else {
				aux[letra] = states[i][letra];
			}
		}
		if (typeof states[i]['final'] !== 'undefined') {
			aux['final'] = true;
		}
		estadosArray.push(aux);
	};
	return estadosArray;
};

