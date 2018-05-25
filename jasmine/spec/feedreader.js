// Tests are in $() to make sure this runs after DOM load
$(function() {
    /* Tests for allFeeds var
     * - allFeeds var is defined, not empty, has one or more elements
     * - url property defined and not empty
     * - name property defined and not empty
     */
    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('all have a URL defined', function() {
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();    
                expect(feed.url).not.toEqual('');
            })
        });

        it('all have a name defined', function() {
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toEqual('');          
            })
        });
    });

    /* Tests suite for the menu
     * - the menu hides on load
     * - click on menu icon reveals
     * - click on menu again hides
     */
    describe('The menu', function() {
        var menuIcon = $('.menu-icon-link');

        it('element is hidden by default', function() {
            expect( $('body').hasClass('menu-hidden') ).toBe(true);
        });

        it('displays when clicked', function() {
            menuIcon.click();
            expect( $('body').hasClass('menu-hidden') ).toBe(false);
        });

        it('hides when clicked again', function() {
            menuIcon.click();
            expect( $('body').hasClass('menu-hidden') ).toBe(true);
        });
          
    });

    /* Test suite for initial load
     * - loads at least one entry from async feed 
     */
    describe('Initial Entries', function () {
        var entries = [];

        beforeEach(function(done) {
            loadFeed(1, function(){
                done();                
            });
        });

        afterEach(function(done) {
            loadFeed(0, function(){
                done();
            });
        });

        it('have at least one .entry element in the .feed container', function(done) {
            entries = $('.feed').find('.entry');
            expect(entries.length).toBeGreaterThan(0);
            done();
        });

    });

    /* Test suite for switching feeds
     * - compares first entry of 2 async feeds to ensure that switching works
     */
    describe('New Feed Selection', function() {
        var feed1, feed2;
  
         beforeEach(function(done) {
            feed1 = $('.feed').children().first().text();
            loadFeed(1, function(){
                done();                
            });
         });

         afterEach(function(done) {
            loadFeed(0, function(){
                done();
            });
        });

         it('changes content when new feed is loaded', function(done) {
            feed2 = $('.feed').children().first().text();
            expect(feed1).not.toEqual(feed2);
            done();
         });
    });
}());
