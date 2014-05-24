Ext.require('Muzic.util.Database');


describe("Muzic.util.Database", function () {
	describe("Database loader", function () {
	    it("has loaded our database", function () {
	    	Muzic.util.Database.openDB();
	        expect(Muzic.util.Database.getDatabase()).toBeDefined();
	    });
	});
	
	describe("Table creator", function () {
	    it("has created our tables", function () {
	    	Muzic.util.Database.createTables();
	    	myDb = Muzic.util.Database.getDatabase();
	    	myDb.transaction(function (tx) {
			   tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='songs_table';", [], function (tx, results) {
			   expect(results.rows.length).toBe(1);
			 }, null);
			});
	    });
	});
});
