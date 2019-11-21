const DB_NAME = 'datadb';
const DB_VERSION = 1;
let DB;

export default {

	async getDb() {
		return new Promise((resolve, reject) => {

			if(DB) { return resolve(DB); }
			console.log('OPENING DB', DB);
			let request = window.indexedDB.open(DB_NAME, DB_VERSION);
			
			request.onerror = e => {
				console.log('Error opening db', e);
				reject('Error');
			};
	
			request.onsuccess = e => {
				DB = e.target.result;
				resolve(DB);
			};
			
			request.onupgradeneeded = e => {
				console.log('onupgradeneeded');
				let db = e.target.result;
				db.createObjectStore("datas", { autoIncrement: true, keyPath:'id' });
			};
		});
	},
	async deleteData(data) {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction(['datas'],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};

			let store = trans.objectStore('datas');
			store.delete(data.id);
		});	
	},
	async getDatas() {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction(['datas'],'readonly');
			trans.oncomplete = () => {
				resolve(datas);
			};
			
			let store = trans.objectStore('datas');
			let datas = [];
			
			store.openCursor().onsuccess = e => {
				let cursor = e.target.result;
				if (cursor) {
					datas.push(cursor.value)
					cursor.continue();
				}
			};

		});
	},

	async saveData(data) {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction(['datas'],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};

			let store = trans.objectStore('datas');
			store.put(data);

		});
	
	}

}