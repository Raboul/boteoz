'use strict';

var Util = require('util');
var Bot = require('slackbots');

var Boteoz = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = 'boteoz';
    this.dbPath = null;

    this.user = null;
    this.db = null;
};

// Inherits methods and properties from the Bot constructor
Util.inherits(Boteoz, Bot);

Boteoz.prototype.run = function () {
    Boteoz.super_.call(this, this.settings);
    this.on('start', this._onStart);
    this.on('message', this._onMessage);
};

Boteoz.prototype._onStart = function () {
    this._loadBotUser();
    this._connectDb();
    this._welcomeMessage();
};

Boteoz.prototype._loadBotUser = function () {
    var self = this;
    this.user = this.users.filter(function (user) {
        return user.name === self.name;
    })[0];
};

Boteoz.prototype._connectDb = function () { };

Boteoz.prototype._welcomeMessage = function () {
    this.postTo('bot', 'Salut la team !', {as_user: true});
};

Boteoz.prototype._onMessage = function (message) {
    if (this._isChatMessage(message) && this._isChannelConversation(message) && !this._isFromBoteoz(message) &&
        this._isMentioningName(message)) {
        this._replyName(message);
    }
};

Boteoz.prototype._isChatMessage = function (message) {
    return message.type === 'message' && Boolean(message.text);
};

Boteoz.prototype._isChannelConversation = function (message) {
    return typeof message.channel === 'string' &&
        message.channel[0] === 'C';
};

Boteoz.prototype._isFromBoteoz = function (message) {
    return message.user === this.user.id;
};

Boteoz.prototype._isMentioningName = function (message) {
    return message.text.toLowerCase().indexOf(this.name) > -1;
};

Boteoz.prototype._replyName = function (originalMessage) {
    var channel = this._getChannelById(originalMessage.channel);
    var userId = originalMessage.user;

    this.postTo(channel.name, '<@' + userId + '>', {as_user: true});
};

Boteoz.prototype._getChannelById = function (channelId) {
    return this.channels.filter(function (item) {
        return item.id === channelId;
    })[0];
};

module.exports = Boteoz;

// TODO: Créer BDD PostgreSQL avec Heroku et l'intégrer
