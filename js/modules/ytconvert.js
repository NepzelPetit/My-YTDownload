class myYTConvert {
	constructor(){
		// formatos peritidos
		this.format = {
			mp3: "mp3/",
			mp4: "videos/",
			mkv: "merged/"
		};
		// tipos permitios
		this.type = {
			btn: "button/",
			wget: "widget/"
		};

		this.conf = this.type['btn']+this.format['mp3'];
		this.base = "https://www.yt-download.org/api/";
	}

	getId(url){
		return url.split("?")[1].split("&")[0].split("=")[1]
	}

	urlMethod (format = 'mp3',type = 'btn'){
		this.conf = this.type[type]+this.format[format];
	}

	enlace (url){
		return this.base+this.conf+this.getId(url);
	}

}

export { myYTConvert };