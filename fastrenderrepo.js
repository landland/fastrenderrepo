if (Meteor.isClient) {
    Template.login.events({
        'submit form': function(e, t) {
            e.preventDefault();
            var username = t.find('#login-username').value,
                password = t.find('#login-password').value;
            Meteor.loginWithPassword(username, password, function(err) {
                if (err) {} else {
                    Router.go("hello");
                }
            });
            return false;
        }
    });
    Template.register.events({
        'submit form': function(e, t) {
            e.preventDefault();
            var email = t.find('#account-email').value,
                password = t.find('#account-password').value;
            var accountProperties = {
                email: email,
                password: password
            }
            Accounts.createUser(accountProperties, function(err) {
                if (err) {} else {
                    console.log("created")
                }
            });
            Router.go("hello");
            return false;
        }
    });
}
Router.configure({
    layoutTemplate: 'layout'
});
TagsController = FastRender.RouteController.extend({
    onBeforeAction: function() {}
});
Router.map(function() {
    this.route('tempLogin', {
        path: '/',
        fastRender: true
    });
    this.route('hello', {
        path: '/hello',
        fastRender: true,
        controller: 'TagsController'
    });
});
Lists = new Meteor.Collection('lists');
if (Meteor.isServer) {
    Meteor.startup(function() {
        // code to run on server at startup.
        var lists = Lists.find();
        if (lists.count() === 0) {
            Lists.insert({
                name: 'My List'
            });
        }
    });
    Meteor.AppCache.config({
        onlineOnly: ['/images/']
    });
}