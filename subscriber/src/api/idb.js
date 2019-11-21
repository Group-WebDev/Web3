const DB_NAME = 'userdb';
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
				db.createObjectStore("users", { autoIncrement: true, keyPath:'id' });			};
		});
	},
	async deleteUser(user) {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction(['users'],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};

			let store = trans.objectStore('users');
			store.delete(user.id);
		});	
	},
	async getUsers() {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction(['users'],'readonly');
			trans.oncomplete = () => {
				resolve(users);
			};
			
			let store = trans.objectStore('users');
			let users = [];
			
			store.openCursor().onsuccess = e => {
				let cursor = e.target.result;
				if (cursor) {
					users.push(cursor.value)
					cursor.continue();
				}
			};

		});
	},

	async saveUser(user) {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction(['users'],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};

			let store = trans.objectStore('users');
			store.put(user);

		});
	
	}
	
}