const prompt = require('prompt-sync')();
const watson = require('watson-developer-cloud/assistant/v1');
require('dotenv').config()

const chatbot = new watson({
	username: process.env.USERNAME,
	password: process.env.PASSWORD,
	version: process.env.VERSION,
})

const workspace_id = process.env.WORKSPACE_ID;

// começamos a conversacao com uma mensagem vazia
chatbot.message({workspace_id}, trataResposta);


let fimDeConversa = false;

function trataResposta(err, resposta){
	if (err){
		console.log(err);//caso tenha erro
		return;
	}
//detecta a intencao do usuario
if(resposta.intents.length > 0){
	console.log("Eu detectei a intenção:" + resposta.intents[0].intent);
	if (resposta.intents[0].intent == 'despedida'){
		fimDeConversa = true;
	}
}


//exibe a resposta do dialogo caso haja
if (resposta.output.text.length > 0){
	console.log(resposta.output.text)
}
if (!fimDeConversa){
	const mensagemUsuario = prompt('>>');
	chatbot.message({
		workspace_id,
		input: {text: mensagemUsuario},
		context: resposta.context
	}, trataResposta);

}
}