/*

Siesta 2.0.7
Copyright(c) 2009-2014 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
Class('Siesta.Result.Summary', {
    
    isa         : Siesta.Result,
    
    has         : {
        isFailed            : false
    },
    
    methods : {
        
        // summary should belong only to the top level Siesta.Result.SubTest instance
        getTest : function () {
            return this.parent.test
        },
        
        
        toString : function () {
            
        }
    }    
});

