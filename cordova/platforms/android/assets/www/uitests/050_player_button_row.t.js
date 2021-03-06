testUI = true;
StartTest(function(t) {
	var oldUserSelectedRecord = undefined;
	var playButtonInRow = Ext.ComponentQuery.query('#playButton');
	var rewindButtonInRow = Ext.ComponentQuery.query('#rewindButton');
	var fastForwardButtonInRow = Ext.ComponentQuery.query('#fastforwardButton');
	t.is(playButtonInRow.length, 1, 'Found playButtonInRow');
	t.is(rewindButtonInRow.length, 1, 'Found previous button');
	t.is(fastForwardButtonInRow.length, 1, 'Found next button');
	
    t.chain(
        { waitFor : 'componentVisible', args : '#playButton' },
        { waitFor : 2000 },
		
       function(next) {
        	var button_icon = t.cq1('#playButton').getIconCls();
        	t.is(button_icon, "play", 'Button icon is Play at start');
        	t.is(t.cq1('audio').isPlaying(), false, "Audio isn't playing on start");
            next();
        },
        
		{ tap : '>> #playButton' },
		
        function(next) {
        	var button_icon = t.cq1('#playButton').getIconCls();
        	t.is(button_icon, "pause", 'Button icon is Pause after pressing');
        	t.is(t.cq1('audio').isPlaying(), true, 'Audio is playing after button press');
        	oldUserSelectedRecord = Muzic.util.Player.getUserSelectedRecord();
            next();
        },

        { waitFor : 3000 },
        
        { tap : '>> #fastforwardButton' },
        
        function(next) {
        	var newUserSelectedRecord = Muzic.util.Player.getUserSelectedRecord();
        	t.is(parseInt(oldUserSelectedRecord.getId().replace( /^\D+/g, '')) + 1, newUserSelectedRecord.getId().replace( /^\D+/g, ''), 'Next record has been selected');
        	oldUserSelectedRecord = newUserSelectedRecord;
        	var button_icon = t.cq1('#playButton').getIconCls();
        	t.is(button_icon, "pause", 'Button text is still pause after pressing fast forward');
        	t.is(t.cq1('audio').isPlaying(), true, 'Audio is playing after pressing fast forward');
            next();
        },
        
        { waitFor : 2000 },
        
        { tap : '>> #playButton' },
        
        function(next) {
        	var button_icon = t.cq1('#playButton').getIconCls();
        	t.is(button_icon, "play", 'Button text is play after pressing pause');
        	t.is(t.cq1('audio').isPlaying(), false, 'Audio is paused');
            next();
        },
        
        { tap : '>> #rewindButton' },
        
        function(next) {
        	var newUserSelectedRecord = Muzic.util.Player.getUserSelectedRecord();
        	t.is(parseInt(oldUserSelectedRecord.getId().replace( /^\D+/g, '')) - 1, newUserSelectedRecord.getId().replace( /^\D+/g, ''), 'Previous record has been selected');
        	var button_icon = t.cq1('#playButton').getIconCls();
        	t.is(button_icon, "pause", 'Button text is pause after pressing back');
        	t.is(t.cq1('audio').isPlaying(), true, 'Audio is playing again');
            t.done();
        }
    );
});
