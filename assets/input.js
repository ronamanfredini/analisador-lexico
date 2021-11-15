var Palavras = [];
var IteracaoDosEstados = [0];
var EstadoGlobal = 0;
var Estados = [[]];
var Tabela 	= [];

$(document).ready(function(){
	$('#insere_palavras').click(() => {
		var palavra = ($('#input_palavras').val()).toLowerCase();
		if(palavra){
			addPalavras(palavra);
		}
	});

	$('#buscar_palavras').keyup(() => {
		if(Tabela.length > 0){
			validaPalavra();
		}
	});

	$('#input_palavras').on('keypress',function(e) {
		var palavra = ($('#input_palavras').val()).toLowerCase();
		var exprRegular = /([^A-Za-z_])/;
		if(exprRegular.test(palavra)){
			$('#insere_palavras').addClass('disabled');
			$('#input_palavras').val(palavra.replace(palavra.slice(-1), ''));
		} else {
			$('#insere_palavras').removeClass('disabled');
		}
		
		if(e.which == 13) {
			if(palavra){
				addPalavras(palavra);
			}
		}
	});

});

const addPalavras = palavra => {
	if (Palavras.indexOf(palavra) < 0 && palavra.length > 0) {
		$('#input-field').append(`<p class='addedWord'>${palavra}
								<i onclick=\"rmvPalavras('${palavra}')\" style="color: red" class='far fa-times-circle'></i> </p>`);
		Palavras.push(palavra);
		$('#input_palavras').val('');
	} 
	montaEstadoPalavra();
	Tabela = geraLinhasTabela();
	montaTabela(Tabela);
};

const rmvPalavras = palavra => {
	var index = Palavras.indexOf(palavra);
	if (index >= 0 && palavra.length > 0) {
		Palavras.splice(index, 1);
		$(".addedWord").each(function() {
		    if ($(this).text().trim() == palavra.trim()) {
				$(this).remove();
				$(this).find("i").hide();
		    }
		});
	}
	limpaRefazAnalisador();
};

function limpaRefazAnalisador() {
	$('#tabela_tbody').html('');
	$('#palavras_encontradas').html('');
	IteracaoDosEstados = [0];
	EstadoGlobal = 0;
	Estados = [[]];
	Tabela 	= [];
	montaEstadoPalavra();
	Tabela = geraLinhasTabela();
	montaTabela(Tabela);
};

const montaEstadoPalavra = () => {
	for(const arrayWords of Palavras) {
		let actualState = 0;

		for(let j = 0; j < arrayWords.length; j++){
			if(typeof Estados[actualState][arrayWords[j]] === 'undefined'){
				let nextState = EstadoGlobal + 1;
				Estados[actualState][arrayWords[j]] = nextState;
				Estados[nextState] = [];

				console.log("Estados: ", Estados);
				EstadoGlobal = actualState = nextState;

				console.log("EstadoGlobal: ", EstadoGlobal);
			} else {
				console.log("Estados: ", Estados);
				actualState = Estados[actualState][arrayWords[j]];
				console.log("estadoAtual: ", actualState);
			}

			if (j == arrayWords.length - 1) {
				Estados[actualState]['final'] = true;
			}
		}
	}
};

const geraLinhasTabela = () => {
	var estadosArray = [];
	for(var i=0; i<Estados.length; i++) {
		var aux = [];
		aux['estado'] = i;
		var primChar = 'a';
		var ultiChar = 'z';
		for(var j=primChar.charCodeAt(0); j<=ultiChar.charCodeAt(0); j++) {
			var varra = String.fromCharCode(j);
			if(typeof Estados[i][varra] === 'undefined'){
				aux[varra] = '-';
			} else {
				aux[varra] = Estados[i][varra];
			}
		}
		if(typeof Estados[i]['final'] !== 'undefined'){
			aux['final'] = true;
		}
		estadosArray.push(aux);
	};
	return estadosArray;
};

