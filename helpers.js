const createTableRow = (tableItem) => {
	let tableRow = $(document.createElement('tr'));
	let tableData = $(document.createElement('td'));

	if (tableItem['final']) {
		tableData.html('q' + tableItem['estado'] + '*');
		tableData.addClass('tem-sel center border-custom');
	} else {
		tableData.html('q' + tableItem['estado']);
		tableData.addClass('tem-sel center border-custom');
	}

	tableRow.append(tableData);
	tableRow.addClass('linha_' + tableItem['estado']);

	return tableRow
}

const populateTableRow = (tableRow, tableItem) => {
	let firstChar = 'a';
	let lastChar = 'z';
	for (let i = firstChar.charCodeAt(0); i <= lastChar.charCodeAt(0); i++) {
		let dash = String.fromCharCode(i);
		let td = $(document.createElement('td'));
		td.addClass('coluna_' + dash + ' center');
		if (tableItem[dash] != '-') {
			td.html('q' + tableItem[dash]);
			td.addClass('tem-sel');
		} else {
			td.html('-').addClass('border-custom');
		}
		tableRow.append(td);
	}

	return tableRow;
}

const mountTable = itemTab => {
	let table = $('#tabela_tbody');
	table.html('');

	itemTab.forEach(tableItem => {
		let tr = createTableRow(tableItem)
		tr = populateTableRow(tr, tableItem)
		table.append(tr);
	})
};

const getWords = () => {
	let words = ($('#buscar_palavras').val()).toLowerCase();
	if (words.length == 0) {
		$('#tabela_tbody tr').removeClass('focus-linha');
		$('#tabela_tbody td').removeClass('focus-coluna');
	}

	return words;
}

const validateWordEnd = (words, error, state) => {
	let foundWord = `<span class='right'><i class="far fa-check-circle"></i></span>`;
	let notFound = `<span style="color:red;" class='right'><i class="far fa-times-circle"></i></span>`;

	if (error == false) {
		if (table[state]['final']) { //Se o estado for final da Encontrado, se não da Estado não final
			$('#palavras_encontradas').append(`<tr><td class='plvr-overflow'>${words}${foundWord}</td></tr>`);
		} else {
			$('#palavras_encontradas').append(`<tr><td class='plvr-overflow'>${words}${notFound}</td></tr>`);
		}
	} else {
		$('#palavras_encontradas').append(`<tr><td class='plvr-overflow'>${words}${notFound}</td></tr>`);
	}
	$('#tabela_tbody tr').removeClass('focus-linha');
	$('#tabela_tbody td').removeClass('focus-coluna');
	$('#buscar_palavras').val('');
}

const validateWord = () => {
	let words = getWords();

	let state = 0;
	let error = false;

	for (let i = 0; i < words.length; i++) {
		let regularExpression = /([a-z_])/;
		if (regularExpression.test(words[i]) && error == false) {
			highlightTable(state, words[i], table[state][words[i]]);

			if (table[state][words[i]] != '-') {
				state = table[state][words[i]];
			} else {
				error = true;
			}
		} else if (words[i] == ' ') {
			validateWordEnd(words, error, state);
		} else if (error == false) {
		}
	}
};

const clearTable = () => {
	$('#tabela_tbody tr').removeClass('focus-linha');
	$('#tabela_tbody td').removeClass('focus-coluna');
	$('#tabela_tbody tr').removeClass('focus-linha-erro');
	$('#tabela_tbody td').removeClass('focus-coluna-erro');
	$('#tabela_tbody tr').removeClass('semi-focus-erro');
	$('#tabela_tbody td').removeClass('semi-focus-erro');
}

const highlightTable = (estado, palavra, erroEstado) => {
	clearTable();

	if (erroEstado == '-') {
		$('#tabela_tbody .linha_' + estado).addClass('semi-focus-erro');
		$('#tabela_tbody .coluna_' + palavra).addClass('semi-focus-erro');
		return;
	}

	$('#tabela_tbody .linha_' + estado).addClass('focus-linha');
	$('#tabela_tbody .coluna_' + palavra).addClass('focus-coluna');
};