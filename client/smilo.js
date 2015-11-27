/**
 * Templates
 */

Template.registerHelper('equals',
    function (v1, v2) {

        //alert("v1: " + v1 + " v2: " + v2);
        return (v1 == v2);

        /*var result = v1.localeCompare(v2);
        if(result === 0){
            return true;
        }else{
            return false;
        }*/
        //return true;
    }
);

if (Meteor.isClient) {
    Template.messages.helpers({
        messages: function () {
            var userId = Meteor.userId();
            return Messages.find({userId: userId}, {sort: {time: 1}});
        }
    });



    function messagePosted(){
        if (Meteor.user() && Meteor.user().profile)
            name = Meteor.user().profile.name;
        else
            name = 'Anonymous';
        var message = document.getElementById('message');
        var userId= Meteor.userId();
        if (message.value != '') {
            Messages.insert({
                userId: userId,
                name: name,
                message: message.value,
                time: Date.now(),
                from: "c"
            });

            setTimeout(function(){
                Meteor.call('clientMessage', message.value, Meteor.userId());
                document.getElementById('message').value = '';
                message.value = '';

            }, 1000);
        }
    }

    Template.messages.events = {
        'click .server': function (event) {
            //var paragraph = event.currentTarget; // always a P
            event.preventDefault();
            console.log("You clicked a message.");
            var clickedElement = event.target; // could be the P or a child element
            alert(clickedElement);
        }
    };

    Template.input.events = {
        'keydown input#message': function (event) {
            if (event.which == 13) { // 13 is the enter key event
                messagePosted();
            }
        },
        'click div#send': function (event) {
            messagePosted();
        },

        'click div#smile': function (event) {
            if (Meteor.user() && Meteor.user().profile)
                name = Meteor.user().profile.name;
            else
                name = 'Anonymous';
            var message = document.getElementById('message');
            var userId = Meteor.userId();
            Messages.insert({
                userId: userId,
                name: name,
                message: '<emoji class="funny" style="height:32px;width: 32px;" />',
                time: Date.now(),
                from: "c"
            });

            document.getElementById('message').value = '';
            message.value = '';
        }
    }
}