"use strict";

var minimist = require('minimist');

var yts = require('yt-search');

var youtubedl = require('youtube-dl');

module.exports = function _callee() {
  var args, searchQuery, result, vidUrl;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          args = minimist(process.argv.slice(2));
          searchQuery = args._;
          searchQuery = searchQuery.join(' ');

          if (!searchQuery) {
            _context.next = 20;
            break;
          }

          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(yts(searchQuery));

        case 7:
          result = _context.sent;
          vidUrl = result.videos[0].url;
          console.log(vidUrl);

          try {
            youtubedl.exec(vidUrl, ['-x', '--audio-quality', '0'], {}, function (err, output) {
              console.log('error:', err);
              console.log('output:', output);
            });
          } catch (e) {
            console.log('caught error in execution: ', e);
          }

          console.log('Done downloading');
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](4);
          console.log('an error occured in processing');
          console.log('error:', _context.t0);

        case 18:
          _context.next = 21;
          break;

        case 20:
          console.log('an invalid search query was passed as an arg');

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 14]]);
};