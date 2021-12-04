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

	$('#input_palavras').on('keypress', (e) => {
		let word = ($('#input_palavras').val()).toLowerCase();
		doTestAndInsertWord(word);

		if (e.which == 13) {
			if (word) {
				addWords(word);
			}
		}
	});
});


const doTestAndInsertWord = (word) => {
	let regularExpression = /([^A-Za-z_])/;
	if (regularExpression.test(word)) {
		$('#insere_palavras').addClass('disabled');
		$('#input_palavras').val(word.replace(word.slice(-1), ''));
	} else {
		$('#insere_palavras').removeClass('disabled');
	}
}