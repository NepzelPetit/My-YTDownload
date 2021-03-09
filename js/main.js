// funciones y clases
import { Reader } from './modules/Reader.js';
import { myYTConvert } from './modules/ytconvert.js';

// importacion de scripts
import { confiniFile } from './scripts/@confFile.js';



// incorporacion de los scripts en el projecto
const __SCRIPTS__ = () => {
	confiniFile();
};


// funcion principal
const __MAIN__ = () => {
	const ytConvert = new myYTConvert;

	const [ input_url, select_format, convert, view_link, form ] = [
		document.querySelector('#youtube_url'),
		document.querySelector('#youtube_format'),
		document.querySelector('#convert'),
		document.querySelector('#view_link'),
		document.querySelector('.form')
	];

	convert.addEventListener('click', e => {
		e.preventDefault();
		form.className = 'form form-load';
		view_link.className = 'iframe iframe--no';
		const [ url, format ] = [
			input_url.value,
			select_format.value
		];
		ytConvert.urlMethod(format,'btn');
		view_link.src = ytConvert.enlace(url);

		view_link.onload = function () {
			view_link.className = "iframe iframe--view";
			form.className = 'form';
		}
	});
}
window.addEventListener('load', ()=>{
	__MAIN__();
	__SCRIPTS__();
});