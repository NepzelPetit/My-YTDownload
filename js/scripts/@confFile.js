import { Reader } from '../modules/Reader.js';

const confiniFile = () => {
	const readFile = new Reader();
	readFile.initFile('./conf.ini',data => {
		for ( let prop in data ){
			if (prop === "document")
				window[prop]['title'] = data[prop]['title'];
		}
	});
}

export { confiniFile }