/**
 * Created by rajanchandi on 10/13/15.
 */
if (Meteor.isServer) {
    Meteor.methods({
        'removeAllMessages': function () {
            return Messages.remove({});
        },

        'clientMessage': function(msg, userId, tm) {
            Messages.insert({
                userId: userId,
                name: 'Smilo',
                message: 'Answer to...' + msg,
                time: tm + 1,
                from: "s"
            });
        }
    });

    /*Template.input.events = {
        'keydown input#message': function (event) {
            if (event.which == 13) {
                Messages.insert({
                    name: name,
                    message: 'Message from the Server',
                    time: Date.now(),
                    from: "s"
                });
            }
        }
    };*/
}
