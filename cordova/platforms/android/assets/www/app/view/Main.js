Ext.define('Muzic.view.Main', {

	extend: 'Ext.tab.Panel',
	xtype: 'main',
    requires: [
		//Add required views in main, otherwise Jasmine can't find them
    ],
	fullscreen: true,
	

	config: {
		tabBarPosition: 'bottom',
		tabBar: {
			id: 'tabbar'
			//ui: 'gray'
		},

		items: [
		   {xclass : 'Muzic.view.titles.Card'},
		   {xclass : 'Muzic.view.albums.Card'},
           {
	            xtype  : 'toolbar',
	            docked : 'bottom',
	            items  : [
	                {
	                	xclass : 'Muzic.view.Player',
	                	flex: 1
	                }
	            ]
        	}
		]
		
	}
	
});
