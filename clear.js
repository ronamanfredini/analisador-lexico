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
	table = generateTableLines();
	mountTable(table);
};

