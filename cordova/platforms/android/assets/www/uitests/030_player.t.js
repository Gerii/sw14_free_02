testUI = true;
StartTest(function(t) {
	var button = Ext.ComponentQuery.query('#playButton');
	console.log(button);
	console.log("here");
	t.is(button.length, 1, 'Found one button');
	t.willFireNTimes(button[0], 'tap', 2, 'Click playButton Button two times');
    t.chain(
        { waitFor : 'componentVisible', args : '#playButton' },
        { waitFor : 2000},
		
       function(next) {
       		console.log(t.cq1('#playButton').getIconCls());
        	//button_text = t.cq1('#playButton').textElement.dom.innerHTML;
        	var button_icon = t.cq1('#playButton').getIconCls();
        	t.is(button_icon, "play", 'Button icon is Play at start');
        	t.is(t.cq1('audio').isPlaying(), false, "Audio isn't playing on start");
            next();
        },
        
		{ tap : '>> #playButton' },
		
        function(next) {
			var should_path = Ext.getStore('Songs').first().getData().filepath;
        	var is_path = t.cq1('audio').getUrl();
        	console.log(t.cq1('audio'));
        	t.is(is_path, should_path, 'First element in list is selected for playing');
        	var button_icon = t.cq1('#playButton').getIconCls();
        	t.is(button_icon, "pause", 'Button icon is Pause after pressing');
        	t.is(t.cq1('audio').isPlaying(), true, 'Audio is playing after button press');
            next();
        },
		

        { waitFor : 3000 },
        
        { tap : '>> #playButton' },
        
        function(next) {
        	var button_icon = t.cq1('#playButton').getIconCls();
        	t.is(button_icon, "play", 'Button text is Play after pressing again');
        	t.is(t.cq1('audio').isPlaying(), false, 'Audio paused after button press');
            t.done();
        }/*,
        
        // We'd like to find a headshot icon the DOM, that's proof the main app has been launched ok
        { 
            waitFor : 'compositeQuery', 
            args    : 'contacts => .headshot',
            desc    : 'Should be able login and see contact list'
        },

        { tap : 'contacts => .headshot' },

        { waitFor : 'componentVisible', args : 'map' },

        function(next) {
            t.pass('Should see a detail view with map after tapping a contact');
        }*/
    );
});